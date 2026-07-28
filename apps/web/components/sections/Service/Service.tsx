"use client"

import styles from "./Service.module.scss"
import SectionHead from "@/components/ui/SectionHead"
import RightArrowButton from "@/components/ui/RightArrowButton"

const supportSteps = [
  "現状のヒアリング",
  "課題整理",
  "制度・支援策の確認",
  "専門家との連携",
  "進行管理"
]
const serviceContents = [
  {
    title: "資金繰りの相談支援",
    icon: "/service/icon-chart.svg"
  },
  {
    title: "労働環境改善の支援",
    icon: "/service/icon-cycle.svg"
  },
  {
    title: "設備投資の相談支援",
    icon: "/service/icon-cost.svg"
  },
  {
    title: "経営課題の整理",
    icon: "/service/icon-books.svg"
  },
  {
    title: "各種制度活用のサポート",
    icon: "/service/icon-operator.svg"
  },
  {
    title: "専門家との連携支援",
    icon: "/service/icon-hand.svg"
  },
]


export default function Service() {
  return (
    <section id="service" className={styles.section}>
      <div className="page-width">
        <SectionHead en="SERVICE" ja="サービスの紹介" align="center" className={styles.sectionHead} />
        <h3 className={styles.headingText}>
          <span className={styles.colored}>株式会社きっかけ</span>では、<br />
          経営課題に合わせて、支援内容の整理から実行までサポートします。
        </h3>
        <p className={styles.introText}>単なる情報提供だけでなく、企業様に寄り添いながら進めていきます。</p>
        <div className={styles.content01}>
          <div className={styles.contentTitle}>
            サポートステップ
          </div>
          <ul className={styles.supportStepsList}>
            {supportSteps.map((item, index) => (
              <li key={index} className={styles.supportStepsItem}>
                <div className={styles.supportStepsItemNumber}>
                  <span>{(index + 1).toString().padStart(2, "0")}</span>
                </div>
                <p className={styles.supportStepsItemTitle}>{item}</p>
              </li>
            ))}
          </ul>

          <RightArrowButton
            kind="link"
            href="#support-flow"
            text="支援の流れ"
            className={styles.button}
          />
        </div>
        <div className={styles.contentTitle}>
          主な支援内容
        </div>
        <ul className={styles.serviceContents}>
          {serviceContents.map((item, index) => (
            <li key={index} className={styles.serviceContentsItem}>
              <div className={styles.serviceContentsItemImage}>
                <img src={item.icon} alt={item.title} />
                </div>
              <div>
                <div className={styles.sserviceContentsItemNumber}>
                  <span>SERVICE {(index + 1).toString().padStart(2, "0")}</span>
                </div>
                <p className={styles.serviceContentsItemTitle}>{item.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
