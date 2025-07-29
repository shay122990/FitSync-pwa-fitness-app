"use client";

import Link from "next/link";
import { Home, Dumbbell, BarChart2, User, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/workouts", icon: Dumbbell, label: "Workouts" },
  { href: "/workouts/explore", icon: Search, label: "Explore" },
  { href: "/progress", icon: BarChart2, label: "Progress" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white border-b border-gray-800">
      <ul className="flex justify-around items-center py-3">
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
                  {/* Optional: Uncomment to show labels below icons */}
                  {/* <span className="text-[10px]">{label}</span> */}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
