"use client"

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react"
import { authApi } from "@/lib/api"

interface User {
  id?: string
  email?: string
  first_name?: string
  last_name?: string
  full_name?: string
  phone_number?: string
  role?: string
  user_type?: string
  profile_image?: string
  gender?: string
  birth_date?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

interface AuthContextType extends AuthState {
  register: (phone_number: string, password: string) => Promise<any>
  verifyOtp: (phone_number: string, otp: string) => Promise<any>
  login: (phone_number: string, password: string) => Promise<any>
  logout: () => void
  changePassword: (oldPassword: string, newPassword: string) => Promise<any>
  forgetPassword: (phone_number: string) => Promise<any>
  resetPassword: (phone_number: string, otp: string, newPassword: string) => Promise<any>
  completeProfile: (profileData: any, profileImage?: File | null) => Promise<any>
  updateProfile: (profileData: any, profileImage?: File | null) => Promise<any>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth reducer for state management
const authReducer = (state: AuthState, action: any): AuthState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
      }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "CLEAR_ERROR":
      return { ...state, error: null }
    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  


  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Ensure we're on the client side
      if (typeof window === 'undefined') {
        dispatch({ type: "SET_LOADING", payload: false })
        return
      }
      
      const token = localStorage.getItem("access_token")
      const refreshToken = localStorage.getItem("refresh_token")
      
      if (refreshToken) {
        try {
          // Try to refresh token first if we have one
          if (!token) {
            await authApi.refresh(refreshToken)
          }
          const profile = await authApi.getProfile()
          dispatch({ type: "SET_USER", payload: profile })
        } catch {
          // Refresh failed, clear tokens
          localStorage.removeItem("access_token")
          localStorage.removeItem("refresh_token")
          dispatch({ type: "LOGOUT" })
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    checkAuth()
  }, [])

  // Auth actions
  const register = async (phone_number: string, password: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "CLEAR_ERROR" })


      
      const response = await authApi.register(phone_number, password)
      

      
      return response
    } catch (error) {

      
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const verifyOtp = async (phone_number: string, otp: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "CLEAR_ERROR" })


      
      const response = await authApi.verifyOtp(phone_number, otp)
      


      // Extract tokens from nested tokens object
      const accessToken = response.tokens?.access
      const refreshToken = response.tokens?.refresh
      
      if (typeof window !== 'undefined') {
        if (accessToken) {
          localStorage.setItem("access_token", accessToken)
        }
        
        if (refreshToken) {
          localStorage.setItem("refresh_token", refreshToken)
        }
      }
      
      // Set user as authenticated with basic info
      const basicUser = {
        phone_number: phone_number,
        is_verified: true
      }
      dispatch({ type: "SET_USER", payload: basicUser })


      return response
    } catch (error) {

      
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const login = async (phone_number: string, password: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "CLEAR_ERROR" })

      const response = await authApi.login(phone_number, password)

      if (typeof window !== 'undefined') {
        localStorage.setItem("access_token", response.access)
        localStorage.setItem("refresh_token", response.refresh)
      }

      // Get user profile
      const profile = await authApi.getProfile()
      dispatch({ type: "SET_USER", payload: profile })

      return response
    } catch (error: any) {
      let errorMessage = 'An error occurred'
      if (error?.status === 400) {
        errorMessage = 'Invalid phone number or password'
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      throw error
    }
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
    }
    dispatch({ type: "LOGOUT" })
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "CLEAR_ERROR" })

      const response = await authApi.changePassword(oldPassword, newPassword)
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const forgetPassword = async (phone_number: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "CLEAR_ERROR" })

      const response = await authApi.forgetPassword(phone_number)
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const resetPassword = async (phone_number: string, otp: string, newPassword: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "CLEAR_ERROR" })

      const response = await authApi.resetPassword(phone_number, otp, newPassword)
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const completeProfile = async (profileData: any, profileImage?: File | null) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "CLEAR_ERROR" })
      
      const response = await authApi.completeProfile(profileData, profileImage)
      dispatch({ type: "SET_USER", payload: response })
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const updateProfile = async (profileData: any, profileImage?: File | null) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "CLEAR_ERROR" })
      
      const response = await authApi.updateProfile(profileData, profileImage)
      dispatch({ type: "SET_USER", payload: response })
      return response
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      dispatch({ type: "SET_ERROR", payload: errorMessage })
      throw error
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" })
  }

  const value = {
    ...state,
    register,
    verifyOtp,
    login,
    logout,
    changePassword,
    forgetPassword,
    resetPassword,
    completeProfile,
    updateProfile,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
