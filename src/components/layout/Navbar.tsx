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
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { User, LogOut, BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavLink {
  href: string;
  label: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
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
    ...(user?.role !== 'admin' && user?.user_type !== 'admin' ? [{ href: "/my-learning", label: "My Learning" }] : []),
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
    <header className="w-full bg-gradient-to-r from-primary via-primary/95 to-secondary sticky top-0 z-50 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg sm:text-xl text-white drop-shadow-sm">
            Dream Coaching
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center gap-1 text-base">
          {links.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 xl:px-4 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 relative overflow-hidden group text-sm xl:text-base",
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

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 p-2"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-lg text-foreground">
                    Dream Coaching
                  </span>
                </div>
                {links.map((link) => {
                  const isActive =
                    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-lg transition-all duration-200 text-left",
                        isActive
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                {user ? (
                  <div className="pt-4 border-t space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        router.push("/dashboard");
                        setIsOpen(false);
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    {user.role !== 'admin' && user.user_type !== 'admin' && (
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          router.push("/my-learning");
                          setIsOpen(false);
                        }}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        My Learning
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="pt-4 border-t">
                    <Button asChild className="w-full">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop User Menu */}
        <div className="hidden lg:block">
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
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-semibold">
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
                  <p className="text-sm font-medium text-gray-900 truncate">{user.full_name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.phone_number}</p>
                </div>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-primary/10 transition-colors duration-200 rounded-lg mx-1 my-1"
                  onClick={() => router.push("/dashboard")}
                >
                  <User className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-gray-700">Dashboard</span>
                </DropdownMenuItem>
                {user.role !== 'admin' && user.user_type !== 'admin' && (
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-secondary/10 transition-colors duration-200 rounded-lg mx-1 my-1"
                    onClick={() => router.push("/my-learning")}
                  >
                    <BookOpen className="mr-2 h-4 w-4 text-secondary" />
                    <span className="text-gray-700">My Learning</span>
                  </DropdownMenuItem>
                )}
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
              className="cursor-pointer border-2 border-white/30 rounded-full px-4 xl:px-6 bg-white/10 text-white hover:bg-white hover:text-primary transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg backdrop-blur-sm font-medium text-sm xl:text-base"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
