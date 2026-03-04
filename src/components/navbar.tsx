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
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-brand-gradient p-1.5 rounded-lg shadow-sm group-hover:scale-105 transition-transform">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-headline font-bold">The Scriptorium</span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/demo" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5 text-slate-600">
            <PlayCircle className="h-4 w-4" /> Demo
          </Link>
          <Link href="/paths" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5 text-slate-600">
            <Compass className="h-4 w-4" /> Reading Paths
          </Link>
          <Link href="/pedagogy" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5 text-slate-600">
            <BookCheck className="h-4 w-4" /> Pedagogy
          </Link>
          <Link href="/hub" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5 text-slate-600">
            <GraduationCap className="h-4 w-4" /> Study Hub
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/api-reader">
              <Button variant="ghost" className="font-bold px-4 text-slate-500 hover:text-primary flex items-center gap-2">
                <Zap className="h-4 w-4" /> Simple Reader
              </Button>
            </Link>
            <Link href="/reader">
              <Button variant="default" className="btn-gradient font-bold px-6 shadow-md shadow-blue-500/10 flex items-center gap-2 rounded-xl">
                <Book className="h-4 w-4" /> Enhanced Reader
              </Button>
            </Link>
          </div>
          
          {/* Mobile Reader Switcher */}
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl border-slate-200">
                  <Book className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/api-reader" className="cursor-pointer font-bold">Simple Reader</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/reader" className="cursor-pointer font-bold">Enhanced Reader</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {!isUserLoading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                       <Link href="/reader" className="cursor-pointer">
                         <BookOpen className="mr-2 h-4 w-4" />
                         <span>Guided Reader</span>
                       </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={handleSignIn} 
                  variant="outline" 
                  className="font-bold border-slate-200"
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
