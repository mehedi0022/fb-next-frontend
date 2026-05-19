'use client';

import {
    FacebookFilled,
    YoutubeFilled,
    SendOutlined
} from '@ant-design/icons';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {

    const pageUrl = "https://www.facebook.com/freelancerbangladesh25/";

    const helperLinks = [
        { label: 'আমাদের সম্পর্কে', href: '/about' },
        { label: 'টার্মস এন্ড কন্ডিশন', href: '/terms-and-conditions' },
        { label: 'গোপনীয়তা নীতি', href: '/privacy-policy' },
    ];

    const quickLinks = [
        { label: 'রেজিস্ট্রেশন', href: '/register' },
        { label: 'লগইন', href: '/login' },
        { label: 'যোগাযোগ', href: '/contact' },
    ];

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
        <footer className="bg-[#1a1f24] text-gray-300 py-10 mt-auto border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-5 ">
                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* যোগাযোগ করুন Section */}
                    <div className="flex flex-col">
                        <h3 className="text-white text-lg font-bold mb-5 border-b-2 border-orange-600 inline-block w-fit pb-1">
                            যোগাযোগ করুন
                        </h3>
                        <div className="space-y-4 text-sm leading-relaxed">
                            <p className="font-semibold text-white mb-1">ঠিকানা:</p>
                            <div className="flex gap-3">
                                <MapPin className="text-red-500 shrink-0 mt-1" size={18} />
                                <p>চক-বাজার ব্রাঞ্চ : আর এস টাওয়ার, ২ ফ্লোর, ১ নং নাজিমুদ্দিন রোড, ঢাকা -১২০০</p>
                            </div>
                            <div className="flex gap-3">
                                <MapPin className="text-red-500 shrink-0 mt-1" size={18} />
                                <p>মিরপুর ব্রাঞ্চ : হাউস-৮২, ২য় তলা সমাজ কল্যাণ রোড, মিরপুর-১০, ঢাকা -১২১৬</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <Phone className="text-white shrink-0" size={16} />
                                <p>01777-458099, 01945-004005</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <Mail className="text-white shrink-0" size={16} />
                                <p className="break-all">info@freelancerbangladesh.com</p>
                            </div>
                        </div>
                    </div>

                    {/* সহায়ক লিংক Section */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-5 border-b-2 border-red-600 inline-block w-fit pb-1">
                            সহায়ক লিংক
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {helperLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-white hover:translate-x-1 transition-all inline-block">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* দ্রুত লিংক Section */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-5 border-b-2 border-red-600 inline-block w-fit pb-1">
                            দ্রুত লিংক
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-white hover:translate-x-1 transition-all inline-block">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ফলো করুন Section */}
                    <div className="w-full">
                        <h3 className="text-white text-lg font-bold mb-5 border-b-2 border-red-600 inline-block w-fit pb-1">
                            ফলো করুন
                        </h3>
                        
                        {/* Social Icons Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center gap-1.5 ${social.bgColor} text-white py-2 rounded text-xs font-medium hover:brightness-110 transition-all`}
                                >
                                    {social.icon}
                                    <span className="hidden sm:inline lg:hidden xl:inline">{social.label}</span>
                                </a>
                            ))}
                        </div>

                        {/* Facebook Real Widget */}
                        <div className="bg-white rounded shadow-md overflow-hidden w-full max-w-[340px]">
                            <iframe
                                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=timeline&width=340&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                                width="100%"
                                height="400"
                                style={{ border: 'none', overflow: 'hidden' }}
                                scrolling="yes"
                                frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                title="Facebook Page Feed"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-12 pt-6 border-t border-gray-800 text-center text-xs md:text-sm text-gray-500">
                    <p>Copyright © {new Date().getFullYear()} All rights reserved by **Freelancer Bangladesh**</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
