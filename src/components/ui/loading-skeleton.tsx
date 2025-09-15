import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function InstructorSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-muted" />
              <div className="w-12 h-5 bg-muted rounded" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-5 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-muted rounded flex-1" />
              <div className="h-8 w-8 bg-muted rounded" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}