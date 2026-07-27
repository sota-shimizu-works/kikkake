"use client"

import SectionHead from "@/components/ui/SectionHead"
import styles from "./SupportFlow.module.scss"

const steps = [
  {
    step: "STEP 01",
    title: "お問い合わせ",
    description: [
      "フォームよりお気軽にお問合せくださいませ。",
      "ご相談内容を確認のうえ、担当者様よりご連絡いたします。",
    ],
  },
  {
    step: "STEP 02",
    title: "初回ヒアリング",
    description: [
      "お客様の状況やご要望をじっくりお伺いします。",
      "理想の未来やお困りごとを一緒に整理します。",
    ],
  },
  {
    step: "STEP 03",
    title: "課題の整理",
    description: [
      "ヒアリング内容をもとに、課題の本質を明確化。",
      "優先順位をつけて、解決の方向性を整理します。",
    ],
  },
  {
    step: "STEP 04",
    title: "支援方針のご提案",
    description: [
      "整理した内容をもとに、最適なプランをご提案。",
      "ご納得いただいた上でサポートを開始します。",
    ],
  },
  {
    step: "STEP 05",
    title: "実行支援・進行管理",
    description: [
      "計画に基づき、実行を支援。",
      "進捗を確認しながら、改善を重ねてゴールを実現まで伴走します。",
    ],
  },
]

export default function SupportFlow() {
  return (
    <section id="support-flow" className={styles.section}>
      <div className="page-width">
        <div className={styles.inner}>
          <div className={styles.header}>
            <SectionHead en="FLOW" ja="支援の流れ" align="left" />
            <p className={styles.headerText}>
              お客様に寄り添い、
              <br />
              課題の整理から実行・運用まで一貫して伴走します。
            </p>
          </div>

          <div className={styles.list}>
            {steps.map((item) => (
              <div key={item.step} className={styles.card}>
                <div className={styles.cardHead}>
                  <span className={styles.step}>{item.step}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <div className={styles.cardBody}>
                  {item.description.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
