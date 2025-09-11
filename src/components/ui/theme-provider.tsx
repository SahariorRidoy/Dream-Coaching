"use client"

import { ReactNode } from "react"

interface ThemeProviderProps {
  children: ReactNode
  [key: string]: any
}

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <div {...props}>{children}</div>
}

export { ThemeProvider }
