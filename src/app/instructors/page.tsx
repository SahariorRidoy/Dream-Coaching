import InstructorCard from "@/components/instructor/InstructorCard";

interface Instructor {
  name: string
  subject: string
  subjectColor: string
  subjectIcon: string
  title: string
  institution: string
  image: string
  youtube: string
  facebook: string
}

const instructors: Instructor[] = [
  {
    name: "Ariana Islam",
    subject: "Physics",
    subjectColor: "bg-blue-100",
    subjectIcon: "/icons/physics.svg",
    title: "Lead Physics Instructor",
    institution: "CSE, AUST",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Hasan Anam",
    subject: "Chemistry",
    subjectColor: "bg-blue-100",
    subjectIcon: "/icons/chemistry.svg",
    title: "Founder, Anam Chemistry Academy",
    institution: "",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=600&auto=format&fit=crop",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Fahad Hossain Shovon",
    subject: "Higher Math",
    subjectColor: "bg-blue-100",
    subjectIcon: "/icons/math.svg",
    title: "Founder, Mathletes",
    institution: "Mathematics, University of Chittagong",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=601&auto=format&fit=crop",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Nadia Rehman",
    subject: "Biology",
    subjectColor: "bg-blue-100",
    subjectIcon: "/icons/physics.svg",
    title: "Senior Biology Instructor",
    institution: "DU Biology Department",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=600&auto=format&fit=crop",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Arif Chowdhury",
    subject: "English",
    subjectColor: "bg-blue-100",
    subjectIcon: "/icons/chemistry.svg",
    title: "Academic English Coach",
    institution: "BRAC University",
    image: "https://images.unsplash.com/photo-1557296387-5358ad7997bb?q=80&w=600&auto=format&fit=crop",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Raisa Karim",
    subject: "ICT",
    subjectColor: "bg-blue-100",
    subjectIcon: "/icons/math.svg",
    title: "Full‑Stack Mentor",
    institution: "IUT",
    image: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=600&auto=format&fit=crop",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Tanvir Ahmed",
    subject: "Bangla",
    subjectColor: "bg-blue-100",
    subjectIcon: "/icons/physics.svg",
    title: "Literature Specialist",
    institution: "JU Bangla Dept.",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=602&auto=format&fit=crop",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Sumaiya Rahman",
    subject: "Economics",
    subjectColor: "bg-blue-100",
    subjectIcon: "/icons/chemistry.svg",
    title: "Senior Lecturer",
    institution: "NSU",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=601&auto=format&fit=crop",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Mahfuz Riad",
    subject: "Geography",
    subjectColor: "bg-blue-100",
    subjectIcon: "/icons/math.svg",
    title: "Field Research Mentor",
    institution: "RU",
    image: "https://images.unsplash.com/photo-1557296387-5358ad7997bb?q=80&w=601&auto=format&fit=crop",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
  },
];

export default function InstructorsPage(): JSX.Element {
  return (
    <div className="relative min-h-screen pb-16 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-secondary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-md mb-4 animate-fade-in">
            Dream Coaching Faculty
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-sm animate-fade-in" style={{animationDelay: '100ms'}}>
            Our Expert Instructors
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 animate-fade-in" style={{animationDelay: '150ms'}}>
            Learn from top-tier educators with real classroom experience and a passion for teaching.
          </p>
        </div>

        {/* Instructors Grid */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {instructors.map((inst, idx) => (
            <div key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
              <InstructorCard {...inst} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
