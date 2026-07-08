import { AppSidebar } from "@/components/app-sidebar";
import { DashboardBreadcrumbsProvider } from "@/components/dashboard-breadcrumbs";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}

async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const sidebarUser = user
    ? {
        name:
          (user.user_metadata?.name as string | undefined) ??
          user.email ??
          "User",
        email: user.email ?? "",
        avatar:
          (user.user_metadata?.avatar_url as string | undefined) ??
          (user.user_metadata?.avatar as string | undefined) ??
          "/avatars/shadcn.jpg",
      }
    : undefined;

  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" user={sidebarUser} />
        <SidebarInset>
          <DashboardBreadcrumbsProvider>
            <SiteHeader />
            <div className="p-4 lg:p-6">{children}</div>
          </DashboardBreadcrumbsProvider>
        </SidebarInset>
        <Toaster />
      </SidebarProvider>
    </>
  );
}
