"use client"
import SectionHead from "@/components/ui/SectionHead"
import styles from "./Concerns.module.scss"
import RightArrowButton from "@/components/ui/RightArrowButton"
export default function Concerns() {
  return (
    <section id="concerns" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.textBlock}>
            <div className={styles.sectionTitle}>
              <p className={styles.eyebrow}>
                <span className={styles.accent}>S</span>OLUTION
              </p>
              <h2 className={styles.title}>そのお悩みに、<br />私たちが「きっかけ」をつくります</h2>
            </div>
            <p className={styles.text}>
              私たちは経営課題に寄り添い、未来を共に描くパートナーです。<br />
              小さな一歩が、やがて大きな成長へ。<br />
              そのきっかけを、ここから。
            </p>
            <RightArrowButton
              kind="link"
              href="#contact"
              text="無料相談する"
              className={styles.button}
            />
          </div>
          <div className={styles.imageBlock}>
            <img src="/concerns/concernsInfoGraphic.svg" alt="「資金繰りの改善」「設備投資をしたい」「情報収集・手続きリソース不足」「経営改善のご相談」「労働環境の整理」これらの経営課題を持つお客様に私たち株式会社きっかけはパートナーとして寄り添い、共に解決していきます。" />
          </div>
        </div>
      </div>
    </section>
  )
}
