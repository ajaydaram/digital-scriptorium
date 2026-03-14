"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, LogOut, Book, Zap, LayoutDashboard, Menu } from "lucide-react";
import { useAuth, useUser } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Welcome to The Scriptorium",
        description: "Your scholarly profile is active.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign In Error",
        description: error.message || "Failed to sign in.",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "Session closed.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign Out Error",
        description: "Failed to sign out.",
      });
    }
  };

  const navLinks = [
    { href: "/paths", label: "Reading Paths" },
    { href: "/pedagogy", label: "Pedagogy" },
    { href: "/hub", label: "Study Hub" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <BookOpen className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
            <span className="font-headline font-bold text-xl tracking-tight">The Scriptorium</span>
          </Link>

          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/api-reader">
              <Button variant="ghost" size="sm" className="gap-2 font-semibold">
                <Zap className="h-4 w-4" /> Simple
              </Button>
            </Link>
            <Link href="/reader">
              <Button variant="default" size="sm" className="gap-2 font-bold px-5">
                <Book className="h-4 w-4" /> Enhanced Reader
              </Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-6 mt-10">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg font-bold">
                      {link.label}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-3 pt-6 border-t">
                    <Link href="/api-reader" className="w-full">
                      <Button variant="outline" className="w-full justify-start gap-3">
                        <Zap className="h-4 w-4" /> Simple Reader
                      </Button>
                    </Link>
                    <Link href="/reader" className="w-full">
                      <Button variant="default" className="w-full justify-start gap-3">
                        <Book className="h-4 w-4" /> Enhanced Reader
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {!isUserLoading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-1 ring-border">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                        <AvatarFallback className="text-[10px] font-bold">
                          {user.displayName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold">{user.displayName}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                       <Link href="/reader" className="w-full">
                         <LayoutDashboard className="mr-2 h-4 w-4" />
                         <span>Scholar Dashboard</span>
                       </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={handleSignIn} 
                  variant="outline" 
                  size="sm"
                  className="font-bold px-5"
                >
                  Sign In
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}