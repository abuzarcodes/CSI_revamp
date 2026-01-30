import * as React from "react"
import { cn } from "@/lib/utils"

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const Toaster = () => {
  // Simple implementation - in a real app you'd use a proper toast library
  return null
}

export { Toaster, ToastProvider }