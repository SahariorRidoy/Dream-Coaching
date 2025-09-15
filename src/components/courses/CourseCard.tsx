import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type CourseCardProps = {
  id: string;
  image: string;
  badge: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  students?: number;
  tag?: string;
  isFree?: boolean;
  isStarred?: boolean;
};

export default function CourseCard({
  id,
  image,
  badge,
  title,
  price,
  oldPrice,
  discount,
  students,
  isFree,
  isStarred,
}: CourseCardProps) {
  return (
    <div className="bg-card rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[16/9]">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover" 
          priority 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/course-placeholder.jpg';
          }}
        />
        {isStarred && (
          <span className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" className="text-accent sm:w-5 sm:h-5">
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
            </svg>
          </span>
        )}
      </div>
      <div className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="bg-secondary text-secondary-foreground text-xs px-2 sm:px-3 py-1 rounded font-bold">
            {badge}
          </span>
        </div>
        <div
          className="font-semibold text-base sm:text-lg mb-2 leading-snug min-h-[2.5rem] sm:min-h-[3.25rem]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as any,
            overflow: "hidden",
          }}
        >
          {title}
        </div>
        <div className="flex flex-row items-end gap-2 mt-auto">
          {isFree ? (
            <span className="font-bold text-primary text-lg sm:text-xl">৳০</span>
          ) : (
            <>
              <span className="font-bold text-primary text-lg sm:text-xl">৳{price}</span>
              {oldPrice && (
                <span className="text-muted-foreground line-through font-medium text-sm">
                  ৳{oldPrice}
                </span>
              )}
              {discount && (
                <span className="text-secondary font-semibold text-xs sm:text-sm">
                  {discount}
                </span>
              )}
            </>
          )}
        </div>
        {students !== undefined && (
          <div className="mt-1 text-muted-foreground text-xs sm:text-sm flex items-center gap-1">
            <svg width={14} height={14} fill="currentColor" viewBox="0 0 16 16" className="sm:w-4 sm:h-4">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zm4 1H4a4 4 0 00-4 4v1h16v-1a4 4 0 00-4-4z" />
            </svg>
            <span className="hidden sm:inline">{students} students</span>
            <span className="sm:hidden">{students > 1000 ? `${Math.round(students/1000)}k` : students} students</span>
          </div>
        )}
        
        <div className="mt-3 flex gap-2">
          <Link href={`/courses/${id}`} className="flex-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              View Details
            </Button>
          </Link>
          <Button 
            size="sm" 
            className="px-4 sm:px-6 text-xs sm:text-sm bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              // Handle enroll logic here
              // Course enrollment functionality
            }}
          >
            Enroll
          </Button>
        </div>
      </div>
    </div>
  );
}
