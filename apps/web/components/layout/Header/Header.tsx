"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Menu, Sprout, X } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Header.module.scss";

const navItems = [
  { href: "#service", label: "サービスの紹介" },
  { href: "#support-area", label: "支援領域" },
  { href: "#support-flow", label: "支援の流れ" },
  { href: "#plan", label: "料金体制" },
  { href: "#achievements", label: "実績・支援事例" },
  { href: "#about", label: "株式会社きっかけについて" },
  { href: "#recruit", label: "採用情報" },
  { href: "#questions", label: "よくある質問" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);

    if (element) {
      const headerOffset = window.innerWidth >= 1024 ? 96 : 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(styles.root, {
          [styles.scrolled]: isScrolled,
        })}
      >
        <div className={styles.inner}>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={styles.brand}
            aria-label="株式会社きっかけのトップへ戻る"
          >
            <span className={styles.brandMark} aria-hidden="true">
              <Sprout size={26} strokeWidth={2.2} />
            </span>
            <span className={styles.brandText}>株式会社きっかけ</span>
          </Link>

          <nav className={styles.desktopNav} aria-label="グローバルナビゲーション">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={styles.desktopNavLink}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className={styles.contactButton}
          >
            <span className={styles.contactLabel}>お問い合わせ</span>
            <span className={styles.contactIcon} aria-hidden="true">
              <Mail size={18} strokeWidth={2.2} />
            </span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={styles.menuButton}
            aria-label="メニューを開く"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobilePanel}>
            <div className={styles.mobileHeader}>
              <div className={styles.brand}>
                <span className={styles.brandMark} aria-hidden="true">
                  <Sprout size={24} strokeWidth={2.2} />
                </span>
                <span className={styles.brandText}>株式会社きっかけ</span>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className={styles.closeButton}
                aria-label="メニューを閉じる"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className={styles.mobileNav} aria-label="モバイルナビゲーション">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={styles.mobileNavLink}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className={styles.mobileContactButton}
            >
              <span>お問い合わせ</span>
              <Mail size={18} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
