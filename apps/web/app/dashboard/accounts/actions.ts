"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

type ActionResult = { ok: true } | { ok: false; error: string };
type SignedInResult = { ok: false; error: string } | { ok: true; userId: string };

async function requireSignedIn(): Promise<SignedInResult> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { ok: false, error: error.message };
  }
  if (!user) {
    return { ok: false, error: "Unauthorized" };
  }

  return { ok: true, userId: user.id };
}

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "パスワードは8文字以上にしてください。"),
  name: z.string().trim().optional(),
});

export async function createAccountAction(
  input: z.infer<typeof createUserSchema>,
): Promise<ActionResult> {
  const signedIn = await requireSignedIn();
  if (!signedIn.ok) return signedIn;

  const parsed = createUserSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid" };
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.createUser({
    email: parsed.data.email,
    password: parsed.data.password,
    user_metadata: parsed.data.name ? { name: parsed.data.name } : undefined,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/dashboard/accounts");
  return { ok: true };
}

const updateUserSchema = z.object({
  id: z.string().min(1),
  email: z
    .string()
    .email()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  password: z
    .string()
    .min(8, "パスワードは8文字以上にしてください。")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  name: z
    .string()
    .trim()
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export async function updateAccountAction(
  input: z.infer<typeof updateUserSchema>,
): Promise<ActionResult> {
  const signedIn = await requireSignedIn();
  if (!signedIn.ok) return signedIn;

  const parsed = updateUserSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid" };
  }

  const updates: {
    email?: string;
    password?: string;
    user_metadata?: Record<string, string>;
  } = {};

  if (parsed.data.email) updates.email = parsed.data.email;
  if (parsed.data.password) updates.password = parsed.data.password;
  if (parsed.data.name) updates.user_metadata = { name: parsed.data.name };

  if (Object.keys(updates).length === 0) {
    return { ok: false, error: "変更がありません。" };
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.updateUserById(
    parsed.data.id,
    updates,
  );

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/dashboard/accounts");
  return { ok: true };
}

const deleteUserSchema = z.object({
  id: z.string().min(1),
});

export async function deleteAccountAction(
  input: z.infer<typeof deleteUserSchema>,
): Promise<ActionResult> {
  const signedIn = await requireSignedIn();
  if (!signedIn.ok) return signedIn;

  const parsed = deleteUserSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid" };
  }

  if (parsed.data.id === signedIn.userId) {
    return { ok: false, error: "ログイン中のアカウントは削除できません。" };
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(parsed.data.id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/dashboard/accounts");
  return { ok: true };
}
