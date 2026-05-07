import { Card, CardContent } from "@/components/ui/card"
import { Award, Shield } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">عن مستشفى الواحة التخصصي</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            مستشفى الواحة التخصصي هو صرح طبي متميز في محافظة الغربية يقدم أفضل الخدمات الصحية بأحدث التقنيات الطبية
            وفريق من أمهر الأطباء المتخصصين في جميع المجالات الطبية
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="/images/home-care.jpg?height=500&width=600"
              alt="مبنى مستشفى الواحة التخصصي من الخارج"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D9%84%D9%88%D8%AC%D9%88%202.jpg-TAiYObEVLPcn1RKfN7dTtTl8fgE76X.jpeg"
                alt="لوجو مستشفى الواحة التخصصي"
                className="w-16 h-16 object-contain"
              />
              <h3 className="text-3xl font-bold text-gray-800 font-serif">رؤيتنا ورسالتنا</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              نسعى لأن نكون المرجع الأول في تقديم الرعاية الصحية المتميزة في محافظة الغربية ومدينة سمنود، من خلال
              الاستثمار في أحدث التقنيات الطبية وتطوير قدرات فريقنا الطبي المتخصص.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              رسالتنا هي تقديم رعاية صحية شاملة ومتميزة تركز على المريض وتلبي احتياجاته بأعلى معايير الجودة والأمان
              الطبي، مع التعاقد مع أهم الجهات والمؤسسات لخدمة أفضل.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-green-600" />
                <span className="text-gray-700">معتمد دولياً</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-600" />
                <span className="text-gray-700">أعلى معايير الأمان</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-red-50 flex items-center justify-center">
                <img src="/images/emergency-care.jpg?height=64&width=64" alt="رعاية شاملة" className="w-12 h-12 object-contain" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">رعاية شاملة</h4>
              <p className="text-gray-600">نقدم رعاية طبية شاملة لجميع أفراد العائلة</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-blue-50 flex items-center justify-center">
                <img src="/placeholder.svg?height=64&width=64" alt="فريق متخصص" className="w-12 h-12 object-contain" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">فريق متخصص</h4>
              <p className="text-gray-600">أطباء واستشاريون من أفضل الجامعات العالمية</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-green-50 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="تقنيات حديثة"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">تقنيات حديثة</h4>
              <p className="text-gray-600">أحدث الأجهزة والتقنيات الطبية المتطورة</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden bg-yellow-50 flex items-center justify-center">
                <img src="/placeholder.svg?height=64&width=64" alt="جودة معتمدة" className="w-12 h-12 object-contain" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">جودة معتمدة</h4>
              <p className="text-gray-600">حاصلون على شهادات الجودة الدولية</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
