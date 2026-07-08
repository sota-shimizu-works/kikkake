"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type AccountSettingsFormProps = {
  initialName: string;
  initialEmail: string;
  initialAvatarUrl: string;
  userId: string;
};

export function AccountSettingsForm({
  initialName,
  initialEmail,
  initialAvatarUrl,
  userId,
}: AccountSettingsFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [avatarPreview, setAvatarPreview] =
    useState<string>(initialAvatarUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const supabase = createClient();
    let uploadedAvatarUrl: string | null = null;

    if (pendingFile) {
      const extension = pendingFile.name.split(".").pop();
      const path = `avatars/${userId}/${Date.now()}.${
        extension ?? "png"
      }`;
      const { error: uploadError } = await supabase.storage
        .from("user-avatars")
        .upload(path, pendingFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        toast.error(uploadError.message);
        setIsSubmitting(false);
        return;
      }

      const { data } = supabase.storage.from("user-avatars").getPublicUrl(path);
      uploadedAvatarUrl = data.publicUrl;
    }

    const updates: {
      email?: string;
      data?: Record<string, string>;
    } = {};
    const metadataUpdates: Record<string, string> = {};

    if (name.trim()) {
      metadataUpdates.name = name.trim();
    }
    const finalAvatarUrl = uploadedAvatarUrl ?? avatarUrl;
    if (finalAvatarUrl.trim() && finalAvatarUrl.trim() !== avatarUrl) {
      metadataUpdates.avatar_url = finalAvatarUrl.trim();
    }
    if (Object.keys(metadataUpdates).length > 0) {
      updates.data = metadataUpdates;
    }

    if (email.trim() && email.trim() !== initialEmail) {
      updates.email = email.trim();
    }

    if (!updates.email && !updates.data) {
      const infoMessage = "変更がありません。";
      toast.info(infoMessage);
      setIsSubmitting(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser(updates);

    if (updateError) {
      toast.error(updateError.message);
      setIsSubmitting(false);
      return;
    }

    const successMessage = updates.email
      ? "アカウント情報を更新しました。メールアドレスを変更した場合は確認メールをご確認ください。"
      : "アカウント情報を更新しました。";
    toast.success(successMessage);
    setPendingFile(null);
    setSelectedFileName(null);
    setAvatarUrl(finalAvatarUrl);
    setAvatarPreview(finalAvatarUrl);
    setIsSubmitting(false);
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>アカウント設定</CardTitle>
        <CardDescription>
          プロフィール情報やメールアドレスを更新できます。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 rounded-lg">
              <AvatarImage src={avatarPreview} alt={name || "avatar"} />
              <AvatarFallback className="rounded-lg">
                {(name || "User").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>プレビュー</div>
              <div className="text-xs">
                アイコン画像をアップロードすると表示が変わります。
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">表示名</Label>
              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="山田 太郎"
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="avatar-file" className="mb-0">
                  アイコン画像のアップロード
                </Label>
              </div>
              <Input
                id="avatar-file"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) {
                    setSelectedFileName(null);
                    setPendingFile(null);
                    setAvatarPreview(avatarUrl);
                    return;
                  }
                  setSelectedFileName(file.name);
                  setPendingFile(file);
                  setAvatarPreview(URL.createObjectURL(file));
                }}
              />
              <p className="text-xs text-muted-foreground">
                {selectedFileName
                  ? `選択中: ${selectedFileName}`
                  : "ファイルが選択されていません。"}
              </p>
              <p className="text-xs text-muted-foreground">
                保存ボタンを押すと選択中の画像がアップロードされ、プロフィールに適用されます。
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
              <p className="text-xs text-muted-foreground">
                メールアドレスを変更すると確認メールが送信される場合があります。
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "更新中..." : "保存する"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
