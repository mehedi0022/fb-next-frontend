"use client";

import { useState } from "react";
import { Field } from "@/lib";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  User,
  Globe,
  MapPin,
  Building,
  LogInIcon,
  Building2,
} from "lucide-react";
import { FacebookFilled, FacebookOutlined } from "@ant-design/icons";

interface FormData {
  phone: string;
  name: string;
  email: string;
  facebook: string;
  address: string;
  district: string;
  domain: string;
  branch: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  [key: string]: string | undefined;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    phone: "",
    name: "",
    email: "",
    facebook: "",
    address: "",
    district: "",
    domain: "",
    branch: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(errors, {formData})
  // Form Validation
  const validate = () => {
    const newErrors: Errors = {};

    if (!formData.phone) newErrors.phone = "মোবাইল নাম্বার আবশ্যক";
    if (!formData.name) newErrors.name = "নাম আবশ্যক";

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "সঠিক ইমেইল দিন";
    }

    if (!formData.branch) newErrors.branch = "ব্রাঞ্চ নির্বাচন করুন";

    if (!formData.password) {
      newErrors.password = "পাসওয়ার্ড আবশ্যক";
    } else if (formData.password.length < 6) {
      newErrors.password = "কমপক্ষে ৬ অক্ষর";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড মিলছে না";
    }

    return newErrors;
  };

  // Handle change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    // you can let form submit to backend normally
    console.log(formData);

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
      {/* Phone */}
      <Field
        label="মোবাইল নাম্বার *"
        error={errors.phone ? { message: errors.phone } : undefined}
      >
        <div className="relative">
          <Phone className="input-icon" />
          <input
            name="phone"
            type="text"
            onChange={handleChange}
            className="input !pl-10"
            placeholder="মোবাইল নাম্বার লিখুন"
          />
        </div>
      </Field>

      {/* Name */}
      <Field
        label="নাম *"
        error={errors.name ? { message: errors.name } : undefined}
      >
        <div className="relative">
          <User className="input-icon" />
          <input
            name="name"
            type="text"
            onChange={handleChange}
            className="input !pl-10"
            placeholder="আপনার নাম লিখুন"
          />
        </div>
      </Field>

      {/* Email */}
      <Field
        label="ইমেইল"
        error={errors.email ? { message: errors.email } : undefined}
      >
        <div className="relative">
          <Mail className="input-icon" />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className="input !pl-10"
            placeholder="example@email.com"
          />
        </div>
      </Field>

      {/* Facebook */}
      <Field label="ফেসবুক পেইজ">
        <div className="relative">
          <FacebookFilled className="input-icon" />
          <input
            name="facebook"
            type="text"
            onChange={handleChange}
            className="input !pl-10"
            placeholder="আপনার ফেসবুক পেইজের নাম"
          />
        </div>
      </Field>

      {/* Address */}
      <Field label="ঠিকানা">
        <div className="relative">
          <MapPin className="input-icon" />
          <input
            name="address"
            type="text"
            onChange={handleChange}
            className="input !pl-10"
            placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
          />
        </div>
      </Field>

      {/* District */}
      <Field label="জেলা">
        <div className="relative">
          <Building2 className="input-icon" />
          <select
            name="district"
            onChange={handleChange}
            className="input !pl-10"
          >
            <option disabled value="">
              জেলা নির্বাচন করুন
            </option>
            <option>ঢাকা</option>
            <option>চট্টগ্রাম</option>
          </select>
        </div>
      </Field>

      {/* Domain */}
      <Field label="ডোমেইন">
        <div className="relative">
          <Globe className="input-icon" />
          <input
            name="domain"
            type="url"
            onChange={handleChange}
            className="input !pl-10"
            placeholder="www.myshop.com"
          />
        </div>
      </Field>

      {/* Branch */}
      <Field
        label="ব্রাঞ্চ *"
        error={errors.branch ? { message: errors.branch } : undefined}
      >
        <div className="relative">
          <Building className="input-icon" />
          <select
            name="branch"
            onChange={handleChange}
            className="input !pl-10"
          >
            <option disabled value="">
              ব্রাঞ্চ নির্বাচন করুন
            </option>
            <option value="mirpur">Mirpur Branch</option>
          </select>
        </div>
      </Field>

      {/* Password */}
      <Field
        label="পাসওয়ার্ড *"
        error={errors.password ? { message: errors.password } : undefined}
      >
        <div className="relative">
          <Lock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            className="input !pl-10 !pr-10"
            placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
          />

          {/* show password icon */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>
      </Field>

      {/* Confirm Password */}
      <Field
        label="কনফার্ম পাসওয়ার্ড *"
        error={
          errors.confirmPassword
            ? { message: errors.confirmPassword }
            : undefined
        }
      >
        <div className="relative">
          <Lock className="input-icon" />
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            className="input !pl-10"
            placeholder="পাসওয়ার্ড আবার লিখুন"
          />
        </div>
      </Field>

      {/* Submit */}
      <div className="md:col-span-2 mt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-semibold transition-all ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              রেজিস্টার হচ্ছে...
            </>
          ) : (
            <>
              <LogInIcon className="h-5 w-5" />
              রেজিস্টার করুন
            </>
          )}
        </button>
      </div>
    </form>
  );
}
