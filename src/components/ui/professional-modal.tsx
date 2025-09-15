import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ReactNode } from "react"

interface ProfessionalModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

export function ProfessionalModal({ isOpen, onClose, title, children, className }: ProfessionalModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <Card className={`w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl border-0 ${className}`}>
        <CardHeader className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 max-h-[calc(90vh-80px)] overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}