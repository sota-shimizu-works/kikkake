import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import HeaderAvatar from "./header-avatar";

export default async function AppHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const allowSignUp = process.env.ALLOW_USER_SIGNUP === "true";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 transition-colors duration-200 hover:text-gray-700"
          >
            System tmp
          </Link>
        </div>

        {user ? (
          <div className="flex items-center">
            <HeaderAvatar />
          </div>
        ) : (
          <nav className="flex items-center space-x-3">
            {allowSignUp && (
              <Link href="/auth/sign-up">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
                >
                  新規登録
                </Button>
              </Link>
            )}
            <Link href="/auth/login">
              <Button className="bg-gray-900 text-white shadow-sm transition-all duration-200 hover:bg-gray-800">
                ログイン
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
