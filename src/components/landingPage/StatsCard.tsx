import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, GraduationCap, Play, ArrowRight } from "lucide-react";

const stats = [
  { label: "Students", value: "18,382", icon: Users },
  { label: "Courses", value: "27", icon: BookOpen },
  { label: "Teachers", value: "14", icon: GraduationCap },
  { label: "Videos", value: "948", icon: Play },
];

export default function StatsCards() {
  return (
    <div className="bg-gradient-to-b from-primary to-primary/60 py-8 sm:py-12 pb-16 sm:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 container mx-auto px-4">
        {/* Online Course Card */}
        <Card className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <Badge
                variant="secondary"
                className="bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 text-xs sm:text-sm"
              >
                Online Course
              </Badge>
            </div>
            <CardTitle className="text-lg sm:text-xl font-semibold text-[#1E3A8A]">
              Online Batches are ongoing!
            </CardTitle>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Book your seat now</p>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg border border-[#1E3A8A]/20 bg-[#1E3A8A]/5">
                <div>
                  <h4 className="font-medium text-[#111827] text-sm sm:text-base">Class 9, 10</h4>
                  <p className="text-xs sm:text-sm text-gray-600">SSC Preparation</p>
                </div>
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E3A8A]" />
              </div>
              <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg border border-[#10B981]/20 bg-[#10B981]/5">
                <div>
                  <h4 className="font-medium text-[#111827] text-sm sm:text-base">College</h4>
                  <p className="text-xs sm:text-sm text-gray-600">HSC Preparation</p>
                </div>
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#10B981]" />
              </div>
            </div>
            <Button
              variant="ghost"
              className="text-[#1E3A8A] hover:text-[#10B981] p-0 h-auto group text-sm sm:text-base"
            >
              See All Courses
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <Badge
                variant="secondary"
                className="bg-[#FACC15]/20 text-[#F59E0B] border border-[#FACC15]/30 text-xs sm:text-sm"
              >
                Platform Stats
              </Badge>
            </div>
            <CardTitle className="text-lg sm:text-xl font-semibold text-[#1E3A8A]">
              See the stats!
            </CardTitle>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              The trust we are building
            </p>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {stats.map((stat, i) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={i}
                    className="p-3 sm:p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-[#F9FAFB] to-white hover:from-[#10B981]/10 hover:to-white transition-colors"
                  >
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-[#10B981] mb-2" />
                    <div className="text-lg sm:text-2xl font-semibold text-[#111827]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
            <Button
              variant="ghost"
              className="text-[#111827] hover:text-[#1E3A8A] p-0 h-auto group w-full justify-center text-sm sm:text-base"
            >
              View Analytics
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
