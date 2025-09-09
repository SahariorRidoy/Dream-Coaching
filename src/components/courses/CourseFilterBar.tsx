import React from "react";
import { cn } from "@/lib/utils";

type Filter = {
  label: string;
  count: number;
  category: string;
  active?: boolean;
};

interface Props {
  filters: Filter[];
  onSelect: (index: number) => void;
  selected: number;
}

export default function CourseFilterBar({
  filters,
  onSelect,
  selected,
}: Props) {
  return (
    <div className="flex gap-3 justify-center mb-12 mt-6 flex-wrap">
      {filters.map((filter, idx) => (
        <button
          key={filter.label}
          className={cn(
            "group cursor-pointer relative px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105",
            "border-1 backdrop-blur-sm",
            selected === idx
              ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-primary/50 shadow-lg shadow-primary/25"
              : "bg-background/80 text-primary border-primary/30 hover:bg-primary/10 hover:border-primary/50 hover:shadow-md"
          )}
          onClick={() => onSelect(idx)}
        >
          <span className="relative z-10 flex items-center gap-2">
            {filter.label}
            <span 
              className={cn(
                "px-2 py-1 rounded-full text-xs font-bold transition-all duration-300",
                selected === idx
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : "bg-primary/20 text-primary group-hover:bg-primary/30"
              )}
            >
              {filter.count}
            </span>
          </span>
          
          {/* Active indicator */}
          {selected === idx && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full animate-pulse" />
          )}
        </button>
      ))}
    </div>
  );
}
