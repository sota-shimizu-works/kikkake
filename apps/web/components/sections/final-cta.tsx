"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const inputBorder = {
  border: "1px solid rgba(32, 62, 236, 0.3)",
};

const initialFormData = {
  companyName: "",
  contactName: "",
  email: "",
  employeeCount: "",
  employmentInsurance: "",
};

type FormData = typeof initialFormData;
type SubmitState = "idle" | "submitting" | "success" | "error";

export function FinalCTA() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "送信に失敗しました。");
      }

      setSubmitState("success");
      setFormData(initialFormData);
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "送信処理中にエラーが発生しました。",
      );
    }
  }

  function handleChange<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <section id="contact" className="py-20 border-border md:py-20 border-t-0">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-6">
            無料診断
          </p>

          <h2 className="text-4xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
            御社が受け取れる助成金、一度確認してみませんか？
          </h2>

          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            助成金は、企業の規模や雇用状況によって利用できる制度が大きく変わります。
            まずは御社が対象となる助成金があるか無料で診断いたします。
            オンラインで全国対応しておりますのでお気軽にご相談ください。
          </p>

          {submitState === "success" ? (
            <div className="mt-10 py-12 px-8 rounded-2xl" style={inputBorder}>
              <p className="text-xl font-semibold">
                お申し込みありがとうございます。
              </p>
              <p className="mt-2 text-muted-foreground">
                担当者よりご連絡いたしますので、しばらくお待ちください。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 text-left space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  会社名（屋号）<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  placeholder="例：株式会社きっかけ"
                  className="w-full px-4 py-3 rounded-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-0 transition-colors"
                  style={inputBorder}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  ご担当者様名<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => handleChange("contactName", e.target.value)}
                  placeholder="例：山田 太郎"
                  className="w-full px-4 py-3 rounded-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-0 transition-colors"
                  style={inputBorder}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  メールアドレス<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="例：info@example.com"
                  className="w-full px-4 py-3 rounded-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-0 transition-colors"
                  style={inputBorder}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  従業員数<span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  required
                  value={formData.employeeCount}
                  onChange={(e) => handleChange("employeeCount", e.target.value)}
                  className="w-full px-4 py-3 rounded-sm bg-background text-foreground outline-none focus:ring-0 transition-colors appearance-none cursor-pointer"
                  style={inputBorder}
                >
                  <option value="" disabled>
                    選択してください
                  </option>
                  <option value="1〜5名">1〜5名</option>
                  <option value="6〜10名">6〜10名</option>
                  <option value="11〜30名">11〜30名</option>
                  <option value="31〜50名">31〜50名</option>
                  <option value="51〜100名">51〜100名</option>
                  <option value="101名以上">101名以上</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  雇用保険の加入<span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  required
                  value={formData.employmentInsurance}
                  onChange={(e) =>
                    handleChange("employmentInsurance", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-sm bg-background text-foreground outline-none focus:ring-0 transition-colors appearance-none cursor-pointer"
                  style={inputBorder}
                >
                  <option value="" disabled>
                    選択してください
                  </option>
                  <option value="yes">はい</option>
                  <option value="no">いいえ</option>
                </select>
              </div>

              {submitState === "error" ? (
                <p className="text-sm text-red-600">{errorMessage}</p>
              ) : null}

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-medium text-white rounded-full transition-all hover:shadow-2xl relative overflow-hidden group disabled:cursor-not-allowed disabled:opacity-70"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff8a7a 0%, #ffb3a8 100%)",
                    boxShadow: "0 8px 32px rgba(255, 138, 122, 0.4)",
                  }}
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {submitState === "submitting"
                      ? "送信中..."
                      : "無料診断を申し込む"}
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
