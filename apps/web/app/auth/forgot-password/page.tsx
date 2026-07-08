import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-4xl mx-auto p-8">
        <div>
          <h1 className="text-2xl font-medium">パスワードリセット</h1>
          <p className="text-sm text-secondary-foreground">
            すでにアカウントをお持ちですか？{" "}
            <Link className="text-primary underline" href="/auth/login">
              ログイン
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">メールアドレス</Label>
          <Input name="email" placeholder="例: you@example.com" required />
          <SubmitButton formAction={forgotPasswordAction}>
            リセットメールを送信
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
