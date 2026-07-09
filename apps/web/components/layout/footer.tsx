"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Dribbble } from "lucide-react";

const socialLinks = [
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Github, label: "GitHub" },
  { href: "#", icon: Dribbble, label: "Dribbble" },
];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#works", label: "Works" },
  { href: "#insights", label: "Insights" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Biz パートナー
            </Link>
            <p className="mt-4 text-muted-foreground text-sm max-w-xs leading-relaxed">
              助成金活用に強いパートナーとして、企業に最適な制度選びと
              申請サポートをオンラインで丁寧にご案内します。
            </p>
            <p className="mt-3 text-muted-foreground text-xs leading-relaxed max-w-sm">
              拠点：東京都新宿区（※全国オンライン対応）
              <br />
              事業内容：複数社提携による助成金活用コンサルティング・最適化サポート
            </p>
            <div className="mt-4">
              <Link
                href="mailto:info@bizpartner-inc.com"
                className="text-sm transition-colors hover:underline"
                style={{ color: "#203eec" }}
              >
                info@bizpartner-inc.com
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bizパートナー. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
