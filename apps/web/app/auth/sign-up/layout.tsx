import AppHeader from "@/components/app-header";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allowSignUp = process.env.ALLOW_USER_SIGNUP === "true";
  if (!allowSignUp) {
    redirect("/auth/login");
  }

  return (
    <>
      <AppHeader />
      <div>{children}</div>
    </>
  );
}
