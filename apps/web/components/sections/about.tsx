"use client";

const skills = [
  "AI Product Design",
  "Vibe Coding",
  "v0 by Vercel",
  "Prompt Engineering",
  "Midjourney/DALL-E",
  "ChatGPT/Claude",
  "Figma AI",
  "Design Systems",
  "Generative UI",
];

const stats = [
  { value: "5社以上", label: "提携コンサル会社" },
  { value: "全国対応", label: "オンライン完結" },
  { value: "無料", label: "相談・診断" },
];

import { SectionTitle } from "@/components/ui/section-title";

export function About() {
  return (
    <section
      id="about"
      className="py-20 border-border border-t-0 md:py-10 md:pb-32 md:pt-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div>
            <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              企業にとって最適な助成金活用を
            </SectionTitle>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Bizパートナーは、複数の助成金コンサルティング会社と提携し、企業ごとに最適な助成金活用をご提案しています。
              助成金の提案は、所属するコンサル会社によって紹介できる制度が限られてしまうケースも少なくありません。
              私たちは特定の1社に属さない立場だからこそ、御社にとって本当にメリットのある助成金のみをご案内できます。
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              また、助成金申請は制度理解や書類作成など多くの手続きが必要になるため、本業に集中できないという声も多くあります。
              Bizパートナーではオンラインでのサポート体制を整え、全国どこからでも安心してご相談いただける環境を整えています。
              「無理な申請を勧めないこと」
              「企業にとって負担の少ない制度を選ぶこと」
              この2つを大切にしながらサポートを行っています。
            </p>
          </div>

          {/* Right Content */}
          <div>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-secondary rounded-2xl"
                >
                  <div className="text-2xl md:text-3xl font-semibold">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
