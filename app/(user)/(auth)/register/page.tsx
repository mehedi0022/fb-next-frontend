import { Container, RegisterForm } from "@/components/home";

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-12">
      <Container>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              রিসেলার রেজিস্ট্রেশন
            </h1>
            <p className="text-gray-600">
              আপনার তথ্য দিয়ে রেজিস্টার করুন
            </p>
          </div>

          {/* Form */}
          <RegisterForm />

        </div>
      </Container>
    </div>
  );
}