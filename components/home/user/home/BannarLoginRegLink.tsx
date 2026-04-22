'use client'
import { useAppSelector } from "@/appstore/hooks/hooks";
import { selectIsAuthenticated } from "@/appstore/slices/sessionSlice";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";

export default function BannarLoginRegLink() {
    const auth = useAppSelector(selectIsAuthenticated);
    return (
        <div className={`flex flex-wrap gap-6 justify-center md:justify-start pt-2 ${auth ? 'hidden' : 'flex'}`}>
            <Link href="/register">
                <button className="flex items-center btn-secondary border">
                    রেজিস্ট্রেশন করুন
                    <ArrowRight className="w-5 h-5" />
                </button>
            </Link>

            <Link href="/login">
                <button className="flex items-center btn-secondary border">
                    লগইন করুন
                    <LogIn className="w-5 h-5 " />
                </button>
            </Link>
        </div>
    )
}
