"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const inputBorder = {
  border: "1px solid rgba(32, 62, 236, 0.3)",
};

export function FinalCTA() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
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

          {submitted ? (
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
              {/* 会社名 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  会社名（屋号）<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="例：Bizパートナー"
                  className="w-full px-4 py-3 rounded-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-0 transition-colors"
                  style={inputBorder}
                />
              </div>

              {/* 担当者名 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  ご担当者様名<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="例：山田 太郎"
                  className="w-full px-4 py-3 rounded-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-0 transition-colors"
                  style={inputBorder}
                />
              </div>

              {/* メールアドレス */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  メールアドレス<span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="例：info@example.com"
                  className="w-full px-4 py-3 rounded-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-0 transition-colors"
                  style={inputBorder}
                />
              </div>

              {/* 従業員数 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  従業員数<span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-sm bg-background text-foreground outline-none focus:ring-0 transition-colors appearance-none cursor-pointer"
                  style={inputBorder}
                  defaultValue=""
                >
                  <option value="" disabled>
                    選択してください
                  </option>
                  <option value="1-5">1〜5名</option>
                  <option value="6-10">6〜10名</option>
                  <option value="11-30">11〜30名</option>
                  <option value="31-50">31〜50名</option>
                  <option value="51-100">51〜100名</option>
                  <option value="101+">101名以上</option>
                </select>
              </div>

              {/* 雇用保険の加入 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-foreground">
                  雇用保険の加入<span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-sm bg-background text-foreground outline-none focus:ring-0 transition-colors appearance-none cursor-pointer"
                  style={inputBorder}
                  defaultValue=""
                >
                  <option value="" disabled>
                    選択してください
                  </option>
                  <option value="yes">はい</option>
                  <option value="no">いいえ</option>
                </select>
              </div>

              {/* Submit */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 text-base font-medium text-white rounded-full transition-all hover:shadow-2xl relative overflow-hidden group"
                  style={{
                    background:
                      "linear-gradient(135deg, #ff8a7a 0%, #ffb3a8 100%)",
                    boxShadow: "0 8px 32px rgba(255, 138, 122, 0.4)",
                  }}
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    無料診断を申し込む
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
