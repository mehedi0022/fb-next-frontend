import { AdminNavItem } from "./types";
import {
    LayoutDashboard, GraduationCap, GitBranch, Users,
    ShoppingCart, Truck, Monitor, CreditCard, ShoppingBag,
    Package, Boxes, Building2, Settings
} from "lucide-react";

 export const AdminNAV_ITEMS: AdminNavItem[] = [
    {
        label: "Dashboards",
        icon: LayoutDashboard,
        href: "/admin",
        badge: 1,
    },
    {
        label: "Students",
        icon: GraduationCap,
        children: [
            { label: "Pending Students", href: "/admin/students/pending" },
            { label: "Registered Students", href: "/admin/students/registered" },
            { label: "Cancel Students", href: "/admin/students/cancelled" },
            { label: "Packages", href: "/admin/students/packages" },
            { label: "Students Profit Payment", href: "/admin/students/profit" },
        ],
    },
    { label: "Branches", icon: GitBranch, href: "/admin/branches" },
    { label: "Student Batches", icon: Users, href: "/admin/batches" },
    {
        label: "Orders",
        icon: ShoppingCart,
        children: [
            { label: "All Orders", href: "/admin/orders/all" },
            { label: "Pending Orders", href: "/orders/pending" },
            { label: "Cancelled Orders", href: "/orders/cancelled" },
        ],
    },
    { label: "In Courier", icon: Truck, href: "/courier" },
    {
        label: "Seller Panel",
        icon: Monitor,
        children: [
            { label: "Seller List", href: "/admin/sellerlist" },
            { label: "Active Sellers", href: "/admin/active-sellers" },
        ],
    },
    {
        label: "Payments",
        icon: CreditCard,
        children: [
            { label: "Payment History", href: "/payments/history" },
            { label: "Pending Payments", href: "/payments/pending" },
        ],
    },
    {
        label: "Purchases",
        icon: ShoppingBag,
        children: [
            { label: "Purchase List", href: "/purchases/list" },
            { label: "Purchase Returns", href: "/purchases/returns" },
        ],
    },
    {
        label: "Products",
        icon: Package,
        children: [
            { label: "All Products", href: "/admin/products/all" },
            { label: "Add Product", href: "/admin/products/add" },
            { label: "Brands", href: "/admin/products/brands" },
            { label: "Categories", href: "/admin/products/categories" },
            { label: "Attributes", href: "/admin/products/attributes" },
        ],
    },
    {
        label: "Wholesale",
        icon: Boxes,
        children: [
            { label: "Wholesale Orders", href: "/wholesale/orders" },
            { label: "Wholesale Clients", href: "/wholesale/clients" },
        ],
    },
    { label: "Suppliers", icon: Building2, href: "/suppliers" },
    {
        label: "Site Settings",
        icon: Settings,
        children: [
            { label: "General Settings", href: "/admin/settings/general" },
            { label: "Banner Settings", href: "/admin/settings/banner" },
            { label: "Features", href: "/admin/settings/features" },
            { label: "Steps", href: "/admin/settings/steps" },
            { label: "FAQ", href: "/admin/settings/faq" },
            { label: "SEO Settings", href: "/admin/settings/seo" },
        ],
    },
];
