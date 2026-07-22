"use client"

import styles from "./MainVisual.module.scss"

export default function MainVisual() {
  return (
    <section
      className={`${styles.section} relative flex h-[calc(100vh-80px)] w-full items-center justify-center bg-gradient-to-b from-[#203eec] to-[#203eec]/10 md:h-[calc(100vh-120px)]`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-center text-4xl leading-tight font-bold text-white md:text-6xl lg:text-7xl">
          株式会社きっかけ
        </h1>
      </div>
    </section>
  )
}
