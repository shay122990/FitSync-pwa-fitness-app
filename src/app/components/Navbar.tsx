// components/Navbar.tsx
"use client";

import Link from "next/link";
import { Home, Dumbbell, BarChart2, User, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const navLinks = [
  { href: "/", icon: Home },
  { href: "/workouts", icon: Dumbbell },
  { href: "/explore", icon: Search },
  { href: "/progress", icon: BarChart2 },
  { href: "/profile", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white border-b border-gray-800">
      <ul className="flex justify-around items-center py-3 px-4">
        {navLinks.map(({ href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link href={href}>
                <div
                  className={`flex flex-col items-center gap-1 text-xs transition-colors duration-200 ${
                    isActive
                      ? "text-lime-400"
                      : "text-gray-300 hover:text-lime-400"
                  }`}
                >
                  <Icon size={24} />
                </div>
              </Link>
            </li>
          );
        })}
        <li className="ml-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm text-gray-300 hover:text-lime-400">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </li>
      </ul>
    </nav>
  );
}
