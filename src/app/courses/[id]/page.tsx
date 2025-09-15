"use client"

import { useState, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  PlayCircle,
  CheckCircle,
  Calendar,
  Globe
} from "lucide-react";

interface CourseDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CourseDetails({ params }: CourseDetailsProps) {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { id } = use(params);

  // Import all courses - this should match the courses page exactly
  const allCourses = [
    // SSC Courses
    { id: "ssc-ict-basic-pro", image: "https://picsum.photos/id/1018/600/400", badge: "SSC 26-27", title: "SSC ICT Basic to Pro 2.0", price: 499, oldPrice: 999, discount: "50% OFF", tag: "SSC", isStarred: true, students: 1250, duration: "3 months", rating: 4.8 },
    { id: "ssc-math-complete", image: "https://picsum.photos/id/1020/600/400", badge: "2026 & 2027", title: "SSC Mathematics Complete Course", price: 0, isFree: true, students: 7896, tag: "SSC", isStarred: true, duration: "4 months", rating: 4.9 },
    { id: "ssc-physics-mastery", image: "https://picsum.photos/id/1015/600/400", badge: "SSC", title: "SSC Physics Mastery Program", price: 599, oldPrice: 899, discount: "33% OFF", tag: "SSC", isStarred: false, students: 890, duration: "3 months", rating: 4.7 },
    { id: "ssc-chemistry-guide", image: "https://picsum.photos/id/1012/600/400", badge: "SSC", title: "SSC Chemistry Complete Guide", price: 549, oldPrice: 799, discount: "31% OFF", tag: "SSC", isStarred: true, students: 1200, duration: "3 months", rating: 4.6 },
    { id: "ssc-biology-comprehensive", image: "https://picsum.photos/id/1010/600/400", badge: "SSC", title: "SSC Biology Comprehensive Course", price: 499, oldPrice: 699, discount: "29% OFF", tag: "SSC", isStarred: false, students: 750, duration: "3 months", rating: 4.5 },
    { id: "ssc-english-mastery", image: "https://picsum.photos/id/1008/600/400", badge: "SSC", title: "SSC English Language Mastery", price: 399, oldPrice: 599, discount: "33% OFF", tag: "SSC", isStarred: true, students: 2100, duration: "2 months", rating: 4.8 },
    { id: "ssc-bangla-literature", image: "https://picsum.photos/id/1006/600/400", badge: "SSC", title: "SSC Bangla Literature Course", price: 349, oldPrice: 499, discount: "30% OFF", tag: "SSC", isStarred: false, students: 980, duration: "2 months", rating: 4.4 },
    { id: "ssc-social-science", image: "https://picsum.photos/id/1004/600/400", badge: "SSC", title: "SSC Social Science Complete", price: 449, oldPrice: 649, discount: "31% OFF", tag: "SSC", isStarred: true, students: 1150, duration: "3 months", rating: 4.6 },
    { id: "ssc-higher-math", image: "https://picsum.photos/id/1002/600/400", badge: "SSC", title: "SSC Higher Mathematics", price: 599, oldPrice: 899, discount: "33% OFF", tag: "SSC", isStarred: false, students: 680, duration: "4 months", rating: 4.7 },
    { id: "ssc-general-science", image: "https://picsum.photos/id/1000/600/400", badge: "SSC", title: "SSC General Science", price: 399, oldPrice: 599, discount: "33% OFF", tag: "SSC", isStarred: true, students: 1350, duration: "2 months", rating: 4.5 },
    { id: "ssc-geography", image: "https://picsum.photos/id/999/600/400", badge: "SSC", title: "SSC Geography & Environment", price: 349, oldPrice: 499, discount: "30% OFF", tag: "SSC", isStarred: false, students: 720, duration: "2 months", rating: 4.3 },
    { id: "ssc-history", image: "https://picsum.photos/id/998/600/400", badge: "SSC", title: "SSC History & Civilization", price: 399, oldPrice: 599, discount: "33% OFF", tag: "SSC", isStarred: true, students: 890, duration: "2 months", rating: 4.4 },
    { id: "ssc-economics", image: "https://picsum.photos/id/997/600/400", badge: "SSC", title: "SSC Economics Complete", price: 449, oldPrice: 649, discount: "31% OFF", tag: "SSC", isStarred: false, students: 650, duration: "3 months", rating: 4.6 },
    { id: "ssc-accounting", image: "https://picsum.photos/id/996/600/400", badge: "SSC", title: "SSC Accounting Principles", price: 499, oldPrice: 749, discount: "33% OFF", tag: "SSC", isStarred: true, students: 580, duration: "3 months", rating: 4.5 },
    { id: "ssc-business-studies", image: "https://picsum.photos/id/995/600/400", badge: "SSC", title: "SSC Business Studies", price: 399, oldPrice: 599, discount: "33% OFF", tag: "SSC", isStarred: false, students: 720, duration: "2 months", rating: 4.4 },
    { id: "ssc-agriculture", image: "https://picsum.photos/id/994/600/400", badge: "SSC", title: "SSC Agriculture Science", price: 349, oldPrice: 499, discount: "30% OFF", tag: "SSC", isStarred: true, students: 450, duration: "2 months", rating: 4.2 },
    { id: "ssc-home-economics", image: "https://picsum.photos/id/993/600/400", badge: "SSC", title: "SSC Home Economics", price: 299, oldPrice: 449, discount: "33% OFF", tag: "SSC", isStarred: false, students: 380, duration: "2 months", rating: 4.3 },
    { id: "ssc-religious-studies", image: "https://picsum.photos/id/992/600/400", badge: "SSC", title: "SSC Religious Studies", price: 249, oldPrice: 399, discount: "38% OFF", tag: "SSC", isStarred: true, students: 520, duration: "1 month", rating: 4.1 },
    // HSC Courses
    { id: "hsc-chemistry-mastery", image: "https://picsum.photos/id/1005/600/400", badge: "HSC", title: "HSC Chemistry Mastery Series", price: 699, oldPrice: 999, discount: "30% OFF", tag: "HSC", isStarred: false, students: 1200, duration: "4 months", rating: 4.8 },
    { id: "hsc-physics-advanced", image: "https://picsum.photos/id/1003/600/400", badge: "HSC", title: "HSC Physics Advanced Course", price: 799, oldPrice: 1199, discount: "33% OFF", tag: "HSC", isStarred: true, students: 980, duration: "4 months", rating: 4.7 },
    { id: "hsc-mathematics", image: "https://picsum.photos/id/1001/600/400", badge: "HSC", title: "HSC Mathematics Complete", price: 899, oldPrice: 1299, discount: "31% OFF", tag: "HSC", isStarred: true, students: 1500, duration: "5 months", rating: 4.9 },
    // Combos
    { id: "math-physics-combo", image: "https://picsum.photos/id/1003/600/400", badge: "Combos", title: "Math + Physics Combo Pack", price: 899, oldPrice: 1399, discount: "35% OFF", tag: "Combos", isStarred: true, students: 2100, duration: "6 months", rating: 4.8 },
    { id: "chemistry-biology-combo", image: "https://picsum.photos/id/1001/600/400", badge: "Combos", title: "Chemistry + Biology Master Pack", price: 799, oldPrice: 1199, discount: "33% OFF", tag: "Combos", isStarred: true, students: 1800, duration: "5 months", rating: 4.7 },
    // Class 6-8
    { id: "class-8-exam-prep", image: "https://picsum.photos/id/1025/600/400", badge: "Class-8", title: "Class-8 II Exam Preparation Free Crash Course", price: 0, isFree: true, tag: "Class 6-8", isStarred: true, students: 4500, duration: "1 month", rating: 4.8 }
  ];

  const courseData = allCourses.find(course => course.id === id);
  
  if (!courseData) {
    notFound();
  }

  const totalLessons = Math.floor(parseInt(courseData.duration) * 8);
  
  const course = {
    ...courseData,
    description: `Master ${courseData.title.toLowerCase()} with comprehensive lessons and expert guidance. Build strong foundation and excel in your examinations.`,
    instructor: {
      name: "Dr. Rahman Ahmed",
      title: "Senior Academic Instructor",
      experience: "12+ years",
      students: 25000,
      rating: 4.9,
      image: courseData.image
    },
    lessons: totalLessons,
    reviews: Math.floor(courseData.students * 0.6),
    level: courseData.tag === "SSC" ? "Secondary Level" : courseData.tag === "HSC" ? "Higher Secondary" : "Foundation Level",
    language: "Bangla & English",
    certificate: true,
    lastUpdated: "December 2024",
    features: [
      `${Math.floor(parseInt(courseData.duration) * 15)} hours of video content`,
      `${Math.floor(parseInt(courseData.duration) * 5)} practice exercises`,
      "Real exam questions",
      "Certificate of completion",
      "Lifetime access",
      "Expert instructor support"
    ],
    curriculum: [
      { title: "Foundation Concepts", lessons: Math.floor(totalLessons * 0.3), duration: `${Math.floor(parseInt(courseData.duration) * 0.3)} months` },
      { title: "Core Topics", lessons: Math.floor(totalLessons * 0.4), duration: `${Math.floor(parseInt(courseData.duration) * 0.4)} months` },
      { title: "Advanced Practice", lessons: Math.floor(totalLessons * 0.2), duration: `${Math.floor(parseInt(courseData.duration) * 0.2)} months` },
      { title: "Exam Preparation", lessons: Math.floor(totalLessons * 0.1), duration: `${Math.floor(parseInt(courseData.duration) * 0.1)} months` }
    ]
  };

  const handleEnroll = () => {
    setIsEnrolled(true);
    // Course enrollment logic
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <Badge className="mb-2">{course.level}</Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {course.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {course.description}
                </p>
              </div>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-muted-foreground">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>

              {/* Instructor */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Your Instructor</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image 
                        src={course.instructor.image} 
                        alt={course.instructor.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{course.instructor.name}</h4>
                      <p className="text-muted-foreground mb-2">{course.instructor.title}</p>
                      <div className="flex gap-4 text-sm">
                        <span>{course.instructor.experience} experience</span>
                        <span>{course.instructor.students.toLocaleString()} students</span>
                        <span>⭐ {course.instructor.rating} rating</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                    <Image 
                      src={course.image} 
                      alt={course.title}
                      width={400}
                      height={225}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-primary">৳{course.price}</span>
                      <span className="text-lg text-muted-foreground line-through">৳{course.oldPrice}</span>
                      <Badge variant="secondary">{course.discount}</Badge>
                    </div>
                  </div>

                  <Button 
                    onClick={handleEnroll}
                    disabled={isEnrolled}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                  >
                    {isEnrolled ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Enrolled
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <PlayCircle className="w-5 h-5" />
                        Enroll Now
                      </div>
                    )}
                  </Button>

                  <div className="mt-6 space-y-3">
                    <h4 className="font-semibold">This course includes:</h4>
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>Language: {course.language}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Last updated: {course.lastUpdated}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>Certificate included</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
          <div className="space-y-4">
            {course.curriculum.map((section, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{section.title}</h3>
                      <p className="text-muted-foreground">
                        {section.lessons} lessons • {section.duration}
                      </p>
                    </div>
                    <PlayCircle className="w-6 h-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}