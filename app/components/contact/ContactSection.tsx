import React from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { FacebookFilled, SendOutlined, YoutubeFilled } from "@ant-design/icons";


const ContactSection = () => {

    const socialLinks = [
        {
            label: 'Facebook',
            href: 'https://www.facebook.com/freelancerbangladesh25/',
            icon: <FacebookFilled />,
            bgColor: 'bg-[#1877F2]',
        },
        {
            label: 'Youtube',
            href: 'https://www.youtube.com/@freelancerbangladesh2025',
            icon: <YoutubeFilled />,
            bgColor: 'bg-[#FF0000]',
        },
        {
            label: 'Telegram',
            href: '#',
            icon: <SendOutlined />,
            bgColor: 'bg-[#0088cc]',
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Side: Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-neutral-800 mb-4">যোগাযোগের ঠিকানা</h2>
                            <p className="text-neutral-600">
                                যেকোনো বিষয়ে সাহায্যের জন্য কল করুন আমাদের হেল্পলাইন নাম্বারে অথবা মেসেজ করুন আমাদের ফেসবুক পেইজে
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="bg-yellow-100 p-3 rounded-xl h-fit">
                                    <MapPin className="text-yellow-600 w-6 h-6" />
                                </div>
                                <div className="text-neutral-700 space-y-3">
                                    <p><strong>চক-বাজার ব্রাঞ্চ:</strong> আর এস টাওয়ার, ২ ফ্লোর, ১ নং নাজিমুদ্দিন রোড, পুরাতন জেলখানা গেইটের বিপরীতে, চকবাজার, ঢাকা-১২০০</p>
                                    <p><strong>মিরপুর ব্রাঞ্চ:</strong> হাউস-৮২, ২য় তলা সমাজ কল্যাণ রোড, মিরপুর-১০, ঢাকা (মেট্রো রেল ২৫৩ পিলারের সামনে) ঢাকা-১২১৬</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-yellow-100 p-3 rounded-xl">
                                    <Phone className="text-yellow-600 w-6 h-6" />
                                </div>
                                <p className="text-neutral-700 font-semibold">+8801777458099</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-yellow-100 p-3 rounded-xl">
                                    <Mail className="text-yellow-600 w-6 h-6" />
                                </div>
                                <p className="text-neutral-700 font-semibold">info@freelancerbangladesh.com</p>
                            </div>
                        </div>

                        {/* Social Buttons */}
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social) => (
                                <a key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`
            flex items-center justify-center gap-2.5 
            ${social.bgColor} text-white 
            px-5 py-2.5 rounded-xl
            text-sm font-semibold 
            shadow-md shadow-black/5
            hover:shadow-lg hover:-translate-y-0.5 
            active:scale-95 
            transition-all duration-300
        `}>
                                    <span className="text-lg">{social.icon}</span>

                                    <span className="hidden sm:inline lg:hidden xl:inline">
                                        {social.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="bg-[#fff3c5] p-8 md:p-10 rounded-3xl shadow-sm border border-yellow-100">
                        <h3 className="text-2xl font-bold text-neutral-800 mb-6">মেসেজ পাঠান</h3>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="আপনার নাম"
                                className="w-full p-4 rounded-xl border border-transparent focus:border-yellow-400 outline-none bg-white transition-all shadow-sm"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="মোবাইল নম্বর"
                                    className="w-full p-4 rounded-xl border border-transparent focus:border-yellow-400 outline-none bg-white transition-all shadow-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="টাইটেল (ঐচ্ছিক)"
                                    className="w-full p-4 rounded-xl border border-transparent focus:border-yellow-400 outline-none bg-white transition-all shadow-sm"
                                />
                            </div>
                            <textarea
                                placeholder="মেসেজ লিখুন"
                                rows={4}
                                className="w-full p-4 rounded-xl border border-transparent focus:border-yellow-400 outline-none bg-white transition-all shadow-sm resize-none"
                            ></textarea>
                            <button className="w-full md:w-fit px-8 py-4 bg-[#E67E22] hover:bg-[#D35400] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-200">
                                মেসেজ পাঠান <Send size={20} />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection