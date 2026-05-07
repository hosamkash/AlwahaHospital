import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Shield, Users } from "lucide-react"

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-green-800 via-green-600 to-teal-500"
    >
      {/* Hospital building image overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent">
        <img
          src="/images/emergency-care.jpg"
          alt="مبنى مستشفى الواحة التخصصي - خدمة الطوارئ"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">Al-Waha Hospital</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-green-100 mb-4">مستشفى الواحة التخصصي</h2>
            <p className="text-xl text-green-50 mb-8 leading-relaxed">
              نقدم أفضل الخدمات الطبية والرعاية الصحية المتخصصة بأحدث التقنيات الطبية
              <br />
              وفريق من أمهر الأطباء والاختصاصيين في محافظة الغربية
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
              احجز موعد الآن
              <ArrowLeft className="mr-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-4"
            >
              تعرف على خدماتنا
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">+15,000</h3>
              <p className="text-green-100">مريض سعيد</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">+40</h3>
              <p className="text-green-100">طبيب متخصص</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">20+</h3>
              <p className="text-green-100">سنة من الخبرة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
