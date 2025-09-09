'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Facebook } from "lucide-react";
import Image from "next/image";

interface InstructorCardProps {
  name: string;
  subject: string;
  subjectColor: string;
  subjectIcon: string;
  title: string;
  institution: string;
  image: string;
  youtube: string;
  facebook: string;
  small?: boolean; // allow small prop for future use
}

export default function InstructorCard({
  name,
  subject,
  title,
  institution,
  image,
  youtube,
  facebook,
  small = true,
}: InstructorCardProps) {
  return (
    <Card className="group bg-instructor-card border-1 cursor-pointer shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:scale-105 animate-fade-in max-w-[280px] w-full h-[340px] flex flex-col">
      <CardContent className="p-0 flex flex-col flex-1 h-full">
        <div className="relative flex justify-center pt-4">
          <Image
            src={image}
            alt={name}
            width={80}
            height={80}
            className="rounded-3xl object-cover border-4 border-background shadow-lg w-20 h-20"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between px-4 pt-3 pb-3 space-y-1">
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-foreground leading-tight line-clamp-1">
              {name}
            </h3>
            <div className="inline-block px-2 py-0.5 bg-secondary/90 text-white text-xs font-medium rounded-full">
              {subject}
            </div>
            <p className="text-xs text-muted-foreground font-medium line-clamp-2 min-h-[32px]">
              {title}
            </p>
            {institution && (
              <p className="text-xs text-muted-foreground line-clamp-1 min-h-[18px]">
                {institution}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 px-2 py-1 rounded bg-red-500 hover:bg-red-600 cursor-pointer hover:text-white text-white text-xs font-medium border-none"
              onClick={() => window.open(youtube, "_blank")}
            >
              <Youtube size={14} />
              YouTube
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 px-2 py-1 rounded bg-primary/90 hover:bg-primary hover:text-white cursor-pointer text-primary-foreground text-xs font-medium border-none"
              onClick={() => window.open(facebook, "_blank")}
            >
              <Facebook size={14} />
              Facebook
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
