
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Compass, GraduationCap, PlayCircle, LogOut, BookCheck, Book, Zap, LayoutDashboard } from "lucide-react";
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

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-brand-gradient p-2 rounded-lg shadow-md group-hover:scale-105 transition-all duration-300">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-headline font-bold tracking-tight text-slate-900">The Scriptorium</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            <Link href="/paths">
              <Button variant="ghost" className="text-sm font-semibold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all">
                Reading Paths
              </Button>
            </Link>
            <Link href="/pedagogy">
              <Button variant="ghost" className="text-sm font-semibold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all">
                Pedagogy
              </Button>
            </Link>
            <Link href="/hub">
              <Button variant="ghost" className="text-sm font-semibold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all">
                Study Hub
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/api-reader">
              <Button variant="ghost" className="text-sm font-semibold text-slate-500 h-9 px-4 gap-2">
                <Zap className="h-4 w-4" /> Simple
              </Button>
            </Link>
            <Link href="/reader">
              <Button variant="default" className="btn-gradient text-sm font-bold h-9 px-5 gap-2 rounded-full shadow-md">
                <Book className="h-4 w-4" /> Enhanced Reader
              </Button>
            </Link>
          </div>
          
          {!isUserLoading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs uppercase">
                          {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-2 mt-2" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal px-2 py-3">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none text-slate-900">{user.displayName}</p>
                        <p className="text-xs leading-none text-slate-500 truncate">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer py-3 rounded-md focus:bg-primary/5 focus:text-primary">
                       <Link href="/reader" className="flex items-center">
                         <LayoutDashboard className="mr-3 h-4 w-4" />
                         <span className="text-sm font-semibold">Scholar Dashboard</span>
                       </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer py-3 rounded-md focus:bg-red-50 focus:text-red-700">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="text-sm font-semibold">Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={handleSignIn} 
                  variant="outline" 
                  className="text-sm font-bold border-slate-200 h-9 px-5 rounded-full hover:bg-slate-50"
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
