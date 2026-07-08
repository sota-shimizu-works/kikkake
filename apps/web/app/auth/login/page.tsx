import { LoginForm } from "@/components/login-form";

export default function Page() {
  const allowSignUp = process.env.ALLOW_USER_SIGNUP === "true";

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm allowSignUp={allowSignUp} />
      </div>
    </div>
  );
}
