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

// ##stickyスクロール連動アニメーション処理の概要##
// SupportArea内にスライド数分の縦長のスクロール領域を作っています。
// その各領域が画面中央に来たタイミングで、現在のスライド番号を更新します。現在のスライド番号が変わると、タイトルと本文の表示クラスが切り替わり、
// 前の内容は横に抜けてフェードアウトし、新しい内容は横から入ってフェードインします。

// 画像側は、各スライド画像を同じ位置に重ねて配置しています。
// スクロール進行度に応じて次の画像のマスク位置を変え、下から上へ画像が現れるように見せています。
// 同時に画像の拡大率と少しの上下移動はスクロール進行度から計算しています。

// 画面幅が1024px以下の場合このスクロール連動処理を止めています。
// その場合は通常の縦並び表示になり、スクロールで読めるようになります。

// 画像のマスクや拡大率の計算のためスクロール進行度を必ず0〜1の範囲に収めるための関数
const clamp = (value: number) => Math.max(0, Math.min(1, value))

export default function SupportArea() {
  // スクロール位置の監視と状態管理
  const rootRef = useRef<HTMLDivElement | null>(null)
  // 各スライド用のスクロール領域の参照を保持するための配列
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
    let frameId = 0
    // スクロールイベントやリサイズイベントに応じて状態を更新する関数
    const update = () => {
      frameId = 0
      // ルート要素が存在しない、またはデスクトップでない場合は、アクティブインデックスと進捗状況をリセットする
      if (!rootRef.current || !desktopQuery.matches) {
        setActiveIndex(0)
        setProgresses(supportContentItems.map(() => 0))
        return
      }
      // ルート要素の位置を取得し、画面外にある場合は処理を中断する
      const viewportHeight = window.innerHeight || 1
      // ルート要素の位置を取得
      const rootRect = rootRef.current.getBoundingClientRect()
      // ルート要素の上端が画面の下端より下にある状態（画面外にある状態）なら処理を中断
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
        // 要素の上端が画面上部からどれだけスクロールされたかを計算し、要素の高さで割ることで進捗を求める
        const progress = clamp(-rect.top / Math.max(rect.height, 1))
        // 画面中央のラインがそのスライド領域の中に入った場合、そのスライド番号を更新（viewportHeight * 0.5は画面の縦方向の中央位置）
        if (rect.top <= viewportHeight * 0.5 && rect.bottom > viewportHeight * 0.5) {
          nextActiveIndex = index
        }
        // 進捗状況を返す
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
    // 不要な処理やメモリリーク、存在しないDOM参照を避けるために、イベントリスナーの登録はuseEffect内で行い、クリーンアップ関数で解除する
    requestUpdate()
    // ページ表示直後に一度、現在のスクロール位置からactiveIndexや画像マスク進行度を計算
    window.addEventListener("scroll", requestUpdate, { passive: true })
    // リサイズイベントやメディアクエリの変更イベントに応じて、再計算を行う
    window.addEventListener("resize", requestUpdate)
    // デスクトップ判定のメディアクエリに応じて、再計算を行う
    desktopQuery.addEventListener("change", requestUpdate)
    // クリーンアップ関数を返して、イベントリスナーを削除する
    return () => {
      // requestAnimationFrameのキャンセルとイベントリスナーの削除
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
      // スクロールイベント、リサイズイベント、メディアクエリの変更イベントのリスナーを削除
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      desktopQuery.removeEventListener("change", requestUpdate)
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
            // CSSカスタムプロパティを使用して、スライドの数、アクティブなインデックス、サポートコンテンツの高さ、サムネイルのY位置を設定
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
                    // 前のスライドの進捗状況を参照して、現在のスライドが表示される割合を計算する
                    const reveal =
                      index === 0
                        ? 1
                        : progresses[index - 1] ?? (index <= activeIndex ? 1 : 0)
                    // 前のスライドが表示されていない場合は、現在のスライドの表示割合を0にする
                    const ownProgress = progresses[index] ?? 0
                    // 現在のスライドが表示される割合に応じて、画像の拡大率とY方向の位置を計算
                    const isEntering = index > 0 && reveal < 1
                    // 前のスライドが表示されていない場合は、現在のスライドの拡大率と位置を前のスライドの進捗状況に基づいて計算
                    const imageScale = isEntering
                      ? 1 + (1 - reveal) * 0.04
                      : 1 + ownProgress * 0.04
                    // 前のスライドが表示されていない場合は、現在のスライドのY方向の位置を前のスライドの進捗状況に基づいて計算
                    const imageY = isEntering ? 0 : ownProgress * -8
                    return (
                      <div
                        key={item.image}
                        className={styles.imagePanel}
                        style={
                          {
                            // CSSカスタムプロパティを使用して、スライドの表示割合、クリップの位置、画像の拡大率、画像のY方向の位置、Zインデックスを設定
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
                          alt={item.title}
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
