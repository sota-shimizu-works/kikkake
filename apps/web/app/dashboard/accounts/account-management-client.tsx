"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { IconDotsVertical, IconPlus } from "@tabler/icons-react";
import { toast } from "sonner";

import {
  createAccountAction,
  deleteAccountAction,
  updateAccountAction,
} from "./actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export type AccountUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  lastSignInAt: string | null;
  emailConfirmedAt: string | null;
};

function formatDate(value: string | null | undefined) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("ja-JP");
}

export function AccountManagementClient({
  initialUsers,
  errorMessage,
  currentUserId,
}: {
  initialUsers: AccountUser[];
  errorMessage?: string | null;
  currentUserId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [createOpen, setCreateOpen] = useState(false);
  const [editUser, setEditUser] = useState<AccountUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<AccountUser | null>(null);

  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [createName, setCreateName] = useState("");

  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editName, setEditName] = useState("");

  const users = useMemo(() => initialUsers, [initialUsers]);

  const handleCreate = () => {
    startTransition(() => {
      void (async () => {
        const result = await createAccountAction({
          email: createEmail,
          password: createPassword,
          name: createName || undefined,
        });

        if (!result.ok) {
          toast.error(result.error);
          return;
        }

        toast.success("アカウントを追加しました。");
        setCreateEmail("");
        setCreatePassword("");
        setCreateName("");
        setCreateOpen(false);
        router.refresh();
      })();
    });
  };

  const openEdit = (user: AccountUser) => {
    setEditUser(user);
    setEditEmail(user.email);
    setEditName(user.name);
    setEditPassword("");
  };

  const handleUpdate = () => {
    if (!editUser) return;

    startTransition(() => {
      void (async () => {
        const result = await updateAccountAction({
          id: editUser.id,
          email: editEmail,
          password: editPassword,
          name: editName,
        });

        if (!result.ok) {
          toast.error(result.error);
          return;
        }

        toast.success("アカウント情報を更新しました。");
        setEditUser(null);
        router.refresh();
      })();
    });
  };

  const handleDelete = () => {
    if (!deleteUser) return;

    startTransition(() => {
      void (async () => {
        if (deleteUser.id === currentUserId) {
          toast.error("ログイン中のアカウントは削除できません。");
          return;
        }
        const result = await deleteAccountAction({ id: deleteUser.id });

        if (!result.ok) {
          toast.error(result.error);
          return;
        }

        toast.success("アカウントを削除しました。");
        setDeleteUser(null);
        router.refresh();
      })();
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle>アカウント管理</CardTitle>
          <CardDescription>
            アカウントの一覧・追加・修正・削除ができます。
          </CardDescription>
        </div>
        <Button onClick={() => setCreateOpen(true)} disabled={isPending}>
          <IconPlus />
          追加
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {errorMessage ? (
          <Alert variant="destructive">
            <AlertTitle>読み込みに失敗しました</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : null}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>メール</TableHead>
                <TableHead>表示名</TableHead>
                <TableHead>確認</TableHead>
                <TableHead>作成日時</TableHead>
                <TableHead>最終ログイン</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-muted-foreground">
                    アカウントがありません。
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.name || "-"}</TableCell>
                    <TableCell>
                      {user.emailConfirmedAt ? (
                        <Badge variant="secondary">確認済</Badge>
                      ) : (
                        <Badge variant="outline">未確認</Badge>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>{formatDate(user.lastSignInAt)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isPending}
                          >
                            <IconDotsVertical />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onSelect={() => openEdit(user)}>
                            修正
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            disabled={user.id === currentUserId}
                            onSelect={() => {
                              if (user.id === currentUserId) {
                                toast.error(
                                  "ログイン中のアカウントは削除できません。",
                                );
                                return;
                              }
                              setDeleteUser(user);
                            }}
                          >
                            削除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleCreate();
            }}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>アカウント追加</DialogTitle>
              <DialogDescription>
                メールアドレスとパスワードを入力してアカウントを作成します。
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="create-email">メール</Label>
                <Input
                  id="create-email"
                  type="email"
                  value={createEmail}
                  onChange={(event) => setCreateEmail(event.target.value)}
                  placeholder="user@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="create-password">パスワード</Label>
                <Input
                  id="create-password"
                  type="password"
                  value={createPassword}
                  onChange={(event) => setCreatePassword(event.target.value)}
                  placeholder="********"
                />
                <p className="text-xs text-muted-foreground">
                  8文字以上にしてください。
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="create-name">表示名（任意）</Label>
                <Input
                  id="create-name"
                  value={createName}
                  onChange={(event) => setCreateName(event.target.value)}
                  placeholder="山田 太郎"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  isPending || !createEmail.trim() || !createPassword.trim()
                }
              >
                {isPending ? "作成中..." : "作成する"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editUser}
        onOpenChange={(open) => {
          if (!open) setEditUser(null);
        }}
      >
        <DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleUpdate();
            }}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle>アカウント修正</DialogTitle>
              <DialogDescription>
                メール・表示名・パスワードを更新できます（パスワードは未入力なら変更しません）。
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-email">メール</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editEmail}
                  onChange={(event) => setEditEmail(event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-name">表示名</Label>
                <Input
                  id="edit-name"
                  value={editName}
                  onChange={(event) => setEditName(event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-password">新しいパスワード（任意）</Label>
                <Input
                  id="edit-password"
                  type="password"
                  value={editPassword}
                  onChange={(event) => setEditPassword(event.target.value)}
                  placeholder="********"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isPending || !editUser || !editEmail.trim()}
              >
                {isPending ? "更新中..." : "更新する"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteUser}
        onOpenChange={(open) => {
          if (!open) setDeleteUser(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>アカウントを削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteUser
                ? `${deleteUser.email} を削除します。この操作は取り消せません。`
                : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={
                isPending || !deleteUser || deleteUser.id === currentUserId
              }
            >
              {isPending ? "削除中..." : "削除する"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
