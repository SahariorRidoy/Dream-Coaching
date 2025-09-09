import Image from "next/image";

type CourseCardProps = {
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
    <div className="bg-card rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
      <div className="relative aspect-[16/9]">
        <Image src={image} alt={title} fill className="object-cover" priority />
        {isStarred && (
          <span className="absolute top-2 right-2 bg-white rounded-full p-1">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" className="text-accent">
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
            </svg>
          </span>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded font-bold">
            {badge}
          </span>
        </div>
        <div
          className="font-semibold text-lg mb-2 leading-snug min-h-[3.25rem]"
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
            <span className="font-bold text-primary text-xl">৳০</span>
          ) : (
            <>
              <span className="font-bold text-primary text-xl">৳{price}</span>
              {oldPrice && (
                <span className="text-muted-foreground line-through font-medium">
                  ৳{oldPrice}
                </span>
              )}
              {discount && (
                <span className="text-secondary font-semibold text-sm">
                  {discount}
                </span>
              )}
            </>
          )}
        </div>
        {students !== undefined && (
          <div className="mt-1 text-muted-foreground text-sm flex items-center gap-1">
            <svg width={16} height={16} fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zm4 1H4a4 4 0 00-4 4v1h16v-1a4 4 0 00-4-4z" />
            </svg>
            {students} students
          </div>
        )}
      </div>
    </div>
  );
}
