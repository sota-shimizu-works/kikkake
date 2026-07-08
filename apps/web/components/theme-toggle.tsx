"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, MonitorSmartphoneIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ICON_SIZE = "size-5";

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentThemeLabel = mounted
    ? resolvedTheme ?? "system"
    : "system";

  const Icon = useMemo(() => {
    if (mounted && resolvedTheme === "dark") return MoonIcon;
    if (mounted && resolvedTheme === "light") return SunIcon;
    return MonitorSmartphoneIcon;
  }, [mounted, resolvedTheme]);

  const handleToggle = () => {
    const nextTheme =
      resolvedTheme === "dark" || (!mounted && theme === "dark")
        ? "light"
        : "dark";
    setTheme(nextTheme);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpen(true);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="テーマを切り替え"
          onPointerDown={(event) => {
            if (event.button === 0) {
              event.preventDefault();
              handleToggle();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleToggle();
            }
          }}
          onContextMenu={handleContextMenu}
        >
          <Icon className={ICON_SIZE} />
          <span className="sr-only">
            現在のテーマ: {currentThemeLabel}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuItem onSelect={() => setTheme("light")}>
          <SunIcon className={ICON_SIZE} />
          ライトテーマ
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("dark")}>
          <MoonIcon className={ICON_SIZE} />
          ダークテーマ
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("system")}>
          <MonitorSmartphoneIcon className={ICON_SIZE} />
          システムのテーマ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
