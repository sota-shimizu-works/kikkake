"use client"

import SectionHead from "@/components/ui/SectionHead"
import RightArrowButton from "@/components/ui/RightArrowButton"
import styles from "./Contact.module.scss"

const employeeOptions = [
  "選択してください",
  "1〜10名",
  "11〜50名",
  "51〜100名",
  "101名以上",
]

const insuranceOptions = [
  "選択してください",
  "加入している",
  "加入していない",
  "よくわからない",
]

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className="page-width">
        <div className={styles.inner}>
          <SectionHead
            en="CONTACT"
            ja="お問い合わせ"
            align="center"
            showDot={false}
          />

          <div className={styles.lead}>
            <p className={styles.leadMain}>
              どんなことでも、お気軽にお問い合わせください。
            </p>
            <p className={styles.leadSub}>
              「何を相談したらいいか、まだまとまっていない…」
              <br />
              そんな段階でも大丈夫です。
              <br />
              あなたの<span>きっかけ</span>を一緒に見つけます。
            </p>
          </div>

          <form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.labelGroup}>
                <label htmlFor="company" className={styles.label}>
                  会社名
                </label>
                <span className={styles.required}>必須</span>
              </div>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="株式会社きっかけ"
                className={styles.field}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.labelGroup}>
                <label htmlFor="name" className={styles.label}>
                  ご担当者様名
                </label>
                <span className={styles.required}>必須</span>
              </div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="山田太郎"
                className={styles.field}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.labelGroup}>
                <label htmlFor="email" className={styles.label}>
                  メールアドレス
                </label>
                <span className={styles.required}>必須</span>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="info@example.com"
                className={styles.field}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.labelGroup}>
                <label htmlFor="employees" className={styles.label}>
                  従業員数
                </label>
                <span className={styles.required}>必須</span>
              </div>
              <div className={styles.selectWrap}>
                <select id="employees" name="employees" className={styles.field}>
                  {employeeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.labelGroup}>
                <label htmlFor="insurance" className={styles.label}>
                  雇用保険の加入
                </label>
                <span className={styles.required}>必須</span>
              </div>
              <div className={styles.selectWrap}>
                <select id="insurance" name="insurance" className={styles.field}>
                  {insuranceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <RightArrowButton
              kind="submit"
              text="送信する"
              className={styles.submit}
            />
          </form>
        </div>
      </div>
    </section>
  )
}
