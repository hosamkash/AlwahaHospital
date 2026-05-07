import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  Stethoscope,
  Activity,
  Pill,
  Microscope,
  Ambulance,
  UserCheck,
  Zap,
} from "lucide-react"

const services = [
  {
    icon: Heart,
    title: "أمراض القلب",
    description: "تشخيص وعلاج جميع أمراض القلب والأوعية الدموية بأحدث التقنيات",
    color: "text-red-500",
  },
  {
    icon: Brain,
    title: "الأمراض العصبية",
    description: "علاج أمراض الجهاز العصبي والدماغ والحبل الشوكي",
    color: "text-purple-500",
  },
  {
    icon: Bone,
    title: "العظام والمفاصل",
    description: "جراحة العظام وعلاج إصابات المفاصل والعمود الفقري",
    color: "text-orange-500",
  },
  {
    icon: Eye,
    title: "طب العيون",
    description: "فحص وعلاج جميع أمراض العيون وجراحات الليزر",
    color: "text-blue-500",
  },
  {
    icon: Baby,
    title: "طب الأطفال",
    description: "رعاية صحية شاملة للأطفال من الولادة حتى المراهقة",
    color: "text-pink-500",
  },
  {
    icon: UserCheck,
    title: "الطب الباطني",
    description: "تشخيص وعلاج الأمراض الباطنية والمزمنة",
    color: "text-green-500",
  },
  {
    icon: Activity,
    title: "العناية المركزة",
    description: "وحدة عناية مركزة مجهزة بأحدث الأجهزة الطبية",
    color: "text-yellow-500",
  },
  {
    icon: Microscope,
    title: "المختبرات",
    description: "مختبرات طبية متطورة لجميع أنواع التحاليل والفحوصات",
    color: "text-indigo-500",
  },
  {
    icon: Zap,
    title: "الأشعة التشخيصية",
    description: "أحدث أجهزة الأشعة والتصوير الطبي المتطور",
    color: "text-cyan-500",
  },
  {
    icon: Pill,
    title: "الصيدلية",
    description: "صيدلية شاملة تضم جميع الأدوية والمستلزمات الطبية",
    color: "text-teal-500",
  },
  {
    icon: Ambulance,
    title: "الطوارئ",
    description: "خدمة طوارئ على مدار 24 ساعة مع فريق طبي متخصص",
    color: "text-red-600",
  },
  {
    icon: Stethoscope,
    title: "الفحص الشامل",
    description: "برامج فحص شاملة للكشف المبكر عن الأمراض",
    color: "text-emerald-500",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">خدماتنا الطبية</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات الطبية المتخصصة بأعلى معايير الجودة والرعاية
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img src="/images/home-care.jpg" alt="خدمة الرعاية المنزلية" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-green-600/80 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">الرعاية المنزلية</h3>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img src="/images/operating-room.jpg" alt="غرفة العمليات" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-blue-600/80 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">غرف العمليات المتطورة</h3>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img src="/images/emergency-24h.jpg" alt="خدمة الطوارئ 24 ساعة" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">طوارئ 24 ساعة</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
                    <IconComponent className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-800">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
