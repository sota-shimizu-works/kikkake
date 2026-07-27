"use client"

import Image from "next/image"
import styles from "./MainVisual.module.scss"

export default function MainVisual() {
  return (
    <section className={styles.section}>
      <div className={styles.imageLayer}>
        <Image
          src="/mainvisual/mainvisual.png"
          alt="経営支援のイメージ"
          fill
          priority
          className={styles.backgroundImage}
          sizes="100vw"
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.copyPanel}>
          <p className={styles.copyText}>
            経営に、
            <br />
            前向きな
            <br />
            きっかけを
          </p>
        </div>

        <div className={styles.scrollCue}>
          <span className={styles.scrollLabel}>ScrollDown</span>
          <span className={styles.scrollIcon}>
            <Image
              src="/mainvisual/under_arrow.svg"
              alt=""
              width={12}
              height={12}
            />
          </span>
        </div>
      </div>
    </section>
  )
}
