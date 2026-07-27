"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.scss";

const footerLinks = [
  { href: "#service", label: "サービスの紹介" },
  { href: "#support-area", label: "支援領域" },
  { href: "#support-flow", label: "支援の流れ" },
  { href: "#plan", label: "料金体制" },
  { href: "#achievements", label: "実績・支援事例" },
  { href: "#about", label: "株式会社きっかけについて" },
  { href: "#recruit", label: "採用情報" },
  { href: "#questions", label: "よくある質問" },
  { href: "#contact", label: "お問い合わせ" },
];

const contactCards = [
  {
    href: "#contact",
    icon: "/footer/contact_icon.svg",
    badge: "24時間受付フォーム",
    title: "24時間受付中",
  },
  {
    href: "tel:08001230877",
    icon: "/footer/tel_icon.svg",
    badge: "お電話でのお問い合わせ",
    title: "TEL : 08001230877",
  },
  {
    href: "#contact",
    icon: "/footer/chat_icon.svg",
    badge: "お気軽にご相談ください",
    title: "どんなご相談でもOK",
  },
];

export default function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.brandBlock}>
          <Image
            src="/footer/footer_logo.svg"
            alt="株式会社きっかけ"
            width={130}
            height={57}
            className={styles.logo}
          />
          <p className={styles.catch}>あなたの「きっかけ」を一緒に見つけます。</p>
          <div className={styles.address}>
            <p className={styles.addressLabel}>拠点</p>
            <p>〒162-0814 東京都新宿区新小川町2-11 双葉ビル 2F</p>
          </div>
        </div>

        <div className={styles.cards}>
          {contactCards.map((card) => (
            <Link key={card.title} href={card.href} className={styles.card}>
              <span className={styles.cardIcon}>
                <Image src={card.icon} alt="" width={44} height={44} />
              </span>
              <span className={styles.cardBody}>
                <span className={styles.cardBadge}>{card.badge}</span>
                <span className={styles.cardTitle}>{card.title}</span>
              </span>
            </Link>
          ))}
        </div>

        <nav className={styles.nav} aria-label="フッターナビゲーション">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <p className={styles.copy}>
          © {new Date().getFullYear()} 株式会社きっかけ. All rights reserved.
        </p>

        <Link href="#" className={styles.pageTop} aria-label="ページトップへ戻る">
          <span className={styles.pageTopLine} />
          <span className={styles.pageTopText}>PAGE TOP</span>
        </Link>
      </div>
    </footer>
  );
}
