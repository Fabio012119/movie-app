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
    <header className="border-b bg-black">
      <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
        <nav className="flex items-center gap-4">
          <Link href="/movies" className="font-bold">
            MovieApp
          </Link>
          <Link href="/movies" className="hover:underline">
            Browse
          </Link>
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <span>
            Signed in as <strong>{username}</strong>
          </span>
          <Link
            href="/logout"
            className="rounded-md border px-3 py-1 text-white hover:bg-neutral-50 hover:text-black"
          >
            Log out
          </Link>
        </div>
      </div>
    </header>
  );
}
