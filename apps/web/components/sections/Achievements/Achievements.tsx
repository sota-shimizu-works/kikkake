"use client"

import Image from "next/image"
import SectionHead from "@/components/ui/SectionHead"
import styles from "./Achievements.module.scss"

const cases = [
  {
    title: "労働環境改善の支援",
    description: "キャッシュフローの見える化と収支改善施策の実行サポート。",
    label: "月次の資金繰り改善額",
    value: "420",
    unit: "万円",
    trend: "plus",
  },
  {
    title: "農業現場の制度改善",
    description: "農業規則や評価制度を見直して、働きやすい職場づくりを実現",
    label: "従業員満足度",
    value: "28",
    unit: "%向上",
    trend: "plus",
  },
  {
    title: "設備投資の準備支援",
    description: "投資計画の立案から補助金申請まで、スムーズな実行を支援。",
    label: "補助金採択率",
    value: "90",
    unit: "%向上",
    trend: "plus",
  },
  {
    title: "経営課題の整理",
    description: "現状分析と課題の優先順位づけで、経営の軸を明確化",
    label: "重要課題の実行率",
    value: "75",
    unit: "%向上",
    trend: "plus",
  },
  {
    title: "専門家との連携支援",
    description: "税理士・社労士・弁護士等との連携で課題をワンストップで解決",
    label: "対応スピード",
    value: "40",
    unit: "%改善",
    trend: "minus",
  },
  {
    title: "採用・定着支援",
    description: "採用戦略の策定と定着支援で、人材の確保と定着を支援。",
    label: "定着率",
    value: "35",
    unit: "%改善",
    trend: "plus",
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className={styles.section}>
      <div className={styles.top}>
        <div className="page-width">
          <div className={styles.inner}>
            <SectionHead en="CASE" ja="実績紹介" align="center" />

            <p className={styles.intro}>
              <span>株式会社きっかけ</span>では、企業様の状況に合わせて、経営改善に向けた支援を行っています。
            </p>

            <div className={styles.grid}>
              {cases.map((item) => (
                <article key={`${item.title}-${item.label}`} className={styles.card}>
                  <div className={styles.cardText}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDescription}>{item.description}</p>
                  </div>

                  <div className={styles.metric}>
                    <p className={styles.metricLabel}>{item.label}</p>
                    <div className={styles.metricValue}>
                      <Image
                        src={item.trend === "plus" ? "/achieve/plus-icon.svg" : "/achieve/minus-icon.svg"}
                        alt=""
                        width={16}
                        height={16}
                        className={styles.metricIcon}
                      />
                      <span className={styles.metricNumber}>{item.value}</span>
                      <span className={styles.metricUnit}>{item.unit}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className={styles.message}>
              それぞれの会社に、それぞれの課題と未来があります。
              <br />
              きっかけは、オーダーメイドの支援で「次の一歩」を共に創ります。
            </p>
          </div>
        </div>
      </div>

      <div className={styles.imageWrap}>
        <Image
          src="/achieve/achieve-img.png"
          alt="実績紹介イメージ"
          width={1920}
          height={575}
          className={styles.bottomImage}
        />
      </div>
    </section>
  )
}
