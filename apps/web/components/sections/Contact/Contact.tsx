"use client"

import { useState } from "react"
import SectionHead from "@/components/ui/SectionHead"
import RightArrowButton from "@/components/ui/RightArrowButton"
import styles from "./Contact.module.scss"

const employeeOptions = [
  { value: "", label: "選択してください" },
  { value: "1〜10名", label: "1〜10名" },
  { value: "11〜50名", label: "11〜50名" },
  { value: "51〜100名", label: "51〜100名" },
  { value: "101名以上", label: "101名以上" },
]

const insuranceOptions = [
  { value: "", label: "選択してください" },
  { value: "yes", label: "加入している" },
  { value: "no", label: "加入していない" },
  { value: "unknown", label: "よくわからない" },
]

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitError, setSubmitError] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)
    setSubmitMessage("")
    setSubmitError(false)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: String(formData.get("companyName") ?? ""),
          contactName: String(formData.get("contactName") ?? ""),
          email: String(formData.get("email") ?? ""),
          employeeCount: String(formData.get("employeeCount") ?? ""),
          employmentInsurance: String(formData.get("employmentInsurance") ?? ""),
        }),
      })

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null

      if (!response.ok) {
        throw new Error(result?.error ?? "送信に失敗しました。")
      }

      form.reset()
      setSubmitError(false)
      setSubmitMessage("お問い合わせを送信しました。ご連絡ありがとうございます。")
    } catch (error) {
      setSubmitError(true)
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "送信中にエラーが発生しました。",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

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

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.labelGroup}>
                <label htmlFor="companyName" className={styles.label}>
                  会社名
                </label>
                <span className={styles.required}>必須</span>
              </div>
              <input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="株式会社きっかけ"
                className={styles.field}
                required
              />
            </div>

            <div className={styles.row}>
              <div className={styles.labelGroup}>
                <label htmlFor="contactName" className={styles.label}>
                  ご担当者様名
                </label>
                <span className={styles.required}>必須</span>
              </div>
              <input
                id="contactName"
                name="contactName"
                type="text"
                placeholder="山田太郎"
                className={styles.field}
                required
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
                required
              />
            </div>

            <div className={styles.row}>
              <div className={styles.labelGroup}>
                <label htmlFor="employeeCount" className={styles.label}>
                  従業員数
                </label>
                <span className={styles.required}>必須</span>
              </div>
              <div className={styles.selectWrap}>
                <select
                  id="employeeCount"
                  name="employeeCount"
                  className={styles.field}
                  defaultValue=""
                  required
                >
                  {employeeOptions.map((option) => (
                    <option key={option.value || option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.labelGroup}>
                <label htmlFor="employmentInsurance" className={styles.label}>
                  雇用保険の加入
                </label>
                <span className={styles.required}>必須</span>
              </div>
              <div className={styles.selectWrap}>
                <select
                  id="employmentInsurance"
                  name="employmentInsurance"
                  className={styles.field}
                  defaultValue=""
                  required
                >
                  {insuranceOptions.map((option) => (
                    <option key={option.value || option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {submitMessage ? (
              <p
                className={submitError ? styles.messageError : styles.messageSuccess}
                role="status"
              >
                {submitMessage}
              </p>
            ) : null}

            <RightArrowButton
              kind="submit"
              text={isSubmitting ? "送信中..." : "送信する"}
              className={styles.submit}
              disabled={isSubmitting}
            />
          </form>
        </div>
      </div>
    </section>
  )
}
