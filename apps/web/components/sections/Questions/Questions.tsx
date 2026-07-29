"use client"

import { useState } from "react"
import styles from "./Questions.module.scss"
import SectionHead from "@/components/ui/SectionHead"
const questionsList = [
  {
    title: "株式会社きっかけは、どのような会社ですか？",
    text: "企業や個人事業主の皆さまが抱える経営上のお悩みに対して、必要な支援やサポートをご提案する会社です。"
  },
  {
    title: "まだ相談内容がまとまっていなくても大丈夫ですか？",
    text: "はい、問題ございません。\nコンサルタントがお話を伺いながら、現在の状況や課題を整理し、必要なサポートをご提案いたします。"
  },
  {
    title: "一般的な経営コンサルティングとは何が違いますか？",
    text: "株式会社きっかけでは、経営に関するご相談の中でも、補助金・助成金・支援制度などの活用サポートを中心に行っています。\n\nお客さまの状況を確認したうえで、活用できる可能性のある制度や必要な準備についてご案内いたします。"
  },
  {
    title: "どのような業種の支援に対応していますか？",
    text: "業種による制限は設けておりません。\nさまざまな業種の法人・個人事業主の皆さまからご相談いただけます。"
  },
  {
    title: "個人事業主や小規模な会社でも相談できますか？",
    text: "はい、ご相談いただけます。\n事業規模にかかわらず、それぞれの状況に合わせてご提案いたします。"
  },
  {
    title: "初回相談に費用はかかりますか？",
    text: "初回相談は無料です。\nまずは現在のお悩みやご希望をお聞かせください。"
  },
  {
    title: "相談前に準備するものはありますか？",
    text: "初回相談の段階では、特別にご準備いただくものはありません。\nお話を伺ったうえで、必要な情報や書類がある場合は改めてご案内いたします。"
  },
  {
    title: "相談したら必ず契約しなければなりませんか？",
    text: "いいえ、ご相談いただいたからといって、必ずご契約いただく必要はありません。\nご提案内容をご確認いただき、十分にご納得いただいたうえでご判断ください。"
  },
  {
    title: "オンラインで相談できますか？",
    text: "はい、オンラインでのご相談も可能です。\n遠方の方や、ご来社が難しい方もお気軽にご相談ください。"
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
