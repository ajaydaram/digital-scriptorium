
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
  onVersionChange: (versionId: string) => void;
}

export function BibleVersionSwitcher({ currentVersion, onVersionChange }: BibleVersionSwitcherProps) {
  // Find current display name
  const current = SUPPORTED_VERSIONS.find(v => v.id === currentVersion || v.code === currentVersion);

  return (
    <Select value={current?.id || currentVersion} onValueChange={onVersionChange}>
      <SelectTrigger className="w-[220px] h-9 rounded-xl bg-white border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        <SelectValue placeholder="Select Version" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        {SUPPORTED_VERSIONS.map((v) => (
          <SelectItem key={v.id} value={v.id} className="text-[10px] font-bold uppercase tracking-widest">
            {v.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
