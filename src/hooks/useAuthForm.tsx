"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"

export function useAuthForm() {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { clearError } = useAuth()

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear field error when user starts typing
    if ((errors as any)[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }))
    }

    // Clear auth context error
    clearError()
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    return Boolean(password && password.length >= 6)
  }

  const validatePhoneNumber = (phone?: string): boolean => {
    if (!phone) return true // Optional field
    const phoneRegex = /^01[3-9]\d{8}$/
    return phoneRegex.test(phone)
  }

  const validateField = (field: string, value: any, rules: any = {}): string | null => {
    if (rules.required && !value) {
      return `${field.replace("_", " ")} is required`
    }

    if (field === "email" && value && !validateEmail(value)) {
      return "Please enter a valid email address"
    }

    if (field === "password" && value && !validatePassword(value)) {
      return "Password must be at least 6 characters long"
    }

    if (field === "phone_number" && value && !validatePhoneNumber(value)) {
      return "Please enter a valid Bangladeshi phone number"
    }

    if (rules.minLength && value && value.length < rules.minLength) {
      return `${field.replace("_", " ")} must be at least ${rules.minLength} characters long`
    }

    if (rules.pattern && value && !rules.pattern.test(value)) {
      return rules.message || `${field.replace("_", " ")} format is invalid`
    }

    return null
  }

  const validateForm = (fields: string[], rules: any = {}): boolean => {
    const newErrors: Record<string, string> = {}

    fields.forEach((field) => {
      const error = validateField(field, (formData as any)[field], rules[field])
      if (error) {
        (newErrors as any)[field] = error
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (onSubmit: (data: any) => Promise<void>, fields: string[], rules: any = {}): Promise<boolean> => {
    if (!validateForm(fields, rules)) {
      return false
    }

    setIsSubmitting(true)

    try {
      await onSubmit(formData)
      return true
    } catch {
      // Error is handled by auth context
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({})
    setErrors({})
    setIsSubmitting(false)
  }

  return {
    formData,
    errors,
    isSubmitting,
    updateField,
    validateForm,
    handleSubmit,
    resetForm,
  }
}
