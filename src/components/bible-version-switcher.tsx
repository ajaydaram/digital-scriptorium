"use client";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { SUPPORTED_VERSIONS } from "@/services/bibleService";

interface BibleVersionSwitcherProps {
  currentVersion: string;
  onVersionChange: (version: string) => void;
}

export function BibleVersionSwitcher({ currentVersion, onVersionChange }: BibleVersionSwitcherProps) {
  return (
    <Select value={currentVersion} onValueChange={onVersionChange}>
      <SelectTrigger className="w-[180px] h-9 rounded-xl bg-white border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-500">
        <SelectValue placeholder="Select Version" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        {SUPPORTED_VERSIONS.map((v) => (
          <SelectItem key={v.id} value={v.id} className="text-xs font-bold uppercase tracking-widest">
            {v.id.toUpperCase()} - {v.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
