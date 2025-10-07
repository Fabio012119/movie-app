"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const m = document.cookie.match(/(?:^|; )auth_user=([^;]+)/);
    setUsername(m ? decodeURIComponent(m[1]) : null);
  }, []);

  if (pathname === "/login") return null;

  return (
    <header className="border-b bg-black" data-testid="app-menu">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <nav className="flex items-center gap-4">
          <Link href="/movies" className="font-bold" data-testid="app-title">
            🎬 MOVIE APP
          </Link>
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <span data-testid="signed-in-username">
            Signed in as <strong className="underline">{username}</strong>
          </span>
          <Link
            href="/logout"
            data-testid="log-out-btn"
            className="rounded-md border px-3 py-1 text-white hover:bg-neutral-50 hover:text-black"
          >
            Log out
          </Link>
        </div>
      </div>
    </header>
  );
}
