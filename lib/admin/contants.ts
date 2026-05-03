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
        href: "/dashboard",
        badge: 1,
    },
    {
        label: "Students",
        icon: GraduationCap,
        children: [
            { label: "Pending Students", href: "/students/pending" },
            { label: "Registered Students", href: "/students/registered" },
            { label: "Cancel Students", href: "/students/cancelled" },
            { label: "Students Profit Payment", href: "/students/profit" },
        ],
    },
    { label: "Branches", icon: GitBranch, href: "/branches" },
    { label: "Student Batches", icon: Users, href: "/batches" },
    {
        label: "Orders",
        icon: ShoppingCart,
        children: [
            { label: "All Orders", href: "/orders/all" },
            { label: "Pending Orders", href: "/orders/pending" },
            { label: "Cancelled Orders", href: "/orders/cancelled" },
        ],
    },
    { label: "In Courier", icon: Truck, href: "/courier" },
    {
        label: "Seller Panel",
        icon: Monitor,
        children: [
            { label: "Seller List", href: "/seller/list" },
            { label: "Seller Requests", href: "/seller/requests" },
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
            { label: "All Products", href: "/products/all" },
            { label: "Add Product", href: "/products/add" },
            { label: "Categories", href: "/products/categories" },
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
            { label: "General Settings", href: "/settings/general" },
            { label: "SEO Settings", href: "/settings/seo" },
        ],
    },
];