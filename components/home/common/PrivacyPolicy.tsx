import { Container, Title } from '@/lib/home';
import { Shield, Calendar, Mail, Globe, Lock, Eye, Users, FileText, AlertTriangle } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Title 
              subtitle="আপনার ব্যক্তিগত তথ্যের নিরাপত্তা ও গোপনীয়তা আমাদের অগ্রাধিকার"
              className="text-green-600"
            >
              গোপনীয়তা নীতি
            </Title>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            
            {/* Header Info */}
            <div className="bg-green-50 p-6 border-b">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span><strong>কার্যকর তারিখ:</strong> ০১ জুন ২০২৩</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-600" />
                  <span><strong>ডেভেলপার:</strong> Freelancer Bangladesh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span><strong>যোগাযোগ:</strong> support@freelancerbangladesh.com</span>
                </div>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="bg-blue-50 p-6 border-b">
              <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                সূচিপত্র
              </h3>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <a href="#introduction" className="text-blue-600 hover:text-blue-800 transition-colors">পরিচিতি</a>
                <a href="#section-1" className="text-blue-600 hover:text-blue-800 transition-colors">১. আমরা কী তথ্য সংগ্রহ করি</a>
                <a href="#section-2" className="text-blue-600 hover:text-blue-800 transition-colors">২. তথ্য ব্যবহারের পদ্ধতি</a>
                <a href="#section-3" className="text-blue-600 hover:text-blue-800 transition-colors">৩. তথ্য শেয়ারিং</a>
                <a href="#section-4" className="text-blue-600 hover:text-blue-800 transition-colors">৪. তথ্যের নিরাপত্তা</a>
                <a href="#section-5" className="text-blue-600 hover:text-blue-800 transition-colors">৫. তথ্য সংরক্ষণ ও মুছে ফেলা</a>
                <a href="#section-6" className="text-blue-600 hover:text-blue-800 transition-colors">৬. তৃতীয়-পক্ষ সেবা</a>
                <a href="#section-7" className="text-blue-600 hover:text-blue-800 transition-colors">৭. নীতিতে পরিবর্তন</a>
                <a href="#section-8" className="text-blue-600 hover:text-blue-800 transition-colors">৮. যোগাযোগ</a>
              </div>
            </div>

            <div className="p-8 space-y-12">

              {/* Introduction */}
              <section id="introduction">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  পরিচিতি
                </h2>
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-green-700">Freelancer Bangladesh</strong> আমাদের ব্যবহারকারীদের গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতি (Privacy Policy) ব্যাখ্যা করে আমরা কীভাবে আপনার তথ্য সংগ্রহ করি, ব্যবহার করি এবং সুরক্ষিত রাখি যখন আপনি আমাদের ওয়েবসাইট বা সংশ্লিষ্ট সেবা ব্যবহার করেন। দয়া করে আপনার ডেটা সম্পর্কিত আমাদের প্রক্রিয়াগুলি বোঝার জন্য এই নীতিটি মনোযোগ দিয়ে পড়ুন।
                  </p>
                </div>
              </section>

              {/* Section 1: তথ্য সংগ্রহ */}
              <section id="section-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-blue-600" />
                  ১. আমরা কী তথ্য সংগ্রহ করি
                </h2>
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-800 mb-2">ব্যক্তিগত তথ্য সংগ্রহ নীতি</h4>
                      <p className="text-gray-700 leading-relaxed">
                        আমরা কোনো ব্যক্তিগত বা সংবেদনশীল ব্যবহারকারীর তথ্য সংগ্রহ, অ্যাক্সেস বা শেয়ার করি না, যদি না তা এখানে স্পষ্টভাবে উল্লেখ করা হয়। ভবিষ্যতে যদি ওয়েবসাইটের কোনো আপডেটে এমন তথ্য সংগ্রহের প্রয়োজন হয়, তাহলে এই নীতিটি সেই অনুযায়ী আপডেট করা হবে।
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: তথ্য ব্যবহার */}
              <section id="section-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                  ২. আমরা আপনার তথ্য কীভাবে ব্যবহার করি
                </h2>
                <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2">বর্তমান অবস্থা</h4>
                      <p className="text-gray-700 leading-relaxed">
                        বর্তমানে এই ওয়েবসাইট কোনো ব্যক্তিগত বা সংবেদনশীল তথ্য সংগ্রহ করে না। ভবিষ্যতে যদি এটি পরিবর্তিত হয়, আমরা স্পষ্ট সম্মতির (explicit consent) প্রক্রিয়া যোগ করব এবং প্রযোজ্য সকল ডেটা সুরক্ষা আইনের সঙ্গে সামঞ্জস্য রাখব।
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: তথ্য শেয়ারিং */}
              <section id="section-3">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-orange-600" />
                  ৩. তথ্য শেয়ারিং
                </h2>
                <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">তৃতীয় পক্ষের সাথে শেয়ারিং নীতি</h4>
                      <p className="text-gray-700 leading-relaxed">
                        আমরা ব্যবহারকারীর তথ্য তৃতীয় পক্ষের সঙ্গে শেয়ার করি না। ভবিষ্যতে যদি কোনো ইন্টিগ্রেশন বা আপডেটের মাধ্যমে ডেটা শেয়ার করার প্রয়োজন হয়, তাহলে ব্যবহারকারীর সম্মতি নেওয়া হবে এবং এই নীতি আপডেট করা হবে।
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: তথ্যের নিরাপত্তা */}
              <section id="section-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-red-600" />
                  ৪. তথ্যের নিরাপত্তা
                </h2>
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">নিরাপত্তা ব্যবস্থা</h4>
                      <p className="text-gray-700 leading-relaxed">
                        আমরা আপনার ডেটা সুরক্ষায় প্রতিশ্রুতিবদ্ধ এবং শিল্প-মানের (industry-standard) নিরাপত্তা ব্যবস্থা অনুসরণ করি। বর্তমানে যেহেতু ওয়েবসাইট কোনো ব্যক্তিগত বা সংবেদনশীল তথ্য সংগ্রহ করে না, তাই অতিরিক্ত নিরাপত্তা প্রোটোকল প্রয়োজন নেই।
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: তথ্য সংরক্ষণ */}
              <section id="section-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-indigo-600" />
                  ৫. তথ্য সংরক্ষণ ও মুছে ফেলা
                </h2>
                <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-indigo-800 mb-2">ডেটা সংরক্ষণ নীতি</h4>
                      <p className="text-gray-700 leading-relaxed">
                        যেহেতু ওয়েবসাইট কোনো ব্যক্তিগত তথ্য সংগ্রহ করে না, তাই বর্তমানে কোনো ডেটা সংরক্ষণ বা মুছে ফেলার নীতি প্রযোজ্য নয়। ভবিষ্যতে যদি এটি পরিবর্তিত হয়, ব্যবহারকারীদের তাদের ডেটা অ্যাক্সেস, সংশোধন বা মুছে ফেলার জন্য স্পষ্ট বিকল্প প্রদান করা হবে।
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: তৃতীয়-পক্ষ সেবা */}
              <section id="section-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-teal-600" />
                  ৬. তৃতীয়-পক্ষ সেবা
                </h2>
                <div className="bg-teal-50 border border-teal-200 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-teal-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-teal-800 mb-2">বাহ্যিক লিঙ্ক নীতি</h4>
                      <p className="text-gray-700 leading-relaxed">
                        ওয়েবসাইটে শুধুমাত্র তথ্যের উদ্দেশ্যে বাহ্যিক ওয়েবসাইট বা সেবার লিঙ্ক থাকতে পারে। আমরা সেই তৃতীয়-পক্ষ ওয়েবসাইটগুলির গোপনীয়তা নীতির জন্য দায়ী নই এবং আপনাকে তাদের নিজস্ব নীতি পর্যালোচনা করতে উৎসাহিত করি।
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7: নীতিতে পরিবর্তন */}
              <section id="section-7">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                  ৭. এই নীতিতে পরিবর্তন
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">নীতি আপডেট প্রক্রিয়া</h4>
                      <p className="text-gray-700 leading-relaxed">
                        আমরা সময়ে সময়ে এই গোপনীয়তা নীতিতে পরিবর্তন আনতে পারি যাতে আমাদের নতুন কার্যপদ্ধতি প্রতিফলিত হয়। উল্লেখযোগ্য পরিবর্তনের ক্ষেত্রে ওয়েবসাইটের মাধ্যমে বা ই-মেইলের মাধ্যমে ব্যবহারকারীদের জানানো হবে।
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 8: যোগাযোগ */}
              <section id="section-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-green-600" />
                  ৮. আমাদের সাথে যোগাযোগ করুন
                </h2>
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    এই গোপনীয়তা নীতি সম্পর্কিত কোনো প্রশ্ন বা উদ্বেগ থাকলে আপনি আমাদের সাথে যোগাযোগ করতে পারেন:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">
                        <strong>ইমেইল:</strong> support@freelancerbangladesh.com
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">
                        <strong>ওয়েবসাইট:</strong> https://freelancerbangladesh.com
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 9: নীতির প্রাপ্যতা */}
              <section id="section-9">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-gray-600" />
                  ৯. নীতির প্রাপ্যতা
                </h2>
                <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">নীতি অ্যাক্সেস</h4>
                      <p className="text-gray-700 leading-relaxed">
                        এই গোপনীয়তা নীতি আমাদের ওয়েবসাইটের নিচের অংশে &ldquo;Privacy Policy&rdquo; মেনুতে দেখা যাবে।
                      </p>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-6 border-t text-center">
              <p className="text-sm text-gray-600 mb-2">
                সর্বশেষ আপডেট: {new Date().toLocaleDateString('bn-BD')} | 
                <span className="text-green-600 ml-1">Freelancer Bangladesh</span>
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  নিরাপদ ও সুরক্ষিত
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  গোপনীয়তা সুরক্ষিত
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  স্বচ্ছ নীতি
                </span>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}