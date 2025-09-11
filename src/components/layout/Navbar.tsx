"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut, BookOpen } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const publicLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/instructors", label: "Instructors" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  const authenticatedLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/my-learning", label: "My Learning" },
    { href: "/instructors", label: "Instructors" },
    { href: "/about-us", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  const links = user ? authenticatedLinks : publicLinks;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 sticky top-0 z-50 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl text-white drop-shadow-sm">
            Dream Coaching
          </span>
        </div>
        
        <nav className="flex-1 flex justify-center gap-1 text-base">
          {links.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden group",
                  isActive
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30"
                    : "text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md hover:backdrop-blur-sm"
                )}
              >
                <span className="relative z-10">{link.label}</span>
                {!isActive && (
                  <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full p-0 hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Avatar className="h-10 w-10 border-2 border-white/30 shadow-lg">
                  <AvatarImage 
                    src={user.profile_image || ""} 
                    alt={user.full_name || "User"} 
                  />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    {user.full_name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 mt-2 bg-white/95 backdrop-blur-md border border-white/20 shadow-xl rounded-xl" 
              align="end"
            >
              <div className="px-3 py-2 border-b border-gray-200/50">
                <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                <p className="text-xs text-gray-500">{user.phone_number}</p>
              </div>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-blue-50 transition-colors duration-200 rounded-lg mx-1 my-1"
                onClick={() => router.push("/dashboard")}
              >
                <User className="mr-2 h-4 w-4 text-blue-600" />
                <span className="text-gray-700">Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-green-50 transition-colors duration-200 rounded-lg mx-1 my-1"
                onClick={() => router.push("/my-learning")}
              >
                <BookOpen className="mr-2 h-4 w-4 text-green-600" />
                <span className="text-gray-700">My Learning</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 bg-gray-200/50" />
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-red-50 transition-colors duration-200 rounded-lg mx-1 my-1"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4 text-red-600" />
                <span className="text-gray-700">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            className="cursor-pointer border-2 border-white/30 rounded-full px-6 bg-white/10 text-white hover:bg-white hover:text-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg backdrop-blur-sm font-medium"
            asChild
          >
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
