import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

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
      const message =
        result.error.issues[0]?.message ?? "入力内容を確認してください。";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { companyName, contactName, email, employeeCount, employmentInsurance } =
      result.data;

    const adminSubject = `【無料診断】${companyName} / ${contactName} 様からお問い合わせ`;
    const adminText = [
      "無料診断フォームからお問い合わせがありました。",
      "",
      `会社名（屋号）: ${companyName}`,
      `ご担当者様名: ${contactName}`,
      `メールアドレス: ${email}`,
      `従業員数: ${employeeCount}`,
      `雇用保険の加入: ${employmentInsurance === "yes" ? "はい" : "いいえ"}`,
    ].join("\n");

    const adminHtml = `
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

    const autoReplySubject = "【株式会社きっかけ】お問い合わせありがとうございます";
    const autoReplyText = [
      `${contactName} 様`,
      "",
      "このたびは株式会社きっかけの無料診断へお申し込みいただき、ありがとうございます。",
      "以下の内容で受け付けました。担当者より順次ご連絡いたします。",
      "",
      `会社名（屋号）: ${companyName}`,
      `ご担当者様名: ${contactName}`,
      `メールアドレス: ${email}`,
      `従業員数: ${employeeCount}`,
      `雇用保険の加入: ${employmentInsurance === "yes" ? "はい" : "いいえ"}`,
      "",
      "お急ぎの場合は、本メールにご返信ください。",
      "",
      "株式会社きっかけ",
    ].join("\n");

    const autoReplyHtml = `
      <div style="font-family: sans-serif; line-height: 1.7; color: #111827;">
        <p>${escapeHtml(contactName)} 様</p>
        <p>このたびは株式会社きっかけの無料診断へお申し込みいただき、ありがとうございます。<br />以下の内容で受け付けました。担当者より順次ご連絡いたします。</p>
        <table style="border-collapse: collapse; margin-top: 16px;">
          <tbody>
            <tr><td style="padding: 6px 12px 6px 0;"><strong>会社名（屋号）</strong></td><td>${escapeHtml(companyName)}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0;"><strong>ご担当者様名</strong></td><td>${escapeHtml(contactName)}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0;"><strong>メールアドレス</strong></td><td>${escapeHtml(email)}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0;"><strong>従業員数</strong></td><td>${escapeHtml(employeeCount)}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0;"><strong>雇用保険の加入</strong></td><td>${employmentInsurance === "yes" ? "はい" : "いいえ"}</td></tr>
          </tbody>
        </table>
        <p style="margin-top: 16px;">お急ぎの場合は、本メールにご返信ください。</p>
        <p style="margin-top: 24px;">株式会社きっかけ</p>
      </div>
    `;

    const { error: adminError } = await resend.emails.send({
      from: contactFromEmail,
      to: [contactToEmail],
      replyTo: email,
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
    });

    if (adminError) {
      return NextResponse.json(
        { error: "メール送信に失敗しました。" },
        { status: 502 },
      );
    }

    const { error: autoReplyError } = await resend.emails.send({
      from: contactFromEmail,
      to: [email],
      replyTo: contactToEmail,
      subject: autoReplySubject,
      text: autoReplyText,
      html: autoReplyHtml,
    });

    if (autoReplyError) {
      return NextResponse.json(
        { error: "自動返信メールの送信に失敗しました。" },
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
