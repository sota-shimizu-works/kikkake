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

const CLOSE_DURATION = 300;

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
      requestAnimationFrame(() => {
        setIsMobileMenuOpen(true);
      });
    });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuClosing(true);
    setIsMobileMenuOpen(false);
    window.setTimeout(() => {
      setIsMobileMenuVisible(false);
      setIsMobileMenuClosing(false);
    }, CLOSE_DURATION);
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuVisible && !isMobileMenuClosing) {
      closeMobileMenu();
      return;
    }

    openMobileMenu();
  };

  const isMenuActive = isMobileMenuVisible && !isMobileMenuClosing;

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
            type="button"
            onClick={toggleMobileMenu}
            className={cn(styles.menuButton, {
              [styles.menuButtonActive]: isMenuActive,
            })}
            aria-label={isMenuActive ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isMenuActive}
          >
            <span className={styles.menuIconWrap}>
              <Menu
                className={cn(styles.menuIcon, styles.menuBars, {
                  [styles.menuBarsHidden]: isMenuActive,
                })}
              />
              <X
                className={cn(styles.menuIcon, styles.menuClose, {
                  [styles.menuCloseVisible]: isMenuActive,
                })}
              />
            </span>
          </button>
        </div>
      </header>

      {isMobileMenuVisible && (
        <div
          className={cn(styles.mobileOverlay, {
            [styles.mobileOverlayClosing]: isMobileMenuClosing,
          })}
        >
          <div
            className={cn(styles.mobilePanel, {
              [styles.mobilePanelClosing]: isMobileMenuClosing,
              [styles.mobilePanelOpen]: isMobileMenuOpen,
            })}
          >
            <nav className={styles.mobileNav} aria-label="モバイルナビゲーション">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={styles.mobileNavLink}
                  style={{
                    transitionDelay:
                      isMobileMenuOpen && !isMobileMenuClosing
                        ? `${90 + index * 38}ms`
                        : "0ms",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link href="tel:08001230877" className={styles.mobileContactButton}>
              <span className={styles.mobileContactBadge}>
                お電話でのお問い合わせ
              </span>
              <span className={styles.mobileContactTel}>TEL : 08001230877</span>
            </Link>
          </div>
        </div>
      )}

      {isMenuActive && (
        <button
          type="button"
          onClick={closeMobileMenu}
          className={styles.floatingMenuButton}
          aria-label="メニューを閉じる"
        >
          <span className={styles.menuIconWrap}>
            <X
              className={cn(
                styles.menuIcon,
                styles.menuClose,
                styles.menuCloseVisible,
              )}
            />
          </span>
        </button>
      )}
    </>
  );
}
