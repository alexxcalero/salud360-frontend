import { useEffect } from "react"
import SuccessRegisterForm from "@/components/SuccessRegisterForm"

export default function SuccessRegisterPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      < SuccessRegisterForm/>        
    </div>
  )
}