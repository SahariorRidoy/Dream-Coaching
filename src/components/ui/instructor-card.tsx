import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Mail, Phone, Edit, Trash2, GraduationCap, Award } from "lucide-react"

interface InstructorCardProps {
  instructor: {
    id: string
    title: string
    description: {
      first: string
      Education?: string
      Email?: string
      Mobile?: string
    }
    experience: number
    is_active: boolean
  }
  onViewDetails: (id: string) => void
  onDelete: (id: string) => void
  index: number
}

export function InstructorCard({ instructor, onViewDetails, onDelete, index }: InstructorCardProps) {
  return (
    <Card 
      className="group bg-gradient-to-br from-card via-card to-card/80 border hover:shadow-xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 animate-fade-in overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-secondary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="p-6 relative">
        {/* Header with Avatar and Status */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                  <Users className="w-7 h-7 text-primary" />
                </div>
              </div>
              {instructor.experience >= 5 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <Award className="w-3 h-3 text-accent-foreground" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                {instructor.description?.first || 'No Name'}
              </h3>
              <p className="text-sm font-medium text-primary/80 truncate">{instructor.title}</p>
            </div>
          </div>
          <Badge 
            variant={instructor.is_active ? "default" : "secondary"}
            className={`text-xs font-medium ${instructor.is_active ? 'bg-secondary/10 text-secondary border-secondary/20' : ''}`}
          >
            {instructor.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>

        {/* Professional Info */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-4 h-4 text-secondary" />
            </div>
            <span className="text-muted-foreground truncate">
              {instructor.description?.Education || 'Education not specified'}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="text-muted-foreground">
              {instructor.experience} years of teaching experience
            </span>
          </div>
        </div>

        {/* Contact Preview */}
        <div className="space-y-2 mb-5 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 text-xs">
            <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span className="text-muted-foreground truncate">
              {instructor.description?.Email || 'Email not provided'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Phone className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
            <span className="text-muted-foreground truncate">
              {instructor.description?.Mobile || 'Phone not provided'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(instructor.id)}
            className="flex-1 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 group-hover:shadow-md"
          >
            <Edit className="w-4 h-4 mr-2" />
            Manage
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(instructor.id)}
            className="px-3 border-destructive/20 hover:border-destructive hover:bg-destructive/5 hover:text-destructive transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}