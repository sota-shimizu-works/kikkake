"use client"

import { useState } from "react"
import styles from "./Questions.module.scss"
import SectionHead from "@/components/ui/SectionHead"
const questionsList = [
  {
    title: "労働環境改善に関する支援",
    text: "はい、大丈夫です。\n現状をお伺いしたうえで、必要な支援内容を一緒に整理します。"
  },
  {
    title: "オンラインで相談できますか？",
    text: "サンプルテキスト①サンプルテキスト①\nサンプルテキスト①サンプルテキスト①サンプルテキスト①"
  },
  {
    title: "どのような企業が対象ですか？",
    text: "サンプルテキスト②サンプルテキスト②\nサンプルテキスト②\nサンプルテキスト②\nサンプルテキスト②"
  },
  {
    title: "料金はどのタイミングでわかりますか？",
    text: "サンプルテキスト③サンプルテキスト③\nサンプルテキスト③サンプルテキスト③サンプルテキスト③"
  },
  {
    title: "採用応募は未経験でも可能ですか？",
    text: "サンプルテキスト④サンプルテキスト④サンプルテキスト④\nサンプルテキスト④サンプルテキスト④"
  }
]

export default function Questions() {
  // Accordion開閉の状態管理
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  return (
    <section id="questions" className={styles.section}>
      <div className="page-width">
        <SectionHead en="FAQ" ja="よくある質問" align="center" className={styles.sectionHead} />
        <div className={styles.questionsList}>
          {questionsList.map((item, index) => {
            const isOpen = openIndexes.includes(index)

            return (
              <div key={index} className={`${styles.accordion} ${isOpen ? styles.isOpen : ""}`}>
                <div
                  className={styles.accordionHead}
                  onClick={() =>
                    setOpenIndexes((prev) =>
                      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
                    )
                  }
                >
                  <div className={styles.circle}>
                    <img src="/questions/icon-question.svg" alt="質問" />
                  </div>
                  <p className={styles.title}>{item.title}</p>
                  <div className={styles.cross}>

                  </div>
                </div>
                <div className={styles.accordionContent}>
                  <p>{item.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}
