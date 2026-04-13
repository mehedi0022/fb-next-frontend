import { LayoutDashboard, LogIn, MessageCircleMore, User2, UserPlus } from "lucide-react";
import Link from "next/link";

type Props = {
    auth: boolean;
    from?: "navbar" | "drawer";
};

const LoginResisterBtn = ({ auth, from = "navbar" }: Props) => {
    const isDrawer = from === "drawer";

    return (
        <div
            className={`
        ${isDrawer ? "flex flex-col items-start w-full" : "hidden lg:flex items-center"}
        gap-4
      `}
        >
            {/* Auth Section */}
            {auth ? (
                <Link
                    href="/dashboard"
                    className="btn-primary bg-black/80 hover:bg-black text-xl font-semibold flex items-center gap-2 w-full  justify-center"
                >
                    <LayoutDashboard />
                    <span className="text-lg">ড্যাশবোর্ড</span>
                </Link>
            ) : (
                <div
                    className={`
            flex ${isDrawer ? "flex-col w-full" : "flex-row"} gap-3
          `}
                >
                    <Link
                        href="/auth/registration"
                        className="btn-primary flex items-center justify-center gap-2 text-lg font-semibold w-full"
                    >
                        রেজিস্ট্রেশন <UserPlus />
                    </Link>

                    <Link
                        href="/auth/login"
                        className="btn-primary flex items-center justify-center gap-2 text-lg font-semibold w-full"
                    >
                        লগইন <LogIn />
                    </Link>
                </div>
            )}

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/8801777458099?text=Hello%20I%20want%20to%20order"
                target="_blank"
                rel="noopener noreferrer"

                className={` btn-primary flex items-center justify-center gap-2 text-lg font-semibold ${isDrawer ? "w-full" : "w-auto"} `}
            >
                <MessageCircleMore />
                WhatsApp
            </a>

            {/* Profile Button (only navbar) */}
            {!isDrawer && (
                <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition hidden md:flex">
                    <User2 className="text-white" />
                </button>
            )}
        </div>
    );
};

export default LoginResisterBtn;