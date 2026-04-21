import { Container, Title } from '@/lib/home';
import { Shield, Clock, RefreshCw, CreditCard, Package, Mail, Globe } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Title 
              subtitle="আমাদের সেবা ব্যবহারের পূর্ণাঙ্গ শর্তাবলী ও নীতিমালা"
              className="text-blue-600"
            >
              টার্মস এন্ড কন্ডিশন
            </Title>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            
            {/* Table of Contents */}
            <div className="bg-blue-50 p-6 border-b">
              <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                সূচিপত্র
              </h3>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <a href="#section-1" className="text-blue-600 hover:text-blue-800 transition-colors">১. ক্রয়-বিক্রয় এর শর্তাবলী</a>
                <a href="#section-2" className="text-blue-600 hover:text-blue-800 transition-colors">২. সূচনা</a>
                <a href="#section-3" className="text-blue-600 hover:text-blue-800 transition-colors">৩. ব্যবহারের শর্তাবলী</a>
                <a href="#section-8" className="text-blue-600 hover:text-blue-800 transition-colors">৮. যোগাযোগ</a>
              </div>
            </div>

            <div className="p-8 space-y-12">

              {/* Section 1: ক্রয়-বিক্রয় এর শর্তাবলী */}
              <section id="section-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Package className="w-6 h-6 text-blue-600" />
                  ১. ক্রয়-বিক্রয় এর শর্তাবলী
                </h2>

                {/* 1.1 ডেলিভারির সময়সীমা */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    ১.১ ডেলিভারির সময়সীমা
                  </h3>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <p className="text-gray-700 leading-relaxed">
                      অর্ডার গ্রহণ করার পর সর্বোচ্চ <strong className="text-green-700">৪৮ ঘণ্টার</strong> মধ্যে আপনার অর্ডারকৃত প্রোডাক্টটি কুরিয়ারে বুকিং করা হবে। কুরিয়ারে বুকিং করার সর্বোচ্চ <strong className="text-green-700">৭২ ঘন্টার</strong> মধ্যে কাস্টমার প্রোডাক্টটি হাতে পেয়ে যাবেন। তবে অনাকাঙ্ক্ষিত কোন ঘটনা অথবা প্রাকৃতিক দুর্যোগের কারণে প্রডাক্টিভ বুকিং অথবা ডেলিভারি হতে আরো সর্বোচ্চ ১ থেকে ২ দিন বিলম্ব হতে পারে। সর্বমোট <strong className="text-green-700">৫ থেকে ৬ কর্ম দিবসের</strong> মধ্যে কাস্টমারের হাতে প্রোডাক্টটি ডেলিভারি করা হবে।
                    </p>
                  </div>
                </div>

                {/* 1.2 পণ্য ফেরত এর নিয়মাবলী */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-orange-600" />
                    ১.২ পণ্য ফেরত এর নিয়মাবলী
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">১.২.১ ডেলিভারির সময় চেক করুন</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        ডেলিভারি ম্যান দাঁড়িয়ে থাকা অবস্থায় প্রোডাক্টটি হাতে নিয়ে চেক করে নিতে হবে প্রোডাক্টের কোন ত্রুটি বের হলে প্রোডাক্টটি রিটার্ন করে দিতে হবে। পরবর্তীতে আমরা প্রোডাক্টটি চেক করে আবার পাঠিয়ে দেব। অথবা কাস্টমার না নিতে চাইলে অর্ডারটি ক্যানসেল করে দেওয়া হবে এবং যদি কোন অগ্রিম পেমেন্ট করে থাকে তাহলে রিফান্ড করা হবে।
                      </p>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">১.২.২ রিফান্ড নীতি</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        প্রোডাক্ট রিটার্ন করার ক্ষেত্রে প্রোডাক্টের কোন ত্রুটি বের হলে সম্পূর্ণ টাকা কাস্টমার রিফান্ড পাবে। কিন্তু প্রোডাক্টের কোন ত্রুটি না থাকলে কাস্টমার ইচ্ছাকৃতভাবে প্রোডাক্টটি রিসিভ না করিলে ডেলিভারি চার্জ ব্যতীত বাকি টাকা রিফান্ড পাবে। সে ক্ষেত্রে কাস্টমার কোন অগ্রিম পেমেন্ট না করিলে ডেলিভারি চার্জ টি সেলারের বহন করতে হবে।
                      </p>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">১.২.৩ ভিডিও প্রমাণ</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        প্রোডাক্টের কোন ত্রুটি বের হলে ডেলিভারি ম্যান দাঁড়িয়ে থাকা অবস্থায় প্যাকেটটি আনবক্সিং করার ভিডিও সহ প্রোডাক্টের ত্রুটি উল্লেখ করে ভিডিওটি আমাদের পেইজে পাঠিয়ে দিলে আমরা ডেলিভারি চার্জ রিটার্ন করে দেব।
                      </p>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">১.২.ৄ পরবর্তী রিটার্ন</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        ডেলিভারি ম্যান প্রোডাক্টটি ডেলিভারি করে চলে আসার পরবর্তীতে প্রোডাক্ট রিটার্ন করার ক্ষেত্রে ডেলিভারি চার্জ সহ প্রোডাক্ট রিটার্ন করতে হবে। সেই ক্ষেত্রে প্রোডাক্টটি ব্যবহার করলে অথবা ওয়াশ করিলে প্রোডাক্টটি রিটার্ন হিসেবে গ্রহণ করা হবে না। এবং প্রোডাক্টটি সুন্দর ভাবে প্যাকেটিং করে রিটার্ন করতে হবে।
                      </p>
                    </div>
                  </div>
                </div>

                {/* 1.3 মূল্য ফেরত এর নিয়মাবলী */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    ১.৩ মূল্য ফেরত এর নিয়মাবলী
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">১.৩.১ মূল্য ফেরতের সময়সীমা</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        অর্ডার বাতিলের ক্ষেত্রে সর্বোচ্চ <strong>৩ ঘন্টার</strong> মধ্যে অগ্রিম পেমেন্ট নেওয়া থাকলে তা ফেরত দেওয়া হবে। পণ্য ফেরত এর ক্ষেত্রে, কাস্টমারের রিটার্ন কৃত প্রোডাক্ট কুরিয়ার যোগে আমাদের হাতে পৌঁছানোর সর্বোচ্চ <strong>১২ ঘণ্টার</strong> মধ্যে প্রোডাক্টের মূল্য ফেরত দেওয়া হবে।
                      </p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">১.৩.২ মূল্য ফেরতের মাধ্যম</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        আমাদের ওয়েবসাইটে বিকাশ এবং নগদ এর পেমেন্ট গেটওয়ের মাধ্যমে আমরা পেমেন্ট গ্রহণ করে থাকি। কোন অর্ডার বাতিল এবং ফেরত এর ক্ষেত্রে, অর্ডার করার সময় যেই নগদ অথবা বিকাশ নাম্বার থেকে পেমেন্ট করা হয়েছিল, উক্ত নাম্বারেই নগদ অথবা বিকাশ পেমেন্ট গেটওয়ের মাধ্যমে মূল্য ফেরত দেওয়া হবে।
                      </p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">১.৩.৩ মূল্য ফেরতের চার্জ</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        প্রোডাক্ট এবং ডেলিভারি সংক্রান্ত কোনো ত্রুটি থাকলে মূল্য ফেরত এর ক্ষেত্রে কোন ধরনের চার্জ ধার্য করা হবে না কাস্টমার সম্পূর্ণ টাকা ফেরত পাবে। অপরদিকে কাস্টমার ইচ্ছাকৃতভাবে অর্ডার বাতিল করলে অথবা পণ্য ফেরত দিলে সেই ক্ষেত্রে নগদ এর জন্য <strong>১.২%</strong> এবং বিকাশের জন্য <strong>১.৫%</strong> পেমেন্ট চার্জ কর্তন করে বাকি টাকা ফেরত দেওয়া হবে।
                      </p>
                    </div>
                  </div>
                </div>

                {/* 1.4 বিক্রয়োত্তর সেবা */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    ১.৪ বিক্রয়োত্তর সেবা
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">১.৪.১ পোশাকাদি পণ্যের ক্ষেত্রে</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        পোশাকাদি পণ্যের ক্ষেত্রে ডেলিভারি ম্যান দাঁড়িয়ে থাকা অবস্থায় প্রোডাক্টটি হাতে নিয়ে চেক করে নিতে হবে। প্রোডাক্টের কোন ধরনের ত্রুটি থাকলে তখনই রিটার্ন করে দিতে হবে। প্রোডাক্ট হাতে পাওয়ার পর কোনো ত্রুটি বের হলে <strong>৭ দিনের</strong> মধ্যেই প্রোডাক্টটির রিটার্ন অথবা পরিবর্তনের রিকোয়েস্ট রাখতে হবে।
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">১.৪.২ ইলেকট্রনিক বা গ্যাজেট আইটেমের জন্য</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        আমাদের প্রত্যেকটা ইলেকট্রনিক এবং গ্যাজেট আইটেমের বিবরণীতে উক্ত পণ্যের বিক্রয় পরবর্তী সেবার ধরন এবং সময়সীমা দেওয়া রয়েছে।
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: সূচনা */}
              <section id="section-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-green-600" />
                  ২. সূচনা
                </h2>
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed">
                    <strong className="text-green-700">Freelancer Bangladesh</strong> একটি সম্পূর্ণ অটোমেটেড অনলাইন প্রোডাক্ট রিসেলিং বিজনেস এর সহযোগী প্লাটফর্ম। আপনারা যারা প্রোডাক্ট নিয়ে অনলাইনে বিজনেস করে প্রফিট অর্জন করতে আগ্রহী, কিন্তু মূলধন, প্রোডাক্টের স্টক এবং লজিস্টিক সাপোর্ট ব্যবস্থা না থাকায় বিজনেস টি শুরু করতে পারছেন না, এই ক্ষেত্রে <strong className="text-green-700">Freelancer Bangladesh</strong> আপনাকে দিচ্ছে আপনার নিজস্ব অনলাইন বিজনেসটি বিনা পুঁজিতে শুরু এবং পরিচালনা করার সকল ধরনের সাপোর্ট।
                  </p>
                </div>
              </section>

              {/* Section 3: ব্যবহারের শর্তাবলী */}
              <section id="section-3">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-red-600" />
                  ৩. ব্যবহারের শর্তাবলী
                </h2>

                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">৩.১ অ্যাকাউন্ট</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      আমাদের ওয়েবসাইটে রেজিস্ট্রেশন করার সময় সম্পূর্ণ সঠিক তথ্য দিয়ে রেজিস্ট্রেশন করতে হবে। আপনার অ্যাকাউন্টের ইউজারনেম এবং পাসওয়ার্ড সম্পূর্ণ গোপন রাখুন।
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">৩.২ প্রাইভেসি</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      রেজিস্টেশনের সময় আপনার দেওয়া ব্যক্তিগত তথ্যগুলোর সম্পূর্ণ নিরাপদ এবং গোপনীয়তা বজায় থাকবে।
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">৩.৩ ট্রেডমার্ক এবং কপিরাইট</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Freelancer Bangladesh এর লোগো, ব্যানার ইমেজ এবং Freelancer Bangladesh সম্পর্কিত নাম ব্যবহারের সম্পূর্ণ অধিকার শুধুমাত্র Freelancer Bangladesh এর।
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">৩.৪ দাবিত্যাগ / ডিসক্লেইমার</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      আমাদের প্রোডাক্ট নিয়ে বিজনেস করার ক্ষেত্রে আপনি এবং আপনার কাস্টমারের মধ্যকার সকল ধরনের ট্রানজেকশনের সকল দায়িত্ব আপনাকেই পালন করতে হবে।
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">৩.৫ নিয়মাবলী পরিবর্তন</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      কোম্পানি যেকোনো সময় নিয়ম এবং নীতিতে পরিবর্তন আনতে পারে।
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">৩.৬ একাউন্ট বন্ধ করন</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      কোম্পানির নিয়ম ভঙ্গ করলে যে কোন সময় কোম্পানি আপনার অ্যাকাউন্ট বন্ধ করতে পারবে।
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 8: যোগাযোগ */}
              <section id="section-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-indigo-600" />
                  ৮. যোগাযোগ
                </h2>
                <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-4">Freelancer Bangladesh</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-indigo-600" />
                      <span className="text-gray-700">
                        <strong>Email:</strong> support@freelancerbangladesh.com
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-indigo-600" />
                      <span className="text-gray-700">
                        <strong>Website:</strong> https://freelancerbangladesh.com
                      </span>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-6 border-t text-center">
              <p className="text-sm text-gray-600">
                সর্বশেষ আপডেট: {new Date().toLocaleDateString('bn-BD')} | 
                <span className="text-blue-600 ml-1">Freelancer Bangladesh</span>
              </p>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}