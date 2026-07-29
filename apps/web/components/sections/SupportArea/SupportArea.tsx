"use client"

import Image from "next/image"
import { type CSSProperties, useEffect, useRef, useState } from "react"
import SectionHead from "@/components/ui/SectionHead"
import styles from "./SupportArea.module.scss"

// 入力内容の配列
const supportContentItems = [
  {
    title: "資金繰りの支援",
    text: "状況をヒアリングし、資金面の課題や今後必要な対応を整理します必要に応じて、活用できる制度や専門家との連携も含めてサポートします。",
    image: "/support/support-image01.png"
  },
  {
    title: "経営相談",
    text: "今すぐ明確な課題が決まっていなくても、現状をお伺いしながら、今後取り組むべき方向性を一緒に整理します",
    image: "/support/support-image02.png"
  },
  {
    title: "設備投資支援",
    text: "事業拡大や業務効率化に必要な設備投資について、計画段階から相談を受け付けます導入目的や投資効果を整理し、必要な準備を支援します",
    image: "/support/support-image03.png"
  },
  {
    title: "労働環境改善支援",
    text: "従業員が働きやすい環境づくりに向けて、制度整備や社内体制の見直しを支援します。採用・定着・育成につながる職場環境づくりをサポートします",
    image: "/support/support-image04.png"
  }
]

// 値を0〜1の範囲に制限する関数
const clamp = (value: number) => Math.max(0, Math.min(1, value))

export default function SupportArea() {
  // スクロール位置の監視と状態管理
  const rootRef = useRef<HTMLDivElement | null>(null)
  // スクロールセクションの参照を保持する配列
  const scrollSectionRefs = useRef<(HTMLDivElement | null)[]>([])
  // 現在アクティブなスライドのインデックスを管理する状態
  const [activeIndex, setActiveIndex] = useState(0)
  // 各スライドの進捗状況を管理する状態（0〜1の範囲）
  const [progresses, setProgresses] = useState<number[]>(
    () => supportContentItems.map(() => 0)
  )
  useEffect(() => {
    // 画面幅1025px以上をデスクトップとしてstickyareaの挙動を行う
    const desktopQuery = window.matchMedia("(min-width: 1025px)")
    // ユーザーが「動きの少ない表示」を希望しているかどうかを判定するメディアクエリ
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frameId = 0
    // スクロールイベントやリサイズイベントに応じて状態を更新する関数
    const update = () => {
      frameId = 0
      // デスクトップ表示でない場合は、アクティブインデックスを0にリセットし、進捗状況を初期化する
      if (!rootRef.current || !desktopQuery.matches || reduceMotionQuery.matches) {
        setActiveIndex(0)
        setProgresses(supportContentItems.map(() => 0))
        return
      }
      // ルート要素の位置を取得し、画面外にある場合は処理を中断する
      const viewportHeight = window.innerHeight || 1
      // ルート要素の位置を取得
      const rootRect = rootRef.current.getBoundingClientRect()
      // ルート要素が画面外にある場合は処理を中断する
      if (rootRect.top >= viewportHeight || rootRect.bottom <= 0) {
        return
      }
      // 各スクロールセクションの進捗状況を計算し、アクティブインデックスを更新する
      let nextActiveIndex = 0
      const nextProgresses = scrollSectionRefs.current.map((element, index) => {
        // 要素が存在しない場合は進捗を0に設定
        if (!element) {
          return 0
        }
        // 要素の位置を取得し、進捗を計算
        const rect = element.getBoundingClientRect()
        const progress = clamp(-rect.top / Math.max(rect.height, 1))
        // 要素が画面中央から下にある場合はインデックスを更新
        if (rect.top <= viewportHeight * 0.5 && rect.bottom > viewportHeight * 0.5) {
          nextActiveIndex = index
        }

        return progress
      })
      // ルート要素の下端が画面中央より上にある場合は、次のスライドをアクティブに設定
      if (rootRect.bottom <= viewportHeight * 0.5) {
        nextActiveIndex = supportContentItems.length - 1
      }
      // アクティブインデックスと進捗状況を更新する
      setActiveIndex((current) =>
        current === nextActiveIndex ? current : nextActiveIndex
      )
      // 進捗状況が変化した場合のみ更新することで、不要な再レンダリングを防ぐ
      setProgresses((current) => {
        const changed = nextProgresses.some(
          (progress, index) => Math.abs(progress - (current[index] ?? 0)) > 0.003
        )

        return changed ? nextProgresses : current
      })
    }
    // requestAnimationFrameを使用してスクロールイベントの処理を最適化する関数
    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(update)
      }
    }
    // スクロールイベント、リサイズイベント、メディアクエリの変更イベントに対して、requestUpdate関数を呼び出すように設定
    requestUpdate()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)
    desktopQuery.addEventListener("change", requestUpdate)
    reduceMotionQuery.addEventListener("change", requestUpdate)
    // クリーンアップ関数を返して、イベントリスナーを削除する
    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      desktopQuery.removeEventListener("change", requestUpdate)
      reduceMotionQuery.removeEventListener("change", requestUpdate)
    }
  }, [])
  // スライドのインデックスに基づいてスクロールする関数
  const scrollToSlide = (index: number) => {
    scrollSectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <section id="support-area" className={styles.section}>
      <div className={styles.container}>
        <div
          ref={rootRef}
          className={styles.supportContent}
          style={
            {
              "--slide-count": supportContentItems.length,
              "--active-index": activeIndex,
              "--support-content-height": `${supportContentItems.length * 100}vh`,
              "--thumb-active-y": `${activeIndex * 82}px`,
            } as CSSProperties
          }
        >
          <div className={styles.supportElevator}>
            <div className={styles.stickyArea}>
              <div className={styles.copyArea}>
                <SectionHead
                  en="SUPPORT"
                  ja="支援領域"
                  align="left"
                  className={styles.sectionHead}
                />

                <div className={styles.copyStack}>
                  {supportContentItems.map((item, index) => (
                    <div
                      key={item.title}
                      className={`${styles.slideCopy} ${index === activeIndex
                        ? styles.isCurrent
                        : index < activeIndex
                          ? styles.isPrevious
                          : styles.isNext
                        }`}
                    >
                      <h3 className={styles.headingTitle}>{item.title}</h3>
                      <p className={styles.slideText}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.imageArea}>
                <div className={styles.imageStage} aria-hidden="true">
                  {supportContentItems.map((item, index) => {
                    const reveal =
                      index === 0
                        ? 1
                        : progresses[index - 1] ?? (index <= activeIndex ? 1 : 0)
                    const ownProgress = progresses[index] ?? 0
                    const isEntering = index > 0 && reveal < 1
                    const imageScale = isEntering
                      ? 1 + (1 - reveal) * 0.04
                      : 1 + ownProgress * 0.04
                    const imageY = isEntering ? 0 : ownProgress * -8

                    return (
                      <div
                        key={item.image}
                        className={styles.imagePanel}
                        style={
                          {
                            "--reveal": reveal,
                            "--clip-edge": `${(1 - reveal) * 100}%`,
                            "--image-scale": imageScale,
                            "--image-y": `${imageY}%`,
                            zIndex: index + 1,
                          } as CSSProperties
                        }
                      >
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="(min-width: 1025px) 46vw, 100vw"
                          priority={index === 0}
                        />
                      </div>
                    )
                  })}
                </div>
                <nav className={styles.thumbNav} aria-label="支援領域のスライド">
                  <ul>
                    {supportContentItems.map((item, index) => (
                      <li>
                        <button
                          key={item.title}
                          type="button"
                          className={`${styles.thumbButton} ${index === activeIndex ? styles.isCurrent : ""
                            }`}
                          onClick={() => scrollToSlide(index)}
                          aria-label={`${item.title}へ移動`}
                        >
                          <Image src={item.image} alt="" width={56} height={72} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className={styles.scrollArea} aria-hidden="true">
              {supportContentItems.map((item, index) => (
                <div
                  key={item.title}
                  ref={(element) => {
                    scrollSectionRefs.current[index] = element
                  }}
                  className={styles.scrollSection}
                />
              ))}
            </div>
          </div>
          <div className={styles.mobileArea}>
            <SectionHead
              en="SUPPORT"
              ja="支援領域"
              align="left"
              className={styles.sectionHead}
            />
            <div className={styles.mobileList}>
              {supportContentItems.map((item, index) => (
                <div key={index} className={styles.mobileListItem}>
                  <div className={styles.slideImage}>
                    <Image src={item.image} alt={item.title} width={708} height={531} />
                  </div>
                  <div className={styles.slideCopy}>
                    <h3 className={styles.headingTitle}>{item.title}</h3>
                    <p className={styles.slideText}>{item.text}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
        <h3 className={styles.sectionCatchcopy}>
          「きっかけ」をつくり、未来をひらく。<br />
          私たちは、事業の成長に<br className={styles.hidden} />伴走するパートナーです。
        </h3>
      </div>
    </section>
  )
}
