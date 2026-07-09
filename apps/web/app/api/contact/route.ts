import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  companyName: z.string().trim().min(1, "会社名を入力してください。"),
  contactName: z.string().trim().min(1, "ご担当者様名を入力してください。"),
  email: z
    .string()
    .trim()
    .email("メールアドレスの形式が正しくありません。"),
  employeeCount: z.string().trim().min(1, "従業員数を選択してください。"),
  employmentInsurance: z
    .string()
    .trim()
    .min(1, "雇用保険の加入状況を選択してください。"),
});

const resendApiKey = process.env.RESEND_API_KEY;
const contactToEmail = process.env.CONTACT_TO_EMAIL ?? "info@kikkake-jpn.net";
const contactFromEmail =
  process.env.CONTACT_FROM_EMAIL ?? "info@kikkake-jpn.net";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json(
      { error: "RESEND_API_KEY が設定されていません。" },
      { status: 500 },
    );
  }

  try {
    const json = await request.json();
    const result = contactSchema.safeParse(json);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "入力内容を確認してください。";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { companyName, contactName, email, employeeCount, employmentInsurance } =
      result.data;

    const subject = `【無料診断】${companyName} / ${contactName} 様からお問い合わせ`;
    const text = [
      "無料診断フォームからお問い合わせがありました。",
      "",
      `会社名（屋号）: ${companyName}`,
      `ご担当者様名: ${contactName}`,
      `メールアドレス: ${email}`,
      `従業員数: ${employeeCount}`,
      `雇用保険の加入: ${employmentInsurance === "yes" ? "はい" : "いいえ"}`,
    ].join("\n");

    const html = `
      <div style="font-family: sans-serif; line-height: 1.7; color: #111827;">
        <p>無料診断フォームからお問い合わせがありました。</p>
        <table style="border-collapse: collapse;">
          <tbody>
            <tr><td style="padding: 6px 12px 6px 0;"><strong>会社名（屋号）</strong></td><td>${escapeHtml(companyName)}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0;"><strong>ご担当者様名</strong></td><td>${escapeHtml(contactName)}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0;"><strong>メールアドレス</strong></td><td>${escapeHtml(email)}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0;"><strong>従業員数</strong></td><td>${escapeHtml(employeeCount)}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0;"><strong>雇用保険の加入</strong></td><td>${employmentInsurance === "yes" ? "はい" : "いいえ"}</td></tr>
          </tbody>
        </table>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: contactFromEmail,
      to: [contactToEmail],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      return NextResponse.json(
        { error: "メール送信に失敗しました。" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "送信処理中にエラーが発生しました。" },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
