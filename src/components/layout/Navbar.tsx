"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/instructors", label: "Instructors" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];
  return (
    <header className="w-full bg-primary sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between py-3 px-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl text-primary-foreground">
            Dream Coaching
          </span>
        </div>
        <nav className="flex-1 flex justify-center gap-2 text-base font-xs">
          {links.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-.5 rounded-full transition-colors duration-200",
                  isActive
                    ? "bg-primary-foreground text-primary"
                    : "text-primary-foreground/90 hover:bg-secondary hover:text-secondary-foreground hover:shadow-md hover:shadow-secondary/40"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Button
          variant="outline"
          className="cursor-pointer border-none rounded-full px-8 bg-primary-foreground text-primary hover:bg-secondary hover:text-secondary-foreground hover:shadow-md hover:shadow-secondary/40"
        >
          Login
        </Button>
      </div>
    </header>
  );
}
