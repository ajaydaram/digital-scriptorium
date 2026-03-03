
"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  MessageSquare, 
  Sparkles, 
  User, 
  History, 
  Info,
  ChevronRight,
  Send
} from "lucide-react";
import { explainScripture, type AIAnnotatorExplanationOutput } from "@/ai/flows/ai-annotator-explanation";
import { useToast } from "@/hooks/use-toast";
import { useAnnotations } from "@/hooks/use-annotations";
import { useUser } from "@/firebase";
import { formatDistanceToNow } from "date-fns";

export default function StudyHubPage() {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AIAnnotatorExplanationOutput | null>(null);
  const [newAnnotation, setNewAnnotation] = useState("");
  const { toast } = useToast();
  const { user } = useUser();

  const passage = {
    ref: "John 3:16",
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."
  };

  const { annotations, addAnnotation, isLoading: isNotesLoading } = useAnnotations(passage.ref);

  const handleAskAI = async () => {
    setAiLoading(true);
    try {
      const result = await explainScripture({ 
        scripturePassage: `${passage.ref}: ${passage.text}` 
      });
      setAiResult(result);
      toast({
        title: "Pedagogical Insight Ready",
        description: "The AI has analyzed the theological context of this passage."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not consult the Pedagogical Guide at this time."
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleAddAnnotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Sign in Required",
        description: "You must be signed in to add annotations."
      });
      return;
    }
    if (newAnnotation.trim()) {
      addAnnotation(newAnnotation);
      setNewAnnotation("");
      toast({
        title: "Annotation Saved",
        description: "Your insight has been added to your study collection."
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto h-full px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-8">
            
            {/* Left: Simple Reader */}
            <div className="flex flex-col h-full space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" /> Simple Reader
                </h2>
                <Badge variant="outline" className="bg-white">KJV Edition</Badge>
              </div>
              
              <Card className="flex-1 shadow-xl border-none overflow-hidden flex flex-col">
                <div className="bg-brand-gradient h-1.5 w-full" />
                <CardContent className="p-12 flex-1 flex flex-col justify-center">
                  <div className="max-w-xl mx-auto space-y-8">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{passage.ref}</span>
                    <p className="text-3xl md:text-4xl font-serif leading-relaxed text-slate-800 selection:bg-primary/20">
                      "{passage.text}"
                    </p>
                    <div className="pt-8 border-t border-slate-100 flex items-center gap-4">
                      <Button 
                        onClick={handleAskAI} 
                        disabled={aiLoading}
                        className="btn-gradient rounded-full px-8 gap-2 font-bold shadow-lg shadow-primary/20"
                      >
                        <Sparkles className="h-4 w-4" /> 
                        {aiLoading ? "Consulting..." : "Ask AI"}
                      </Button>
                      <Button variant="outline" className="rounded-full px-8 gap-2 border-slate-200">
                        <MessageSquare className="h-4 w-4" /> Annotate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Annotation Feed */}
            <div className="flex flex-col h-full space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-accent" /> My Study Notes
                </h2>
                <Badge variant="secondary">{annotations?.length || 0} Insights</Badge>
              </div>

              <Card className="flex-1 shadow-xl border-none flex flex-col overflow-hidden">
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-6">
                    
                    {/* Mock Scholar Comment (Always Visible as a Guide) */}
                    <div className="flex gap-4 opacity-60">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarFallback className="bg-slate-200 text-slate-600 font-bold text-xs">JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">JD (Scholastic Lead)</span>
                          <span className="text-[10px] text-slate-400 font-medium">Ref: John 3:16</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                          <p className="text-sm text-slate-700 leading-relaxed italic">
                            The Greek word here is <strong className="text-primary">agape</strong>. It represents covenantal commitment rather than simple emotion.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* AI Result Inserted into Feed */}
                    {aiResult && (
                      <div className="flex gap-4 animate-in zoom-in-95 duration-700">
                        <div className="h-10 w-10 rounded-full bg-brand-gradient flex items-center justify-center shadow-lg shrink-0">
                          <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-primary uppercase tracking-wider">AI Pedagogical Guide</span>
                            <Badge variant="outline" className="text-[9px] h-4">SCHOLARLY INSIGHT</Badge>
                          </div>
                          <div className="bg-primary/5 p-5 rounded-2xl rounded-tl-none border border-primary/10 space-y-4">
                            <div>
                              <h4 className="text-[10px] font-bold text-primary mb-1 uppercase tracking-widest flex items-center gap-1.5">
                                <BookOpen className="h-3 w-3" /> Exegesis
                              </h4>
                              <p className="text-sm text-slate-700 leading-relaxed">
                                {aiResult.explanation}
                              </p>
                            </div>
                            
                            <Separator className="bg-primary/10" />
                            
                            <div className="bg-white/50 p-3 rounded-lg">
                              <h4 className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-widest flex items-center gap-1.5">
                                <History className="h-3 w-3" /> Grand Historical Narrative
                              </h4>
                              <p className="text-sm text-slate-600 italic">
                                {aiResult.theologicalContext}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Real User Annotations */}
                    {annotations?.map((note) => (
                      <div key={note.id} className="flex gap-4 animate-in slide-in-from-right-4 duration-500">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm shrink-0">
                          <AvatarImage src={user?.photoURL || ""} />
                          <AvatarFallback className="bg-accent/10 text-accent font-bold text-xs">
                            {user?.displayName?.[0] || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-slate-900">{user?.displayName || 'My Note'}</span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {note.createdAt ? formatDistanceToNow(new Date(note.createdAt.seconds * 1000), { addSuffix: true }) : 'just now'}
                            </span>
                          </div>
                          <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm group relative">
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {note.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {!aiResult && !aiLoading && (!annotations || annotations.length === 0) && (
                      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 opacity-40">
                         <Info className="h-12 w-12 text-slate-300" />
                         <p className="text-sm text-slate-500 max-w-[200px]">
                           Add your first study note below or ask the AI Pedagogical Guide for a deep dive.
                         </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <form onSubmit={handleAddAnnotation} className="p-4 border-t border-slate-100 bg-white">
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2">
                    <input 
                      type="text" 
                      value={newAnnotation}
                      onChange={(e) => setNewAnnotation(e.target.value)}
                      placeholder="Add a scholarly annotation..." 
                      className="bg-transparent border-none focus:ring-0 text-sm flex-1 outline-none"
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 text-primary"
                      disabled={!newAnnotation.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
