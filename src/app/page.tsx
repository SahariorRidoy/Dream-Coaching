import HeroSection from "@/components/landingPage/HeroSection";
import StatsCards from "@/components/landingPage/StatsCard";
import LearningPaths from "@/components/landingPage/LearningPaths";
import StudentReviews from "@/components/landingPage/StudentReviews";
import FeaturedSection from "@/components/landingPage/FeaturedSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <StatsCards />
      <LearningPaths />
      <StudentReviews />
    </>
  );
}
