import RegisterForm from "@/components/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className= "mb-6 text-center">REGISTRO</h1>
        <RegisterForm />
      </div>
    </div>
  )
}

