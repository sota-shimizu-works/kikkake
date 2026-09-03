"use client"

import SectionHead from "@/components/ui/SectionHead"
import styles from "./About.module.scss"

const principles = [
  {
    title: "Mission",
    text: "営業を通して、人生に前向きなきっかけを届ける。",
    tone: "mission",
  },
  {
    title: "Vision",
    text: "「いい営業マン」が、「いい会社」を創る",
    tone: "vision",
  },
  {
    title: "Value",
    text: "GiveFirstで動き、人の心に残る仕事をする",
    tone: "value",
  },
] as const

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="page-width">
        <div className={styles.inner}>
          <div className={styles.left}>
            <SectionHead en="ABOUT" ja="株式会社きっかけ" align="left" />

            <div className={styles.message}>
              <p>人と企業に前向きな</p>
              <p>変化が生まれる</p>
              <p>
                その<span>きっかけ</span>になることが、
              </p>
              <p>私たちの使命です</p>
            </div>

            <div className={styles.body}>
              <p>株式会社きっかけは、</p>
              <p>営業を通して企業と人の可能性を広げる会社です</p>
              <p>私たちは、ただサービスを案内するだけではなく、</p>
              <p>相手の状況を理解すること</p>
              <p>支援を届けることを大切にしています</p>
            </div>
          </div>

          <div className={styles.right}>
            {principles.map((item) => (
              <div key={item.title} className={styles.principle}>
                <div className={styles.principleHead}>
                  <h3 className={`${styles.principleTitle} ${styles[item.tone]}`}>
                    {item.title}
                  </h3>
                  <span className={`${styles.principleLine} ${styles[item.tone]}`} />
                </div>
                <p className={styles.principleText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
