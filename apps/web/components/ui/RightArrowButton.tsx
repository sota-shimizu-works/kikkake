import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import styles from "./RightArrowButton.module.scss"

type BaseProps = {
  text: string
  className?: string
}

type SubmitProps = BaseProps & {
  kind: "submit"
}

type LinkProps = BaseProps & {
  kind: "link"
  href: string
}

type RightArrowButtonProps = SubmitProps | LinkProps

export default function RightArrowButton(props: RightArrowButtonProps) {
  const content = (
    <>
      <span>{props.text}</span>
      <span className={styles.icon}>
        <Image src="/contact/right-arrow.svg" alt="" width={18} height={18} />
      </span>
    </>
  )

  if (props.kind === "link") {
    return (
      <Link href={props.href} className={cn(styles.button, props.className)}>
        {content}
      </Link>
    )
  }

  return (
    <button type="submit" className={cn(styles.button, props.className)}>
      {content}
    </button>
  )
}
