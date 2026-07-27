"use client"

import Image from "next/image"
import SectionHead from "@/components/ui/SectionHead"
import RightArrowButton from "@/components/ui/RightArrowButton"
import styles from "./Plan.module.scss"

const freePlanItems = [
  "経営課題のヒアリング・整理",
  "現状分析と改善のヒント・ご提案",
  "今後の方向性やアドバイス",
  "90〜120分のオンライン会議",
]

const supportPlanItems = [
  "課題解決に向けた計画の立案",
  "実行支援・プロジェクト伴走",
  "専門家・パートナーとの連携支援",
  "進捗と改善提案で成果にコミット",
]

export default function Plan() {
  return (
    <section id="plan" className={styles.section}>
      <div className="page-width">
        <div className={styles.inner}>
          <SectionHead en="PLAN" ja="プラン紹介" align="center" />

          <p className={styles.intro}>
            企業様の状況や支援内容によって必要なサポートが異なるため、まずは初回相談にて内容を確認させていただきます
          </p>

          <div className={styles.hero}>
            <div className={styles.heroText}>
              <h3 className={styles.lead}>
                はじめのご相談から、
                <br />
                実行支援まで柔軟にサポートします。
              </h3>
              <p className={styles.description}>
                課題やご状況に合わせて、最適なプランをご提案します。
                <br />
                無理なご契約や強引なご案内は一切ありません。
                <br />
                ご安心してご相談ください。
              </p>

              <RightArrowButton
                kind="link"
                href="#contact"
                text="無料相談する"
                className={styles.button}
              />
            </div>

            <div className={styles.heroImageWrap}>
              <Image
                src="/plan/plan-image.png"
                alt="プラン相談のイメージ"
                width={951}
                height={507}
                className={styles.heroImage}
              />
            </div>
          </div>

          <div className={styles.cards}>
            <article className={styles.card}>
              <div className={styles.cardBadge}>
                まずは
                <br />
                お気軽に相談
              </div>
              <h3 className={styles.cardTitle}>
                <span>無料</span>経営相談プラン
              </h3>
              <p className={styles.cardLead}>
                経営のモヤモヤを整理し、次の一歩を見つけます。
              </p>

              <div className={styles.cardBody}>
                <div className={styles.freePriceBox}>
                  <Image
                    src="/plan/zero.svg"
                    alt="0円"
                    width={80}
                    height={65}
                    className={styles.freePriceIcon}
                  />
                  <p className={styles.priceText}>完全無料</p>
                </div>

                <ul className={styles.featureList}>
                  {freePlanItems.map((item) => (
                    <li key={item} className={styles.featureItem}>
                      <Image src="/plan/check.svg" alt="" width={14} height={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className={`${styles.card} ${styles.cardAccent}`}>
              <div className={styles.cardBadge}>
                一緒に
                <br />
                実行まで伴走
              </div>
              <h3 className={styles.cardTitle}>
                <span>実行支援</span>プラン
              </h3>
              <p className={styles.cardLead}>
                課題解決に向けて、実行までをサポート
              </p>

              <div className={styles.cardBody}>
                <div className={styles.supportPriceBox}>
                  <Image
                    src="/plan/calculator.svg"
                    alt=""
                    width={50}
                    height={50}
                    className={styles.calculator}
                  />
                  <p className={styles.estimateText}>個別で見積もり</p>
                </div>

                <ul className={styles.featureList}>
                  {supportPlanItems.map((item) => (
                    <li key={item} className={styles.featureItem}>
                      <Image src="/plan/check.svg" alt="" width={14} height={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          <p className={styles.footerText}>
            ご状況・ご希望に合わせて、
            <br />
            最適なサポート内容・ご料金を一緒に考えます。
          </p>
        </div>
      </div>
    </section>
  )
}
