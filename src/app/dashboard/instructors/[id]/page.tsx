"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  Phone, 
  GraduationCap,
  Calendar,
  User,
  Award,
  Facebook,
  Youtube,

  Loader2,
  Save,
  BookOpen,
  Users,
  Star
} from "lucide-react"
import { instructorApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { instructorSchema } from "@/schemas/instructor"
import { ProfessionalModal } from "@/components/ui/professional-modal"

interface Instructor {
  id: string
  user: string
  title: string
  description: {
    first: string
    Education?: string
    Email?: string
    Mobile?: string
    Facebook?: string
    Youtube?: string
  }
  experience: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export default function InstructorDetailsPage() {
  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()
  const [instructor, setInstructor] = useState<Instructor | null>(null)
  const [loading, setLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    first: "",
    education: "",
    facebook: "",
    youtube: "",
    experience: ""
  })

  useEffect(() => {
    if (params.id) {
      fetchInstructor(params.id as string)
    }
  }, [params.id])

  const fetchInstructor = async (id: string) => {
    try {
      const data = await instructorApi.getSingleInstructor(id)
      setInstructor(data)
      setFormData({
        title: data.title || "",
        first: data.description?.first || "",
        education: data.description?.Education || "",
        facebook: data.description?.Facebook || "",
        youtube: data.description?.Youtube || "",
        experience: data.experience?.toString() || ""
      })
    } catch (error) {
      console.error('Error fetching instructor:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        title: formData.title,
        description: {
          first: formData.first,
          Education: formData.education,
          Facebook: formData.facebook,
          Youtube: formData.youtube
        },
        experience: formData.experience
      }

      // Validate payload
      const validatedData = instructorSchema.parse(payload)
      await instructorApi.updateInstructor(params.id as string, validatedData)
      toast({
        title: "Success!",
        description: "Instructor updated successfully.",
      })
      setShowEditModal(false)
      fetchInstructor(params.id as string)
    } catch (error: any) {
      console.error("Error updating instructor:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update instructor",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading instructor details...</p>
        </div>
      </div>
    )
  }

  if (!instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Instructor Not Found</h2>
          <p className="text-muted-foreground mb-4">The instructor you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Professional Header */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => router.back()}
              className="hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Faculty
            </Button>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary p-1">
              <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {instructor.description?.first || 'Instructor Profile'}
              </h1>
              <p className="text-lg text-primary font-semibold">{instructor.title}</p>
              <p className="text-muted-foreground">Faculty Member • Dream Coaching Center</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Professional Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-gradient-to-br from-card via-card to-muted/10 border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="relative mx-auto mb-6">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-secondary p-1">
                      <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                        <User className="w-16 h-16 text-primary" />
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-accent-foreground" />
                    </div>
                  </div>
                  
                  <Badge 
                    variant={instructor.is_active ? "default" : "secondary"}
                    className={`${instructor.is_active ? 'bg-secondary/10 text-secondary border-secondary/20' : ''} text-sm px-4 py-2 mb-6`}
                  >
                    {instructor.is_active ? "Active Faculty" : "Inactive"}
                  </Badge>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-4 bg-primary/5 rounded-xl">
                    <div className="text-2xl font-bold text-primary">{instructor.experience}</div>
                    <div className="text-xs text-muted-foreground font-medium">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-secondary/5 rounded-xl">
                    <div className="text-2xl font-bold text-secondary">4.8</div>
                    <div className="text-xs text-muted-foreground font-medium">Rating</div>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowEditModal(true)}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Courses
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Student List
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Star className="w-4 h-4 mr-2" />
                    Performance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Mail className="w-5 h-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {instructor.description?.Email && (
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{instructor.description.Email}</p>
                      </div>
                    </div>
                  )}
                  {instructor.description?.Mobile && (
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <Phone className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Mobile</p>
                        <p className="font-medium">{instructor.description.Mobile}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                  Education & Social Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {instructor.description?.Education && (
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Education</p>
                      <p className="font-medium">{instructor.description.Education}</p>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {instructor.description?.Facebook && (
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Facebook</p>
                        <a href={instructor.description.Facebook} target="_blank" rel="noopener noreferrer" 
                           className="font-medium text-blue-600 hover:underline truncate block">
                          View Profile
                        </a>
                      </div>
                    </div>
                  )}
                  {instructor.description?.Youtube && (
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <Youtube className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">YouTube</p>
                        <a href={instructor.description.Youtube} target="_blank" rel="noopener noreferrer" 
                           className="font-medium text-red-600 hover:underline truncate block">
                          View Channel
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Calendar className="w-5 h-5 text-accent" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-medium">{new Date(instructor.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{new Date(instructor.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <ProfessionalModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Update Faculty Information"
        >
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Title/Subject *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => updateField("title", e.target.value)}
                        placeholder="e.g., ICT Teacher"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Experience (years) *</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={formData.experience}
                        onChange={(e) => updateField("experience", e.target.value)}
                        placeholder="e.g., 3"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="first">Name *</Label>
                    <Input
                      id="first"
                      value={formData.first}
                      onChange={(e) => updateField("first", e.target.value)}
                      placeholder="e.g., Ridoy"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="education">Education *</Label>
                    <Input
                      id="education"
                      value={formData.education}
                      onChange={(e) => updateField("education", e.target.value)}
                      placeholder="e.g., BUBT"
                      required
                      disabled={isSubmitting}
                    />
                  </div>



                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="facebook">Facebook URL</Label>
                      <Input
                        id="facebook"
                        value={formData.facebook}
                        onChange={(e) => updateField("facebook", e.target.value)}
                        placeholder="www.facebook.com/profile"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtube">YouTube URL</Label>
                      <Input
                        id="youtube"
                        value={formData.youtube}
                        onChange={(e) => updateField("youtube", e.target.value)}
                        placeholder="youtube.com/channel"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowEditModal(false)}
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Update Instructor
                        </>
                      )}
                    </Button>
                  </div>
                </form>
        </ProfessionalModal>
      </div>
    </div>
  )
}