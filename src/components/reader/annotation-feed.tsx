"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Users, MessageSquare, Plus, Send } from "lucide-react";

interface AnnotationFeedProps {
  currentRef: string;
  user: any;
  selectedCircleId: string | null;
  userCircles: any[] | null;
  setSelectedCircleId: (id: string | null) => void;
  annotationThreads: any[];
  replyingToId: string | null;
  setReplyingToId: (id: string | null) => void;
  replyComment: string;
  setReplyComment: (comment: string) => void;
  newComment: string;
  setNewComment: (comment: string) => void;
  showAddForm: boolean;
  setShowAddForm: (show: boolean) => void;
  onSaveAnnotation: (text: string, parentId?: string | null) => Promise<void>;
  onToggleReaction: (annId: string, reactionType: "insightful" | "needsContext") => Promise<void>;
  getThemeClass: (light: string, sepia: string, dark: string) => string;
}

export default function AnnotationFeed({
  currentRef,
  user,
  selectedCircleId,
  userCircles,
  setSelectedCircleId,
  annotationThreads,
  replyingToId,
  setReplyingToId,
  replyComment,
  setReplyComment,
  newComment,
  setNewComment,
  showAddForm,
  setShowAddForm,
  onSaveAnnotation,
  onToggleReaction,
  getThemeClass
}: AnnotationFeedProps) {

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await onSaveAnnotation(newComment, null);
    setNewComment("");
    setShowAddForm(false);
  };

  const handleAddReply = async (parentId: string) => {
    if (!replyComment.trim()) return;
    await onSaveAnnotation(replyComment, parentId);
    setReplyComment("");
    setReplyingToId(null);
  };

  return (
    <Card className={cn(
      "border-none shadow-sm rounded-2xl overflow-hidden",
      getThemeClass("bg-white", "bg-[#FAF6EE]", "bg-slate-900/50")
    )}>
      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" /> Marginalia
          </CardTitle>
          {user && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-lg"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription className="text-xs">
          Scholarly discourse for {currentRef}
        </CardDescription>

        {/* Group Circle Selector */}
        {user && userCircles && userCircles.length > 0 && (
          <div className="pt-2">
            <Select
              value={selectedCircleId || "public"}
              onValueChange={(val) => setSelectedCircleId(val === "public" ? null : val)}
            >
              <SelectTrigger className="w-full h-8 text-[11px] font-bold rounded-lg border-slate-200 dark:border-slate-800">
                <SelectValue placeholder="Select context" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public" className="text-xs font-bold flex items-center gap-1.5">
                  🌍 Public Insights
                </SelectItem>
                {userCircles.map((circle: any) => (
                  <SelectItem key={circle.id} value={circle.id} className="text-xs font-bold">
                    👥 Circle: {circle.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-5 pt-0">
        {/* New Main Comment Form */}
        {showAddForm && (
          <div className="mb-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-950/20 animate-in slide-in-from-top-2 duration-300">
            <Textarea
              placeholder="Record a theological insight or query..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[90px] text-xs p-3 rounded-xl bg-white dark:bg-slate-900 border-slate-250 dark:border-slate-850"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-[11px] font-bold rounded-lg px-4"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="h-8 text-[11px] font-bold rounded-lg px-4 btn-gradient"
              >
                Post Insight <Send className="h-3 w-3 ml-2" />
              </Button>
            </div>
          </div>
        )}

        <ScrollArea className="h-[400px] pr-2">
          {annotationThreads.length > 0 ? (
            <div className="space-y-4">
              {annotationThreads.map((thread) => {
                const renderThread = (ann: any, depth = 0) => {
                  const isReplyFormActive = replyingToId === ann.id;
                  return (
                    <div 
                      key={ann.id} 
                      className={cn(
                        "p-4 rounded-xl space-y-3 border-l-2",
                        depth > 0 
                          ? "bg-slate-50/30 dark:bg-slate-950/10 border-slate-200 dark:border-slate-800 ml-5 mt-2" 
                          : "bg-white dark:bg-slate-900 border-primary/20 shadow-sm"
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={ann.userPhotoURL} alt={ann.userDisplayName} />
                            <AvatarFallback className="bg-primary/5 text-primary text-[10px] font-bold">
                              {ann.userDisplayName?.charAt(0) || "S"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate text-slate-900 dark:text-white">{ann.userDisplayName}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                              {ann.createdAt?.seconds 
                                ? new Date(ann.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                : 'Just now'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-body">
                        {ann.comment}
                      </p>

                      {/* Reactions & Reply Action Bar */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex gap-2">
                          <button
                            onClick={() => onToggleReaction(ann.id, 'insightful')}
                            className={cn(
                              "flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full border border-slate-150 dark:border-slate-800 hover:bg-primary/5 transition-colors font-bold text-slate-450",
                              user && ann.reactions?.insightful?.includes(user.uid) && "bg-primary/10 border-primary/20 text-primary"
                            )}
                          >
                            💡 {ann.reactions?.insightful?.length || 0}
                          </button>
                          <button
                            onClick={() => onToggleReaction(ann.id, 'needsContext')}
                            className={cn(
                              "flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full border border-slate-150 dark:border-slate-800 hover:bg-primary/5 transition-colors font-bold text-slate-450",
                              user && ann.reactions?.needsContext?.includes(user.uid) && "bg-amber-500/10 border-amber-500/20 text-amber-600"
                            )}
                          >
                            ❓ {ann.reactions?.needsContext?.length || 0}
                          </button>
                        </div>

                        {user && depth < 2 && (
                          <button
                            onClick={() => {
                              setReplyingToId(isReplyFormActive ? null : ann.id);
                              setReplyComment("");
                            }}
                            className="text-[10px] text-primary hover:underline font-bold"
                          >
                            {isReplyFormActive ? "Cancel" : "Reply"}
                          </button>
                        )}
                      </div>

                      {/* Reply Form */}
                      {isReplyFormActive && (
                        <div className="mt-3 space-y-2 animate-in slide-in-from-top-1 duration-200">
                          <Textarea
                            placeholder="Write a reply..."
                            value={replyComment}
                            onChange={(e) => setReplyComment(e.target.value)}
                            className="min-h-[70px] text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                          />
                          <div className="flex justify-end">
                            <Button
                              size="sm"
                              onClick={() => handleAddReply(ann.id)}
                              disabled={!replyComment.trim()}
                              className="h-8 text-[11px] font-bold rounded-lg px-4 btn-gradient"
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Render Child Replies */}
                      {ann.replies && ann.replies.length > 0 && (
                        <div className="bg-slate-50/5">
                          {ann.replies.map((reply: any) => renderThread(reply, depth + 1))}
                        </div>
                      )}
                    </div>
                  );
                };
                
                return renderThread(thread);
              })}
            </div>
          ) : (
            <div className="p-20 text-center opacity-30 flex flex-col items-center space-y-4">
              <BookOpen className="h-10 w-10" />
              <p className="text-xs font-bold uppercase tracking-widest">No insights yet.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
