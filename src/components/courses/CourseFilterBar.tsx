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
    <div className="mb-8 sm:mb-12 mt-4 sm:mt-6">
      {/* Mobile: Horizontal scroll */}
      <div className="flex gap-2 sm:gap-3 justify-start sm:justify-center overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap scrollbar-hide">
        {filters.map((filter, idx) => (
          <button
            key={filter.label}
            className={cn(
              "group cursor-pointer relative px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 whitespace-nowrap flex-shrink-0",
              "border-1 backdrop-blur-sm text-sm sm:text-base",
              selected === idx
                ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-primary/50 shadow-lg shadow-primary/25"
                : "bg-background/80 text-primary border-primary/30 hover:bg-primary/10 hover:border-primary/50 hover:shadow-md"
            )}
            onClick={() => onSelect(idx)}
          >
            <span className="relative z-10 flex items-center gap-1 sm:gap-2">
              <span className="hidden sm:inline">{filter.label}</span>
              <span className="sm:hidden">{filter.label.replace('Class ', 'C')}</span>
              <span 
                className={cn(
                  "px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold transition-all duration-300",
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
    </div>
  );
}
