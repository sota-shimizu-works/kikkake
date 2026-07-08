import { AccountSettingsForm } from "@/components/account-settings-form";
import { DashboardBreadcrumbs } from "@/components/dashboard-breadcrumbs";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AccountSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const name =
    (user.user_metadata?.name as string | undefined) ||
    user.email?.split("@")[0] ||
    "";
  const avatarUrl =
    (user.user_metadata?.avatar_url as string | undefined) ||
    (user.user_metadata?.avatar as string | undefined) ||
    "/avatars/shadcn.jpg";
  const email = user.email ?? "";

  return (
    <div className="flex flex-1 flex-col">
      <DashboardBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "アカウント設定" },
        ]}
      />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <AccountSettingsForm
          initialName={name}
          initialEmail={email}
          initialAvatarUrl={avatarUrl}
          userId={user.id}
        />
      </div>
    </div>
  );
}
