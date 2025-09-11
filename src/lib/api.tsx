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

  console.log('=== API REQUEST ===');
  console.log('URL:', url);
  console.log('Method:', options.method || 'GET');
  console.log('Headers:', config.headers);
  console.log('Body:', options.body);
  console.log('Token:', token ? 'Present' : 'Missing');
  console.log('==================');

  try {
    const response = await fetch(url, config)
    
    console.log('=== API RESPONSE ===');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('Headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json()
    console.log('Response Data:', data);
    console.log('===================');

    if (!response.ok) {
      throw new ApiError(data.message || "An error occurred", response.status, data)
    }

    return data
  } catch (error) {
    console.error('=== API ERROR ===');
    console.error('Error:', error);
    console.error('=================');
    
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError("Network error occurred", 0, null)
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

  refresh: (refreshToken: string) =>
    apiRequest("/auth/refresh/", {
      method: "POST",
      body: JSON.stringify({ refresh: refreshToken }),
    }),

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

  updateProfile: (profileData: any, profileImage?: File | null) => {
    if (profileImage) {
      // Use FormData for image upload
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
      // Use JSON for data only
      return apiRequest("/auth/profile/", {
        method: "PATCH",
        body: JSON.stringify(profileData),
      })
    }
  },
}

export { ApiError }
