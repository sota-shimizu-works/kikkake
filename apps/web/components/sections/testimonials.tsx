"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionTitle } from "@/components/ui/section-title";

const testimonials = [
  {
    id: 1,
    quote:
      "助成金の申請は複雑で自社では対応できないと思っていましたが、Bizパートナーさんのサポートで無事に受給できました。設備計画が前に進み、事業拡大の一歩になっています。",
    author: "田中 健一",
    role: "製造業",
    avatar: "/images/customer1.png",
    company: "田中製作所",
    blurColor: "bg-blue-500",
  },
  {
    id: 2,
    quote:
      "小売業向けの助成金をわかりやすく整理していただき、申請から受給まで一貫してフォローしてもらえました。担当者の対応が親切で安心して任せられました。",
    author: "鈴木 美咲",
    role: "小売業",
    avatar: "/images/customer2.png",
    company: "スズキ商店",
    blurColor: "bg-purple-500",
  },
  {
    id: 3,
    quote:
      "設備投資に使える助成金で必要な機材を導入できました。申請書の作成から確認まで伴走してもらえたので、迷わず進められました。",
    author: "山本 浩二",
    role: "精密加工業",
    avatar: "/images/customer3.png",
    company: "山本精工",
    blurColor: "bg-pink-500",
  },
  {
    id: 4,
    quote:
      "新規事業への転換を考えていたところ、助成金を活用して資金面の不安を抑えながらスタートできました。相談から申請までとてもスムーズでした。",
    author: "伊藤 直樹",
    role: "飲食業",
    avatar: "/images/customer4.png",
    company: "伊藤フードサービス",
    blurColor: "bg-emerald-500",
  },
  {
    id: 5,
    quote:
      "社会保険労務士との連携もスムーズで、人材採用や定着に使える助成金の提案が非常に参考になりました。採用コストを抑えつつ体制を整えられました。",
    author: "中村 沙織",
    role: "人事部長・IT企業",
    avatar: "/images/customer6.png",
    company: "ナカムラテック",
    blurColor: "bg-orange-500",
  },
  {
    id: 6,
    quote:
      "初めての助成金申請で不安でしたが、手順をわかりやすく説明していただきました。書類準備の負担が最小限で済み、本業に集中できました。",
    author: "渡辺 誠",
    role: "建設業",
    avatar: "/images/customer-watanabe.png",
    company: "渡辺建設",
    blurColor: "bg-cyan-500",
  },
  {
    id: 7,
    quote:
      "複数の助成金制度を横断的に調査・提案してもらえたのが助かりました。自社では気づかなかった制度も活用でき、支援の幅が大きく広がりました。",
    author: "小林 恵子",
    role: "サービス業",
    avatar: "/images/customer7.png",
    company: "コバヤシサービス",
    blurColor: "bg-rose-500",
  },
];

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  const duplicatedTestimonials = [...testimonials, ...testimonials];
  const duplicatedTestimonialsReverse = [
    ...testimonials.slice().reverse(),
    ...testimonials.slice().reverse(),
  ];
  const mobileTestimonials = testimonials.slice(0, 6);

  return (
    <section
      id="testimonials"
      className="py-20 border-border overflow-hidden md:py-32 border-t-[0] pb-0 relative"
    >
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20 hidden lg:block" />

      <div className="hidden lg:block pl-6 md:pl-12">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 max-w-[1280px]">
          <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            お客様の声
          </SectionTitle>
        </div>

        <div className="relative mb-6">
          <div
            className="flex gap-6 animate-scroll-left"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <article
                key={`${testimonial.id}-${index}`}
                className="relative flex-shrink-0 w-[85vw] md:w-[400px] p-6 md:p-8 border bg-card hover:shadow-lg transition-shadow overflow-hidden border-zinc-100 md:px-6 md:py-6 rounded-3xl"
              >
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-base leading-relaxed font-semibold text-zinc-950 relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                <div
                  className={`absolute -bottom-12 -right-12 w-48 h-48 ${testimonial.blurColor} rounded-full opacity-10`}
                  style={{ filter: "blur(72px)" }}
                />
              </article>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="flex gap-6 animate-scroll-right"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {duplicatedTestimonialsReverse.map((testimonial, index) => (
              <article
                key={`reverse-${testimonial.id}-${index}`}
                className="relative flex-shrink-0 w-[85vw] md:w-[400px] p-6 md:p-8 border bg-card hover:shadow-lg transition-shadow overflow-hidden border-zinc-100 md:px-6 md:py-6 rounded-3xl"
              >
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-base leading-relaxed font-semibold text-zinc-950 relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                <div
                  className={`absolute -bottom-12 -right-12 w-48 h-48 ${testimonial.blurColor} rounded-full opacity-10`}
                  style={{ filter: "blur(72px)" }}
                />
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:hidden max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            お客様の声
          </SectionTitle>
        </div>

        <div className="relative">
          {mobileTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="sticky pt-10"
              style={{
                top: `${70 + index * 0}px`,
                zIndex: index + 1,
              }}
            >
              <article className="relative p-6 md:p-8 border bg-card transition-shadow overflow-hidden border-zinc-100 rounded-3xl">
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-base leading-relaxed font-semibold text-zinc-950 relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                <div
                  className={`absolute -bottom-12 -right-12 w-48 h-48 ${testimonial.blurColor} rounded-full opacity-10`}
                  style={{ filter: "blur(72px)" }}
                />
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none z-10 lg:hidden" />
    </section>
  );
}
