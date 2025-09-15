"use client";
import CourseCard from "@/components/courses/CourseCard";
import CourseFilterBar from "@/components/courses/CourseFilterBar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Users, Star } from "lucide-react";

interface Filter {
  label: string
  count: number
  category: string
}

interface Course {
  id: string
  image: string
  badge: string
  title: string
  price: number
  oldPrice?: number
  discount?: string
  tag: string
  isStarred: boolean
  students: number
  duration: string
  rating: number
  isFree?: boolean
}

// Enhanced filters with proper counts
const filters: Filter[] = [
  { label: "All Courses", count: 50, category: "all" },
  { label: "Combos", count: 12, category: "Combos" },
  { label: "HSC", count: 15, category: "HSC" },
  { label: "SSC", count: 18, category: "SSC" },
  { label: "Class 6-8", count: 5, category: "Class 6-8" },
];

// Comprehensive demo data for all categories
const allCourses: Course[] = [
  // SSC Courses (18)
  {
    id: "ssc-ict-basic-pro",
    image: "https://picsum.photos/id/1018/600/400",
    badge: "SSC 26-27",
    title: "SSC ICT Basic to Pro 2.0",
    price: 499,
    oldPrice: 999,
    discount: "50% OFF",
    tag: "SSC",
    isStarred: true,
    students: 1250,
    duration: "3 months",
    rating: 4.8,
  },
  {
    id: "ssc-math-complete",
    image: "https://picsum.photos/id/1020/600/400",
    badge: "2026 & 2027",
    title: "SSC Mathematics Complete Course",
    price: 0,
    isFree: true,
    students: 7896,
    tag: "SSC",
    isStarred: true,
    duration: "4 months",
    rating: 4.9,
  },
  {
    id: "ssc-physics-mastery",
    image: "https://picsum.photos/id/1015/600/400",
    badge: "SSC",
    title: "SSC Physics Mastery Program",
    price: 599,
    oldPrice: 899,
    discount: "33% OFF",
    tag: "SSC",
    isStarred: false,
    students: 890,
    duration: "3 months",
    rating: 4.7,
  },
  {
    id: "ssc-chemistry-guide",
    image: "https://picsum.photos/id/1012/600/400",
    badge: "SSC",
    title: "SSC Chemistry Complete Guide",
    price: 549,
    oldPrice: 799,
    discount: "31% OFF",
    tag: "SSC",
    isStarred: true,
    students: 1200,
    duration: "3 months",
    rating: 4.6,
  },
  {
    id: "ssc-biology-comprehensive",
    image: "https://picsum.photos/id/1010/600/400",
    badge: "SSC",
    title: "SSC Biology Comprehensive Course",
    price: 499,
    oldPrice: 699,
    discount: "29% OFF",
    tag: "SSC",
    isStarred: false,
    students: 750,
    duration: "3 months",
    rating: 4.5,
  },
  {
    id: "ssc-english-mastery",
    image: "https://picsum.photos/id/1008/600/400",
    badge: "SSC",
    title: "SSC English Language Mastery",
    price: 399,
    oldPrice: 599,
    discount: "33% OFF",
    tag: "SSC",
    isStarred: true,
    students: 2100,
    duration: "2 months",
    rating: 4.8,
  },
  {
    id: "ssc-bangla-literature",
    image: "https://picsum.photos/id/1006/600/400",
    badge: "SSC",
    title: "SSC Bangla Literature Course",
    price: 349,
    oldPrice: 499,
    discount: "30% OFF",
    tag: "SSC",
    isStarred: false,
    students: 980,
    duration: "2 months",
    rating: 4.4,
  },
  {
    id: "ssc-social-science",
    image: "https://picsum.photos/id/1004/600/400",
    badge: "SSC",
    title: "SSC Social Science Complete",
    price: 449,
    oldPrice: 649,
    discount: "31% OFF",
    tag: "SSC",
    isStarred: true,
    students: 1150,
    duration: "3 months",
    rating: 4.6,
  },
  {
    id: "ssc-higher-math",
    image: "https://picsum.photos/id/1002/600/400",
    badge: "SSC",
    title: "SSC Higher Mathematics",
    price: 599,
    oldPrice: 899,
    discount: "33% OFF",
    tag: "SSC",
    isStarred: false,
    students: 680,
    duration: "4 months",
    rating: 4.7,
  },
  {
    id: "ssc-general-science",
    image: "https://picsum.photos/id/1000/600/400",
    badge: "SSC",
    title: "SSC General Science",
    price: 399,
    oldPrice: 599,
    discount: "33% OFF",
    tag: "SSC",
    isStarred: true,
    students: 1350,
    duration: "2 months",
    rating: 4.5,
  },
  {
    id: "ssc-geography",
    image: "https://picsum.photos/id/999/600/400",
    badge: "SSC",
    title: "SSC Geography & Environment",
    price: 349,
    oldPrice: 499,
    discount: "30% OFF",
    tag: "SSC",
    isStarred: false,
    students: 720,
    duration: "2 months",
    rating: 4.3,
  },
  {
    id: "ssc-history",
    image: "https://picsum.photos/id/998/600/400",
    badge: "SSC",
    title: "SSC History & Civilization",
    price: 399,
    oldPrice: 599,
    discount: "33% OFF",
    tag: "SSC",
    isStarred: true,
    students: 890,
    duration: "2 months",
    rating: 4.4,
  },
  {
    id: "ssc-economics",
    image: "https://picsum.photos/id/997/600/400",
    badge: "SSC",
    title: "SSC Economics Complete",
    price: 449,
    oldPrice: 649,
    discount: "31% OFF",
    tag: "SSC",
    isStarred: false,
    students: 650,
    duration: "3 months",
    rating: 4.6,
  },
  {
    id: "ssc-accounting",
    image: "https://picsum.photos/id/996/600/400",
    badge: "SSC",
    title: "SSC Accounting Principles",
    price: 499,
    oldPrice: 749,
    discount: "33% OFF",
    tag: "SSC",
    isStarred: true,
    students: 580,
    duration: "3 months",
    rating: 4.5,
  },
  {
    id: "ssc-business-studies",
    image: "https://picsum.photos/id/995/600/400",
    badge: "SSC",
    title: "SSC Business Studies",
    price: 399,
    oldPrice: 599,
    discount: "33% OFF",
    tag: "SSC",
    isStarred: false,
    students: 720,
    duration: "2 months",
    rating: 4.4,
  },
  {
    id: "ssc-agriculture",
    image: "https://picsum.photos/id/994/600/400",
    badge: "SSC",
    title: "SSC Agriculture Science",
    price: 349,
    oldPrice: 499,
    discount: "30% OFF",
    tag: "SSC",
    isStarred: true,
    students: 450,
    duration: "2 months",
    rating: 4.2,
  },
  {
    id: "ssc-home-economics",
    image: "https://picsum.photos/id/993/600/400",
    badge: "SSC",
    title: "SSC Home Economics",
    price: 299,
    oldPrice: 449,
    discount: "33% OFF",
    tag: "SSC",
    isStarred: false,
    students: 380,
    duration: "2 months",
    rating: 4.3,
  },
  {
    id: "ssc-religious-studies",
    image: "https://picsum.photos/id/992/600/400",
    badge: "SSC",
    title: "SSC Religious Studies",
    price: 249,
    oldPrice: 399,
    discount: "38% OFF",
    tag: "SSC",
    isStarred: true,
    students: 520,
    duration: "1 month",
    rating: 4.1,
  },

  // HSC Courses (15)
  {
    id: "hsc-chemistry-mastery",
    image: "https://picsum.photos/id/1005/600/400",
    badge: "HSC",
    title: "HSC Chemistry Mastery Series",
    price: 699,
    oldPrice: 999,
    discount: "30% OFF",
    tag: "HSC",
    isStarred: false,
    students: 1200,
    duration: "4 months",
    rating: 4.8,
  },
  {
    id: "hsc-physics-advanced",
    image: "https://picsum.photos/id/1003/600/400",
    badge: "HSC",
    title: "HSC Physics Advanced Course",
    price: 799,
    oldPrice: 1199,
    discount: "33% OFF",
    tag: "HSC",
    isStarred: true,
    students: 980,
    duration: "4 months",
    rating: 4.7,
  },
  {
    id: "hsc-mathematics",
    image: "https://picsum.photos/id/1001/600/400",
    badge: "HSC",
    title: "HSC Mathematics Complete",
    price: 899,
    oldPrice: 1299,
    discount: "31% OFF",
    tag: "HSC",
    isStarred: true,
    students: 1500,
    duration: "5 months",
    rating: 4.9,
  },
  {
    id: "hsc-biology",
    image: "https://picsum.photos/id/999/600/400",
    badge: "HSC",
    title: "HSC Biology Comprehensive",
    price: 649,
    oldPrice: 949,
    discount: "32% OFF",
    tag: "HSC",
    isStarred: false,
    students: 850,
    duration: "4 months",
    rating: 4.6,
  },
  {
    id: "hsc-english-literature",
    image: "https://picsum.photos/id/997/600/400",
    badge: "HSC",
    title: "HSC English Literature",
    price: 549,
    oldPrice: 799,
    discount: "31% OFF",
    tag: "HSC",
    isStarred: true,
    students: 1100,
    duration: "3 months",
    rating: 4.5,
  },
  {
    id: "hsc-bangla-literature",
    image: "https://picsum.photos/id/995/600/400",
    badge: "HSC",
    title: "HSC Bangla Literature",
    price: 499,
    oldPrice: 749,
    discount: "33% OFF",
    tag: "HSC",
    isStarred: false,
    students: 920,
    duration: "3 months",
    rating: 4.4,
  },
  {
    id: "hsc-economics",
    image: "https://picsum.photos/id/993/600/400",
    badge: "HSC",
    title: "HSC Economics Advanced",
    price: 599,
    oldPrice: 899,
    discount: "33% OFF",
    tag: "HSC",
    isStarred: true,
    students: 680,
    duration: "4 months",
    rating: 4.7,
  },
  {
    id: "hsc-accounting",
    image: "https://picsum.photos/id/991/600/400",
    badge: "HSC",
    title: "HSC Accounting & Finance",
    price: 649,
    oldPrice: 949,
    discount: "32% OFF",
    tag: "HSC",
    isStarred: false,
    students: 750,
    duration: "4 months",
    rating: 4.6,
  },
  {
    id: "hsc-business-studies",
    image: "https://picsum.photos/id/989/600/400",
    badge: "HSC",
    title: "HSC Business Studies",
    price: 549,
    oldPrice: 799,
    discount: "31% OFF",
    tag: "HSC",
    isStarred: true,
    students: 820,
    duration: "3 months",
    rating: 4.5,
  },
  {
    id: "hsc-geography",
    image: "https://picsum.photos/id/987/600/400",
    badge: "HSC",
    title: "HSC Geography & Environment",
    price: 449,
    oldPrice: 649,
    discount: "31% OFF",
    tag: "HSC",
    isStarred: false,
    students: 580,
    duration: "3 months",
    rating: 4.3,
  },
  {
    id: "hsc-history",
    image: "https://picsum.photos/id/985/600/400",
    badge: "HSC",
    title: "HSC History & Civilization",
    price: 499,
    oldPrice: 749,
    discount: "33% OFF",
    tag: "HSC",
    isStarred: true,
    students: 650,
    duration: "3 months",
    rating: 4.4,
  },
  {
    id: "hsc-psychology",
    image: "https://picsum.photos/id/983/600/400",
    badge: "HSC",
    title: "HSC Psychology & Philosophy",
    price: 399,
    oldPrice: 599,
    discount: "33% OFF",
    tag: "HSC",
    isStarred: false,
    students: 420,
    duration: "2 months",
    rating: 4.2,
  },
  {
    id: "hsc-sociology",
    image: "https://picsum.photos/id/981/600/400",
    badge: "HSC",
    title: "HSC Sociology Complete",
    price: 449,
    oldPrice: 649,
    discount: "31% OFF",
    tag: "HSC",
    isStarred: true,
    students: 380,
    duration: "2 months",
    rating: 4.1,
  },
  {
    id: "hsc-political-science",
    image: "https://picsum.photos/id/979/600/400",
    badge: "HSC",
    title: "HSC Political Science",
    price: 399,
    oldPrice: 599,
    discount: "33% OFF",
    tag: "HSC",
    isStarred: false,
    students: 350,
    duration: "2 months",
    rating: 4.0,
  },
  {
    id: "hsc-statistics",
    image: "https://picsum.photos/id/977/600/400",
    badge: "HSC",
    title: "HSC Statistics & Data Analysis",
    price: 549,
    oldPrice: 799,
    discount: "31% OFF",
    tag: "HSC",
    isStarred: true,
    students: 480,
    duration: "3 months",
    rating: 4.6,
  },

  // Combos Courses (12)
  {
    id: "math-physics-combo",
    image: "https://picsum.photos/id/1003/600/400",
    badge: "Combos",
    title: "Math + Physics Combo Pack",
    price: 899,
    oldPrice: 1399,
    discount: "35% OFF",
    tag: "Combos",
    isStarred: true,
    students: 2100,
    duration: "6 months",
    rating: 4.8,
  },
  {
    id: "chemistry-biology-combo",
    image: "https://picsum.photos/id/1001/600/400",
    badge: "Combos",
    title: "Chemistry + Biology Master Pack",
    price: 799,
    oldPrice: 1199,
    discount: "33% OFF",
    tag: "Combos",
    isStarred: true,
    students: 1800,
    duration: "5 months",
    rating: 4.7,
  },
  {
    id: "ssc-science-bundle",
    image: "https://picsum.photos/id/999/600/400",
    badge: "Combos",
    title: "SSC Complete Science Bundle",
    price: 1199,
    oldPrice: 1799,
    discount: "33% OFF",
    tag: "Combos",
    isStarred: false,
    students: 2500,
    duration: "8 months",
    rating: 4.9,
  },
  {
    id: "hsc-science-complete",
    image: "https://picsum.photos/id/997/600/400",
    badge: "Combos",
    title: "HSC Science Stream Complete",
    price: 1399,
    oldPrice: 2099,
    discount: "33% OFF",
    tag: "Combos",
    isStarred: true,
    students: 1900,
    duration: "10 months",
    rating: 4.8,
  },
  {
    id: "math-ict-combo",
    image: "https://picsum.photos/id/995/600/400",
    badge: "Combos",
    title: "Math + ICT Combo Course",
    price: 699,
    oldPrice: 1099,
    discount: "36% OFF",
    tag: "Combos",
    isStarred: true,
    students: 1600,
    duration: "4 months",
    rating: 4.6,
  },
  {
    id: "english-bangla-combo",
    image: "https://picsum.photos/id/993/600/400",
    badge: "Combos",
    title: "English + Bangla Literature",
    price: 599,
    oldPrice: 899,
    discount: "33% OFF",
    tag: "Combos",
    isStarred: false,
    students: 1200,
    duration: "4 months",
    rating: 4.5,
  },
  {
    id: "social-science-bundle",
    image: "https://picsum.photos/id/991/600/400",
    badge: "Combos",
    title: "Social Science Complete Bundle",
    price: 799,
    oldPrice: 1199,
    discount: "33% OFF",
    tag: "Combos",
    isStarred: true,
    students: 1400,
    duration: "5 months",
    rating: 4.7,
  },
  {
    id: "business-economics-combo",
    image: "https://picsum.photos/id/989/600/400",
    badge: "Combos",
    title: "Business Studies + Economics",
    price: 649,
    oldPrice: 999,
    discount: "35% OFF",
    tag: "Combos",
    isStarred: false,
    students: 950,
    duration: "4 months",
    rating: 4.4,
  },
  {
    id: "mega-bundle",
    image: "https://picsum.photos/id/987/600/400",
    badge: "Combos",
    title: "All Subjects Mega Bundle",
    price: 1999,
    oldPrice: 2999,
    discount: "33% OFF",
    tag: "Combos",
    isStarred: true,
    students: 3200,
    duration: "12 months",
    rating: 4.9,
  },
  {
    id: "physics-chemistry-combo",
    image: "https://picsum.photos/id/985/600/400",
    badge: "Combos",
    title: "Physics + Chemistry Advanced",
    price: 899,
    oldPrice: 1399,
    discount: "36% OFF",
    tag: "Combos",
    isStarred: true,
    students: 1100,
    duration: "6 months",
    rating: 4.8,
  },
  {
    id: "math-statistics-combo",
    image: "https://picsum.photos/id/983/600/400",
    badge: "Combos",
    title: "Math + Statistics Combo",
    price: 749,
    oldPrice: 1149,
    discount: "35% OFF",
    tag: "Combos",
    isStarred: false,
    students: 800,
    duration: "5 months",
    rating: 4.6,
  },
  {
    id: "language-arts-combo",
    image: "https://picsum.photos/id/981/600/400",
    badge: "Combos",
    title: "Language Arts Complete",
    price: 549,
    oldPrice: 849,
    discount: "35% OFF",
    tag: "Combos",
    isStarred: true,
    students: 1300,
    duration: "3 months",
    rating: 4.5,
  },

  // Class 6-8 Courses (5)
  {
    id: "class-8-exam-prep",
    image: "https://picsum.photos/id/1025/600/400",
    badge: "Class-8",
    title: "Class-8 II Exam Preparation Free Crash Course",
    price: 0,
    isFree: true,
    tag: "Class 6-8",
    isStarred: true,
    students: 4500,
    duration: "1 month",
    rating: 4.8,
  },
  {
    id: "class-7-math-foundation",
    image: "https://picsum.photos/id/1023/600/400",
    badge: "Class-7",
    title: "Class-7 Mathematics Foundation",
    price: 299,
    oldPrice: 449,
    discount: "33% OFF",
    tag: "Class 6-8",
    isStarred: false,
    students: 1200,
    duration: "2 months",
    rating: 4.6,
  },
  {
    id: "class-6-science-basics",
    image: "https://picsum.photos/id/1021/600/400",
    badge: "Class-6",
    title: "Class-6 Science Basics",
    price: 249,
    oldPrice: 399,
    discount: "38% OFF",
    tag: "Class 6-8",
    isStarred: true,
    students: 1800,
    duration: "2 months",
    rating: 4.7,
  },
  {
    id: "class-8-english-grammar",
    image: "https://picsum.photos/id/1019/600/400",
    badge: "Class-8",
    title: "Class-8 English Grammar Mastery",
    price: 199,
    oldPrice: 299,
    discount: "33% OFF",
    tag: "Class 6-8",
    isStarred: false,
    students: 950,
    duration: "1 month",
    rating: 4.4,
  },
  {
    id: "class-7-social-studies",
    image: "https://picsum.photos/id/1017/600/400",
    badge: "Class-7",
    title: "Class-7 Social Studies Complete",
    price: 349,
    oldPrice: 499,
    discount: "30% OFF",
    tag: "Class 6-8",
    isStarred: true,
    students: 1100,
    duration: "2 months",
    rating: 4.5,
  },
];

export default function CoursesPage(): React.JSX.Element {
  const [selected, setSelected] = useState(0);
  const [visibleCourses, setVisibleCourses] = useState(8);

  // Filter courses based on selected category
  const filteredCourses = selected === 0 
    ? allCourses 
    : allCourses.filter(course => course.tag === filters[selected].category);

  // Get courses to display (with pagination)
  const displayedCourses = filteredCourses.slice(0, visibleCourses);
  const hasMoreCourses = filteredCourses.length > visibleCourses;

  const loadMoreCourses = () => {
    setVisibleCourses(prev => prev + 16);
  };

  const resetPagination = () => {
    setVisibleCourses(8);
  };

  // Reset pagination when filter changes
  const handleFilterChange = (index: number) => {
    setSelected(index);
    resetPagination();
  };

  return (
    <div className="bg-gradient-to-br from-background via-muted/20 to-background min-h-screen pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                All Courses
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Excellence in Education</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4">
            Improve your academic knowledge and prepare effectively for your
            examinations by enrolling in our courses. Learn from expert and
            experienced instructors with our comprehensive learning platform.
          </p>
        </div>

        {/* Filter Bar */}
        <CourseFilterBar
          filters={filters}
          onSelect={handleFilterChange}
          selected={selected}
        />

        {/* Courses Section */}
        <div className="space-y-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {filters[selected].label}
              </h2>
              <span className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium">
                {filteredCourses.length} courses
              </span>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1 sm:gap-2">
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{filteredCourses.reduce((sum, course) => sum + (course.students || 0), 0).toLocaleString()}+ students</span>
                <span className="sm:hidden">{Math.round(filteredCourses.reduce((sum, course) => sum + (course.students || 0), 0) / 1000)}k+ students</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                <span>4.7 avg rating</span>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedCourses.map((course, idx) => (
              <div 
                key={`${course.tag}-${idx}`}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <CourseCard {...course} />
              </div>
            ))}
          </div>

          {/* See More Button */}
          {hasMoreCourses && (
            <div className="text-center pt-6 sm:pt-8">
              <Button
                onClick={loadMoreCourses}
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground px-6 sm:px-8 py-3 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                See More Courses
                <span className="ml-2 text-xs sm:text-sm opacity-80">
                  ({filteredCourses.length - visibleCourses} remaining)
                </span>
              </Button>
            </div>
          )}

          {/* No courses message */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-sm sm:text-base text-muted-foreground px-4">Try selecting a different category or check back later for new courses.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
