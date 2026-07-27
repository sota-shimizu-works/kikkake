"use client"

import Image from "next/image"
import styles from "./Recruit.module.scss"

const works = [
  "オンラインMTG対応",
  "電話対応業務",
  "お客様へのヒアリング",
  "サービス説明",
  "資料案内",
  "お問い合わせ対応",
  "進行状況の確認",
  "社内メンバーとの連携",
]

const values = [
  "人と話すことが好きな方",
  "誠実に対応できる方",
  "相手のために動ける方",
  "成長意欲がある方",
  "人間力を高めたい方",
  "チームで成果を出したい方",
]

export default function Recruit() {
  return (
    <section id="recruit" className={styles.section}>
      <div className="page-width">
        <div className={styles.inner}>
          <div className={styles.head}>
            <p className={styles.eyebrow}>RECRUIT</p>
            <h2 className={styles.title}>採用情報</h2>
          </div>

          <div className={styles.lead}>
            <p>人の人生に、前向きなきっかけを届ける仕事</p>
            <p>
              株式会社きっかけでは、経営支援に関わる営業・サポートメンバーを募集しています
            </p>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>業務内容</h3>
            <div className={styles.workGrid}>
              {works.map((item, index) => (
                <div key={item} className={styles.workCard}>
                  <span className={styles.workLabel}>
                    WORK {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.workText}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockTitle}>求める人物像</h3>
            <div className={styles.valueGrid}>
              {values.map((item) => (
                <div key={item} className={styles.valueCard}>
                  <Image
                    src="/recruit/check-icon.svg"
                    alt=""
                    width={24}
                    height={24}
                    className={styles.valueIcon}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.message}>
            <p>営業は、ただ売る仕事ではありません。</p>
            <p>相手の人生や会社に、前向きな変化を届ける仕事です。</p>
            <p className={styles.messageBottom}>
              私たちは、本気で向き合える仲間を求めています。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
