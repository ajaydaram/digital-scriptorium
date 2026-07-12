"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, LogOut, Book, Menu } from "lucide-react";
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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const pathname = usePathname();

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
    { href: "/demo", label: "Demo" },
    { href: "/paths", label: "Reading Paths" },
    { href: "/hub", label: "Study Hub" },
    { href: "/pedagogy", label: "Pedagogy" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <BookOpen className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-2xl tracking-tight text-slate-900 leading-none">The Scriptorium</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Pedagogical Bible Engagement</span>
            </div>
          </Link>

          <div className="hidden lg:flex gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-bold transition-colors uppercase tracking-widest",
                  pathname === link.href ? "text-blue-600 border border-blue-600 px-3 py-1 rounded-md" : "text-slate-500 hover:text-slate-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-3">
            <Link href="/reader">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 font-bold px-6 h-11 rounded-lg">
                <Book className="h-4 w-4" /> Bible Reader
              </Button>
            </Link>
            
            {!isUserLoading && !user && (
              <>
                <Button 
                  onClick={handleSignIn} 
                  variant="outline" 
                  className="font-bold px-6 h-11 border-slate-900 rounded-lg text-slate-900"
                >
                  Sign In
                </Button>
                <Link href="/paths">
                  <Button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-bold px-6 h-11 rounded-lg">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
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
                    <Link href="/reader" className="w-full">
                      <Button className="bg-blue-600 w-full justify-start gap-3 h-12">
                        <Book className="h-4 w-4 text-white" /> <span className="text-white">Bible Reader</span>
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {!isUserLoading && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-11 w-11 rounded-full border border-slate-200 overflow-hidden">
                  <Avatar className="h-full w-full">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                    <AvatarFallback className="text-xs font-bold">
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
                   <Link href="/reader" className="w-full cursor-pointer">
                     <span>Scholar Dashboard</span>
                   </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
