"use client"

import SectionHead from "@/components/ui/SectionHead"
import styles from "./SupportFlow.module.scss"

export default function SupportFlow() {
  return (
    <section id="support-flow" className={styles.section}>
      <div className="page-width">
        <SectionHead en="FLOW" ja="支援の流れ" align="left" />
      </div>
    </section>
  )
}
