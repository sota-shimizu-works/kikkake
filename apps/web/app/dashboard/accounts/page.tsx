import { DashboardBreadcrumbs } from "@/components/dashboard-breadcrumbs";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { redirect } from "next/navigation";

import {
  AccountManagementClient,
  type AccountUser,
} from "./account-management-client";

export const dynamic = "force-dynamic";

function toAccountUser(user: {
  id: string;
  email?: string | null;
  created_at?: string | null;
  last_sign_in_at?: string | null;
  email_confirmed_at?: string | null;
  user_metadata?: Record<string, unknown> | null;
}): AccountUser {
  const email = user.email ?? "";
  const nameFromMetadata =
    typeof user.user_metadata?.name === "string" ? user.user_metadata.name : "";

  return {
    id: user.id,
    email,
    name: nameFromMetadata || email.split("@")[0] || "",
    createdAt: user.created_at ?? "",
    lastSignInAt: user.last_sign_in_at ?? null,
    emailConfirmedAt: user.email_confirmed_at ?? null,
  };
}

export default async function AccountManagementPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  let users: AccountUser[] = [];
  let errorMessage: string | null = null;

  try {
    const admin = createAdminClient();
    const { data, error } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 100,
    });

    if (error) {
      errorMessage = error.message;
    } else {
      users = (data.users ?? []).map(toAccountUser);
    }
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unknown error";
  }

  return (
    <div className="flex flex-1 flex-col">
      <DashboardBreadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "アカウント管理" },
        ]}
      />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <AccountManagementClient
          initialUsers={users}
          errorMessage={errorMessage}
          currentUserId={user.id}
        />
      </div>
    </div>
  );
}
