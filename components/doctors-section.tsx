import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const doctors = [
  {
    name: "د. أحمد محمد",
    specialty: "استشاري أمراض القلب",
    experience: "15 سنة خبرة",
    education: "دكتوراه من جامعة هارفارد",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "د. فاطمة علي",
    specialty: "استشارية طب الأطفال",
    experience: "12 سنة خبرة",
    education: "دكتوراه من جامعة أكسفورد",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "د. محمد حسن",
    specialty: "استشاري جراحة العظام",
    experience: "18 سنة خبرة",
    education: "دكتوراه من جامعة جونز هوبكنز",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "د. سارة أحمد",
    specialty: "استشارية طب العيون",
    experience: "10 سنوات خبرة",
    education: "دكتوراه من جامعة كامبريدج",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function DoctorsSection() {
  return (
    <section id="doctors" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">فريقنا الطبي</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نفتخر بفريق من أمهر الأطباء والاستشاريين المتخصصين من أفضل الجامعات العالمية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold">4.9</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{doctor.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{doctor.specialty}</p>
                <p className="text-gray-600 text-sm mb-1">{doctor.experience}</p>
                <p className="text-gray-500 text-sm">{doctor.education}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">هل تريد التعرف على المزيد من أطبائنا؟</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            عرض جميع الأطباء
          </button>
        </div>
      </div>
    </section>
  )
}
