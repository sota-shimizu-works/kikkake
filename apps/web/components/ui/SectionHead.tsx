import { cn } from "@/lib/utils"
import styles from "./SectionHead.module.scss"

type SectionHeadProps = {
  en: string
  ja: string
  align?: "left" | "center"
  className?: string
  showDot?: boolean
}

export default function SectionHead({
  en,
  ja,
  align = "left",
  className,
  showDot = true,
}: SectionHeadProps) {
  const [first, ...rest] = en

  return (
    <div
      className={cn(
        styles.root,
        align === "center" ? styles.center : styles.left,
        className,
      )}
    >
      <p className={cn(styles.eyebrow, !showDot && styles.noDot)}>
        <span className={styles.accent}>{first}</span>
        {rest.join("")}
      </p>
      <h2 className={styles.title}>{ja}</h2>
    </div>
  )
}
