import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, MapPin, Clock, Mail, Building2 } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">اتصل بنا</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نحن هنا لخدمتك على مدار الساعة. تواصل معنا لحجز موعد أو للاستفسار عن خدماتنا
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-8 font-serif">معلومات التواصل</h3>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">الهاتف</h4>
                      <p className="text-gray-600">+201027226410</p>
                      <p className="text-gray-600">+20402978333</p>
                      <p className="text-gray-600">+20402961333</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">العنوان</h4>
                      <p className="text-gray-600">محافظة الغربية، مدينة سمنود</p>
                      <p className="text-gray-600">شارع الممر العلوي - أمام محكمة سمنود</p>
                      <p className="text-gray-600">برج الفردوس</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">ساعات العمل</h4>
                      <p className="text-gray-600">الطوارئ: 24 ساعة</p>
                      <p className="text-gray-600">العيادات: 8 ص - 10 م</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">البريد الإلكتروني</h4>
                      <p className="text-gray-600">info@wahahospital.com</p>
                      <p className="text-gray-600">appointments@wahahospital.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Building2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">جهات التعاقد</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <p>• وادي النيل</p>
                        <p>• المصرية للاتصالات</p>
                        <p>• الأهلي للخدمات الطبية</p>
                        <p>• البنك الأهلي</p>
                        <p>• البنك الزراعي</p>
                        <p>• بنك ناصر</p>
                        <p>• نقابة المحامين</p>
                        <p>• نيكست كير</p>
                        <p>• التأمينات الاجتماعية</p>
                        <p>• كير بلس</p>
                        <p>• البريد المصري</p>
                        <p>• جمعية رجال أعمال الإسكندرية</p>
                        <p>• التأمين الصحي</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 font-serif">احجز موعد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأول</label>
                    <Input placeholder="أدخل اسمك الأول" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">اسم العائلة</label>
                    <Input placeholder="أدخل اسم العائلة" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                  <Input placeholder="أدخل رقم هاتفك" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                  <Input type="email" placeholder="أدخل بريدك الإلكتروني" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">التخصص المطلوب</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>اختر التخصص</option>
                    <option>أمراض القلب</option>
                    <option>طب الأطفال</option>
                    <option>جراحة العظام</option>
                    <option>طب العيون</option>
                    <option>الأمراض العصبية</option>
                    <option>الطب الباطني</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات إضافية</label>
                  <Textarea placeholder="أدخل أي ملاحظات أو استفسارات" rows={4} />
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">احجز الموعد الآن</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
