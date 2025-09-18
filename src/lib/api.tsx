// API utility functions for authentication endpoints

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

interface ApiErrorData {
  message?: string
  [key: string]: any
}

class ApiError extends Error {
  public status: number
  public data: ApiErrorData | null

  constructor(message: string, status: number, data: ApiErrorData | null) {
    super(message)
    this.status = status
    this.data = data
  }
}

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>
}

async function apiRequest(endpoint: string, options: RequestOptions = {}): Promise<any> {
  const url = `${BASE_URL}${endpoint}`
  const config = {
    headers: {
      ...(!(options.body instanceof FormData) && { "Content-Type": "application/json" }),
      ...options.headers,
    },
    ...options,
  }

  // Add auth token if available
  const token = localStorage.getItem("access_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      // Handle token expiration
      if (response.status === 401 && endpoint !== "/auth/login/refresh/") {
        const refreshed = await refreshToken()
        if (refreshed) {
          // Retry with new token
          config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`
          const retryResponse = await fetch(url, config)
          const retryData = await retryResponse.json()
          if (!retryResponse.ok) {
            throw new ApiError(retryData.message || "An error occurred", retryResponse.status, retryData)
          }
          return retryData
        }
      }
      // Silently handle server errors for instructor endpoints
      if (endpoint.includes('/instructors/') && response.status >= 500) {
        throw new ApiError("Server unavailable", response.status, data)
      }
      throw new ApiError(data.message || "An error occurred", response.status, data)
    }

    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError("Network error occurred", 0, null)
  }
}

async function refreshToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem("refresh_token")
  if (!refreshToken) return false

  try {
    const response = await fetch(`${BASE_URL}/auth/login/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem("access_token", data.access)
      return true
    } else {
      // Refresh token expired, logout user
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      window.location.href = "/login"
      return false
    }
  } catch {
    return false
  }
}

// Authentication API functions
export const authApi = {
  register: (phone_number: string, password: string) =>
    apiRequest("/auth/register/", {
      method: "POST",
      body: JSON.stringify({ phone_number, password }),
    }),

  verifyOtp: (phone_number: string, otp: string) =>
    apiRequest("/auth/verify-otp/", {
      method: "POST",
      body: JSON.stringify({ phone_number, otp }),
    }),

  login: (phone_number: string, password: string) =>
    apiRequest("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ phone_number, password }),
    }),

  refresh: async (refreshToken: string) => {
    const response = await apiRequest("/auth/login/refresh/", {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
    })
    // Update stored access token
    if (response.access) {
      localStorage.setItem("access_token", response.access)
    }
    return response
  },

  changePassword: (oldPassword: string, newPassword: string) =>
    apiRequest("/auth/change-password/", {
      method: "POST",
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    }),

  forgetPassword: (phone_number: string) =>
    apiRequest("/auth/forget-password/", {
      method: "POST",
      body: JSON.stringify({ phone_number }),
    }),

  resetPassword: (phone_number: string, otp: string, newPassword: string) =>
    apiRequest("/auth/reset-password/", {
      method: "POST",
      body: JSON.stringify({
        phone_number,
        otp,
        new_password: newPassword,
      }),
    }),

  getProfile: () =>
    apiRequest("/auth/profile/", {
      method: "GET",
    }),

  // Initial profile setup for new users (includes user_type: "student")
  completeProfile: (profileData: any, profileImage?: File | null) => {
    const dataWithUserType = { ...profileData, user_type: "student" }
    
    if (profileImage) {
      const formData = new FormData()
      Object.keys(dataWithUserType).forEach(key => {
        formData.append(key, dataWithUserType[key])
      })
      formData.append('profile_image', profileImage)
      
      return apiRequest("/auth/profile/", {
        method: "PATCH",
        body: formData,
      })
    } else {
      return apiRequest("/auth/profile/", {
        method: "PATCH",
        body: JSON.stringify(dataWithUserType),
      })
    }
  },

  // Dashboard profile updates (does NOT modify user_type)
  updateProfile: (profileData: any, profileImage?: File | null) => {
    if (profileImage) {
      const formData = new FormData()
      Object.keys(profileData).forEach(key => {
        formData.append(key, profileData[key])
      })
      formData.append('profile_image', profileImage)
      
      return apiRequest("/auth/profile/", {
        method: "PATCH",
        body: formData,
      })
    } else {
      return apiRequest("/auth/profile/", {
        method: "PATCH",
        body: JSON.stringify(profileData),
      })
    }
  },
}

// Instructor API functions
export const instructorApi = {
  getSingleInstructor: (id: string) =>
    apiRequest(`/api/instructors/info/${id}/`, {
      method: "GET",
    }),
  addInstructor: (instructorData: {
    title: string
    description: {
      first: string
      Education?: string
      Facebook?: string
      Youtube?: string
    }
    experience: string
  }) =>
    apiRequest("/api/instructors/info/", {
      method: "POST",
      body: JSON.stringify(instructorData),
    }),

  getInstructors: () =>
    apiRequest("/api/instructors/info/", {
      method: "GET",
    }),

  updateInstructor: (id: string, instructorData: any) =>
    apiRequest(`/api/instructors/info/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(instructorData),
    }),

  deleteInstructor: (id: string) =>
    apiRequest(`/api/instructors/${id}/`, {
      method: "DELETE",
    }),
}

// Course API functions
export const courseApi = {
  getCourses: () =>
    apiRequest("/api/courses/", {
      method: "GET",
    }),

  getSingleCourse: (id: string) =>
    apiRequest(`/api/courses/${id}/`, {
      method: "GET",
    }),

  createCourse: async (courseData: {
    name: string
    short_description: string
    description: string
    duration: string
    instructor_list: string[]
    image?: File | null
    is_completed?: boolean
  }) => {
    // Create course with JSON first
    const payload = {
      name: courseData.name,
      short_description: courseData.short_description,
      description: courseData.description,
      duration: parseInt(courseData.duration) || 0,
      instructor_list: courseData.instructor_list,
      is_completed: courseData.is_completed || false
    }
    
    const course = await apiRequest("/api/courses/", {
      method: "POST",
      body: JSON.stringify(payload),
    })
    
    // If image exists, upload it separately
    if (courseData.image && course.id) {
      const formData = new FormData()
      formData.append('image', courseData.image)
      
      await apiRequest(`/api/courses/${course.id}/`, {
        method: "PATCH",
        body: formData,
      })
    }
    
    return course
  },

  updateCourse: async (id: string, courseData: {
    name?: string
    short_description?: string
    description?: string
    duration?: string
    instructor_list?: string[]
    image?: File | null
    is_completed?: boolean
  }) => {
    if (courseData.image) {
      // Update with image using FormData
      const formData = new FormData()
      
      // Add JSON data fields if provided
      if (courseData.name) formData.append('name', courseData.name)
      if (courseData.short_description) formData.append('short_description', courseData.short_description)
      if (courseData.description) formData.append('description', courseData.description)
      if (courseData.duration) formData.append('duration', courseData.duration)
      if (courseData.is_completed !== undefined) formData.append('is_completed', courseData.is_completed.toString())
      if (courseData.instructor_list) {
        courseData.instructor_list.forEach((instructor, index) => {
          formData.append(`instructor_list[${index}]`, instructor)
        })
      }
      
      formData.append('image', courseData.image)
      
      return apiRequest(`/api/courses/${id}/`, {
        method: "PATCH",
        body: formData,
      })
    } else {
      // Update without image using JSON
      const payload: any = {}
      if (courseData.name) payload.name = courseData.name
      if (courseData.short_description) payload.short_description = courseData.short_description
      if (courseData.description) payload.description = courseData.description
      if (courseData.duration) payload.duration = parseInt(courseData.duration)
      if (courseData.instructor_list) payload.instructor_list = courseData.instructor_list
      if (courseData.is_completed !== undefined) payload.is_completed = courseData.is_completed
      
      return apiRequest(`/api/courses/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      })
    }
  },

  deleteCourse: (id: string) =>
    apiRequest(`/api/courses/${id}/`, {
      method: "DELETE",
    }),
}

export { ApiError }
