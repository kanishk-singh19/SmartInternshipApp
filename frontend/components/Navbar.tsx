"use client";

import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Briefcase,
  LayoutDashboard,
  History,
  LogOut,
} from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span>InternPlanner</span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/internship">Internships</Link>
            </Button>

            {user?.role === "student" && (
              <>
                <Button asChild variant="ghost">
                  <Link href="/Dashboard">Dashboard</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/history">History</Link>
                </Button>
              </>
            )}

            {user?.role === "recruiter" && (
              <Button asChild variant="ghost">
                <Link href="/Dashboard">Recruiter Dashboard</Link>
              </Button>
            )}
          </div>

          {/* Right Side */}
          {!user ? (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="rounded-full" variant="ghost">
                  <Avatar>
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
