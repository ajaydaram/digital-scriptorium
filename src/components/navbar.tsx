"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Compass, GraduationCap, PlayCircle, LogOut, Info, BookCheck, Book, Zap } from "lucide-react";
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
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign In Error",
        description: error.message || "Failed to sign in with Google.",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been signed out of your account.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign Out Error",
        description: "Failed to sign out.",
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-brand-gradient p-2 rounded-xl shadow-sm group-hover:scale-105 transition-transform">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-headline font-bold tracking-tight">The Scriptorium</span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          <Link href="/demo" className="text-base font-semibold hover:text-primary transition-colors flex items-center gap-2 text-slate-600">
            <PlayCircle className="h-5 w-5" /> Demo
          </Link>
          <Link href="/paths" className="text-base font-semibold hover:text-primary transition-colors flex items-center gap-2 text-slate-600">
            <Compass className="h-5 w-5" /> Reading Paths
          </Link>
          <Link href="/pedagogy" className="text-base font-semibold hover:text-primary transition-colors flex items-center gap-2 text-slate-600">
            <BookCheck className="h-5 w-5" /> Pedagogy
          </Link>
          <Link href="/hub" className="text-base font-semibold hover:text-primary transition-colors flex items-center gap-2 text-slate-600">
            <GraduationCap className="h-5 w-5" /> Study Hub
          </Link>
        </div>

        <div className="flex items-center space-x-5">
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/api-reader">
              <Button variant="ghost" className="font-bold h-12 px-5 text-slate-500 hover:text-primary flex items-center gap-2.5 text-sm">
                <Zap className="h-5 w-5" /> Simple Reader
              </Button>
            </Link>
            <Link href="/reader">
              <Button variant="default" className="btn-gradient font-bold h-12 px-7 shadow-lg shadow-blue-500/15 flex items-center gap-2.5 rounded-xl text-sm">
                <Book className="h-5 w-5" /> Enhanced Reader
              </Button>
            </Link>
          </div>
          
          {/* Mobile Reader Switcher */}
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl border-slate-200 h-11 w-11">
                  <Book className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2">
                <DropdownMenuItem asChild>
                  <Link href="/api-reader" className="cursor-pointer font-bold py-3">Simple Reader</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/reader" className="cursor-pointer font-bold py-3">Enhanced Reader</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {!isUserLoading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-11 w-11 rounded-full">
                      <Avatar className="h-11 w-11">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal p-3">
                      <div className="flex flex-col space-y-1.5">
                        <p className="text-base font-semibold leading-none">{user.displayName}</p>
                        <p className="text-sm leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                       <Link href="/reader" className="cursor-pointer py-3 text-sm">
                         <BookOpen className="mr-3 h-5 w-5" />
                         <span>Guided Reader</span>
                       </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer py-3 text-sm">
                      <LogOut className="mr-3 h-5 w-5" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={handleSignIn} 
                  variant="outline" 
                  className="font-bold border-slate-200 h-11 px-6 text-sm"
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
