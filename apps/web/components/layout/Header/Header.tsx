"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isMobileMenuClosing, setIsMobileMenuClosing] = useState(false);

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

    closeMobileMenu();
  };

  const openMobileMenu = () => {
    setIsMobileMenuVisible(true);
    setIsMobileMenuClosing(false);
    requestAnimationFrame(() => {
      setIsMobileMenuOpen(true);
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuClosing(true);
    setIsMobileMenuOpen(false);
    window.setTimeout(() => {
      setIsMobileMenuVisible(false);
      setIsMobileMenuClosing(false);
    }, 320);
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
              <Image
                src="/mainvisual/logo.svg"
                alt=""
                width={180}
                height={40}
                className={styles.brandLogo}
              />
            </span>
          </Link>

          <nav
            className={styles.desktopNav}
            aria-label="グローバルナビゲーション"
          >
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
              <Image
                src="/mainvisual/mail_icon.svg"
                alt=""
                width={20}
                height={20}
                className={styles.contactIconImage}
              />
            </span>
          </Link>

          <button
            onClick={openMobileMenu}
            className={styles.menuButton}
            aria-label="メニューを開く"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {isMobileMenuVisible && (
        <div
          className={`${styles.mobileOverlay} ${
            isMobileMenuClosing ? styles.mobileOverlayClosing : ""
          }`}
        >
          <div
            className={`${styles.mobilePanel} ${
              isMobileMenuClosing ? styles.mobilePanelClosing : ""
            }`}
          >
            <div className={styles.mobileHeader}>
              <div className={styles.brand}>
                <span className={styles.brandMark} aria-hidden="true">
                  <Image
                    src="/mainvisual/logo.svg"
                    alt=""
                    width={28}
                    height={28}
                    className={styles.brandLogo}
                  />
                </span>
              </div>

              <button
                onClick={closeMobileMenu}
                className={styles.closeButton}
                aria-label="メニューを閉じる"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav
              className={styles.mobileNav}
              aria-label="モバイルナビゲーション"
            >
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
              <span className={styles.mobileContactIcon} aria-hidden="true">
                <Image
                  src="/mainvisual/mail_icon.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={styles.contactIconImage}
                />
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
