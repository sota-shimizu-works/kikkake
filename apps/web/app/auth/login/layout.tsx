import AppHeader from "@/components/app-header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader />
      <div>{children}</div>
    </>
  );
}
