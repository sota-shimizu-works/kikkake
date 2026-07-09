"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";

const works = [
  {
    id: 1,
    title: "無料受給可能診断",
    category: "無料診断",
    description:
      "まずは、御社がいくら受け取れる可能性があるか、答え合わせをしてみませんか？",
    image: "/images/image01.png",
    tags: [],
  },
  {
    id: 2,
    title: "社労士連携",
    category: "専門家連携",
    description:
      "提携社労士と連携し、就業規則や賃金台帳などの整備をスムーズに進めます。",
    image: "/images/image02.png",
    tags: [],
  },
  {
    id: 3,
    title: "書類作成サポート",
    category: "申請サポート",
    description:
      "必要書類の作成や整備をサポートし、提出前のチェックまで一貫対応します。",
    image: "/images/image03.png",
    tags: [],
  },
  {
    id: 4,
    title: "受給後のフォロー",
    category: "アフターフォロー",
    description:
      "受給後の報告対応や次回申請に向けた改善提案まで丁寧にサポートします。",
    image: "/images/image04.png",
    tags: [],
  },
];

export function SelectedWorks() {
  return (
    <section id="works" className="py-20 md:py-10 md:pt-32 pb-4">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            サービス内容
          </SectionTitle>
        </div>

        <div className="relative">
          {works.map((work, index) => (
            <div
              key={work.id}
              className="sticky"
              style={{
                top: `${70 + index * 0}px`,
                zIndex: index + 1,
              }}
            >
              <Link href="#" className="group block pt-10">
                <article className="overflow-hidden rounded-2xl md:rounded-3xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative aspect-[3/1] overflow-hidden bg-secondary">
                    <Image
                      src={work.image || "/placeholder.svg"}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold">
                          {work.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {work.description}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {work.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
