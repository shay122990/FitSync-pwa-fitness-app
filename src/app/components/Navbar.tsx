"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Dumbbell, BarChart2, Home, User } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", icon: <Home size={20} /> },
  { name: "Workouts", href: "/workouts", icon: <Dumbbell size={20} /> },
  { name: "Progress", href: "/progress", icon: <BarChart2 size={20} /> },
  { name: "Profile", href: "/profile", icon: <User size={20} /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
      <div
        className="md:hidden bg-gray-900 text-white p-3 rounded-r-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      <ul
        className={`
          flex flex-col gap-4 bg-gray-900 text-white p-4 rounded-r-xl transition-all duration-300
          ${isOpen ? "block" : "hidden"} md:flex
        `}
      >
        {navLinks.map(({ name, href, icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex items-center gap-2 text-sm md:text-base hover:text-lime-400"
              onClick={() => setIsOpen(false)}
            >
              {icon}
              <span className="hidden md:inline">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
