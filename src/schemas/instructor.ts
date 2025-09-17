import { z } from 'zod'

export const instructorSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.object({
    first: z.string().min(1, 'Name is required'),
    Education: z.string().optional(),
    Facebook: z.string().optional(),
    Youtube: z.string().optional()
  }),
  experience: z.string().min(1, 'Experience is required')
})

export type InstructorFormData = z.infer<typeof instructorSchema>