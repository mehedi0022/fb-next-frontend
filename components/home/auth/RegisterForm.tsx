'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Field } from '@/lib/home';
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
  UserPlus,
  Building2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { FacebookFilled } from '@ant-design/icons';
import Link from 'next/link';

// ==================== TYPES ====================
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
  agreeToTerms: boolean;
}

interface FormErrors {
  phone?: string;
  name?: string;
  email?: string;
  facebook?: string;
  address?: string;
  district?: string;
  domain?: string;
  branch?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

// ==================== CONSTANTS ====================
const INITIAL_FORM_DATA: FormData = {
  phone: '',
  name: '',
  email: '',
  facebook: '',
  address: '',
  district: '',
  domain: '',
  branch: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
};

const BANGLADESH_DISTRICTS = [
  'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ',
  'কুমিল্লা', 'ফরিদপুর', 'গাজীপুর', 'গোপালগঞ্জ', 'জামালপুর', 'কিশোরগঞ্জ', 'মাদারীপুর',
  'মানিকগঞ্জ', 'মুন্শিগঞ্জ', 'নারায়ণগঞ্জ', 'নরসিংদী', 'রাজবাড়ী', 'শরীয়তপুর', 'টাঙ্গাইল',
  'বান্দরবান', 'ব্রাহ্মণবাড়িয়া', 'চাঁদপুর', 'কক্সবাজার', 'ফেনী', 'খাগড়াছড়ি', 'লক্ষ্মীপুর',
  'নোয়াখালী', 'রাঙ্গামাটি', 'বাগেরহাট', 'চুয়াডাঙ্গা', 'যশোর', 'ঝিনাইদহ', 'কুষ্টিয়া',
  'মাগুরা', 'মেহেরপুর', 'নড়াইল', 'সাতক্ষীরা', 'হবিগঞ্জ', 'মৌলভীবাজার', 'সুনামগঞ্জ',
  'বগুড়া', 'জয়পুরহাট', 'নওগাঁ', 'নাটোর', 'চাঁপাইনবাবগঞ্জ', 'পাবনা', 'সিরাজগঞ্জ',
  'দিনাজপুর', 'গাইবান্ধা', 'কুড়িগ্রাম', 'লালমনিরহাট', 'নীলফামারী', 'পঞ্চগড়', 'ঠাকুরগাঁও',
  'ভোলা', 'ঝালকাঠি', 'পটুয়াখালী', 'পিরোজপুর', 'নেত্রকোণা', 'শেরপুর'
];

const BRANCH_OPTIONS = [
  { value: 'mirpur', label: 'মিরপুর ব্রাঞ্চ' },
  { value: 'chalkbazar', label: 'চকবাজার ব্রাঞ্চ' },
  { value: 'rajshahi', label: 'রাজশাহী ব্রাঞ্চ' },
  { value: 'rajbari', label: 'রাজবাড়ী ব্রাঞ্চ' },
  { value: 'uttara', label: 'উত্তরা ব্রাঞ্চ' },
  { value: 'chottogram', label: 'চট্টগ্রাম ব্রাঞ্চ' },
];

const VALIDATION_PATTERNS = {
  phone: /^(\+88)?01[3-9]\d{8}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  facebook: /^(https?:\/\/)?(www\.)?(facebook|fb)\.com\//,
  domain: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
} as const;

const ERROR_MESSAGES = {
  required: {
    phone: 'মোবাইল নাম্বার আবশ্যক',
    name: 'নাম আবশ্যক',
    branch: 'ব্রাঞ্চ নির্বাচন করুন',
    password: 'পাসওয়ার্ড আবশ্যক',
    confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
    agreeToTerms: 'শর্তাবলী মেনে নিতে হবে',
  },
  invalid: {
    phone: 'সঠিক বাংলাদেশী মোবাইল নাম্বার দিন',
    email: 'সঠিক ইমেইল ঠিকানা দিন',
    facebook: 'সঠিক ফেসবুক পেইজ লিঙ্ক দিন',
    domain: 'সঠিক ওয়েবসাইট ঠিকানা দিন',
    passwordLength: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে',
    passwordMismatch: 'পাসওয়ার্ড মিলছে না',
    nameLength: 'নাম কমপক্ষে ২ অক্ষরের হতে হবে',
  },
} as const;

// ==================== BUSINESS LOGIC ====================
class RegistrationValidator {
  static validatePhone(phone: string): string | null {
    if (!phone.trim()) return ERROR_MESSAGES.required.phone;
    if (!VALIDATION_PATTERNS.phone.test(phone.replace(/\s/g, ''))) {
      return ERROR_MESSAGES.invalid.phone;
    }
    return null;
  }

  static validateName(name: string): string | null {
    if (!name.trim()) return ERROR_MESSAGES.required.name;
    if (name.trim().length < 2) return ERROR_MESSAGES.invalid.nameLength;
    return null;
  }

  static validateEmail(email: string): string | null {
    if (email && !VALIDATION_PATTERNS.email.test(email)) {
      return ERROR_MESSAGES.invalid.email;
    }
    return null;
  }

  static validateFacebook(facebook: string): string | null {
    if (facebook && facebook.trim() && !VALIDATION_PATTERNS.facebook.test(facebook)) {
      return ERROR_MESSAGES.invalid.facebook;
    }
    return null;
  }

  static validateDomain(domain: string): string | null {
    if (domain && domain.trim() && !VALIDATION_PATTERNS.domain.test(domain)) {
      return ERROR_MESSAGES.invalid.domain;
    }
    return null;
  }

  static validateBranch(branch: string): string | null {
    if (!branch) return ERROR_MESSAGES.required.branch;
    return null;
  }

  static validatePassword(password: string): string | null {
    if (!password) return ERROR_MESSAGES.required.password;
    if (password.length < 6) return ERROR_MESSAGES.invalid.passwordLength;
    return null;
  }

  static validateConfirmPassword(password: string, confirmPassword: string): string | null {
    if (!confirmPassword) return ERROR_MESSAGES.required.confirmPassword;
    if (password !== confirmPassword) return ERROR_MESSAGES.invalid.passwordMismatch;
    return null;
  }

  static validateTerms(agreeToTerms: boolean): string | null {
    if (!agreeToTerms) return ERROR_MESSAGES.required.agreeToTerms;
    return null;
  }

  static validateForm(formData: FormData): ValidationResult {
    const errors: FormErrors = {};

    // Validate all fields
    const phoneError = this.validatePhone(formData.phone);
    if (phoneError) errors.phone = phoneError;

    const nameError = this.validateName(formData.name);
    if (nameError) errors.name = nameError;

    const emailError = this.validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const facebookError = this.validateFacebook(formData.facebook);
    if (facebookError) errors.facebook = facebookError;

    const domainError = this.validateDomain(formData.domain);
    if (domainError) errors.domain = domainError;

    const branchError = this.validateBranch(formData.branch);
    if (branchError) errors.branch = branchError;

    const passwordError = this.validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    const confirmPasswordError = this.validateConfirmPassword(formData.password, formData.confirmPassword);
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    const termsError = this.validateTerms(formData.agreeToTerms);
    if (termsError) errors.agreeToTerms = termsError;

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}

class PasswordStrengthCalculator {
  static calculate(password: string): number {
    let strength = 0;
    
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  }

  static getStrengthInfo(strength: number): { text: string; color: string } {
    switch (strength) {
      case 0:
      case 1: return { text: 'দুর্বল', color: 'text-red-500' };
      case 2: return { text: 'মাঝারি', color: 'text-yellow-500' };
      case 3: return { text: 'ভালো', color: 'text-blue-500' };
      case 4:
      case 5: return { text: 'শক্তিশালী', color: 'text-green-500' };
      default: return { text: '', color: '' };
    }
  }
}

class RegistrationService {
  static async submitRegistration(formData: FormData): Promise<{ success: boolean; message?: string }> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would make the actual API call
      console.log('Registration data:', formData);
      
      return { success: true };
    } catch {
      return { 
        success: false, 
        message: 'রেজিস্ট্রেশনে সমস্যা হয়েছে। আবার চেষ্টা করুন।' 
      };
    }
  }
}

// ==================== CUSTOM HOOKS ====================
const useFormValidation = (formData: FormData) => {
  return useMemo(() => {
    return RegistrationValidator.validateForm(formData);
  }, [formData]);
};

const usePasswordStrength = (password: string) => {
  return useMemo(() => {
    const strength = PasswordStrengthCalculator.calculate(password);
    return {
      strength,
      ...PasswordStrengthCalculator.getStrengthInfo(strength),
    };
  }, [password]);
};

// ==================== MAIN COMPONENT ====================
export default function RegisterForm() {
  const router = useRouter();
  
  // State Management
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Custom Hooks
  const passwordStrength = usePasswordStrength(formData.password);
  const validation = useFormValidation(formData);

  // Event Handlers
  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear field-specific error
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Scroll to first error
      const firstErrorField = document.querySelector('.border-red-500');
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    const result = await RegistrationService.submitRegistration(formData);
    
    if (result.success) {
      router.push('/login?registered=true');
    } else {
      setErrors({ agreeToTerms: result.message });
    }
    
    setIsLoading(false);
  }, [formData, validation, router]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  // Render Helpers
  const renderPasswordStrengthIndicator = () => {
    if (!formData.password) return null;

    return (
      <div className="mt-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                passwordStrength.strength <= 1 ? 'bg-red-500' :
                passwordStrength.strength === 2 ? 'bg-yellow-500' :
                passwordStrength.strength === 3 ? 'bg-blue-500' : 'bg-green-500'
              }`}
              style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
            />
          </div>
          <span className={`text-xs ${passwordStrength.color}`}>
            {passwordStrength.text}
          </span>
        </div>
      </div>
    );
  };

  const renderPasswordMatchIndicator = () => {
    if (!formData.confirmPassword || formData.password !== formData.confirmPassword) return null;

    return (
      <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
        <CheckCircle className="w-4 h-4" />
        পাসওয়ার্ড মিলেছে
      </div>
    );
  };

  // ==================== RENDER ====================
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* General Error */}
      {errors.agreeToTerms && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errors.agreeToTerms}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Phone */}
        <Field
          label="মোবাইল নাম্বার *"
          error={errors.phone ? { message: errors.phone } : undefined}
        >
          <div className="relative">
            <Phone className="input-icon" />
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className={`input !pl-10 ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="01XXXXXXXXX"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* Name */}
        <Field
          label="পূর্ণ নাম *"
          error={errors.name ? { message: errors.name } : undefined}
        >
          <div className="relative">
            <User className="input-icon" />
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={`input !pl-10 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="আপনার পূর্ণ নাম লিখুন"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* Email */}
        <Field
          label="ইমেইল ঠিকানা"
          error={errors.email ? { message: errors.email } : undefined}
        >
          <div className="relative">
            <Mail className="input-icon" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`input !pl-10 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="example@email.com"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* Facebook */}
        <Field
          label="ফেসবুক পেইজ/প্রোফাইল"
          error={errors.facebook ? { message: errors.facebook } : undefined}
        >
          <div className="relative">
            <FacebookFilled className="input-icon text-blue-600" />
            <input
              name="facebook"
              type="url"
              value={formData.facebook}
              onChange={handleInputChange}
              className={`input !pl-10 ${errors.facebook ? 'border-red-500' : ''}`}
              placeholder="https://facebook.com/yourpage"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* Address */}
        <Field
          label="সম্পূর্ণ ঠিকানা"
          error={errors.address ? { message: errors.address } : undefined}
        >
          <div className="relative">
            <MapPin className="input-icon" />
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              className={`input !pl-10 ${errors.address ? 'border-red-500' : ''}`}
              placeholder="বাড়ি/রোড নং, এলাকা, উপজেলা"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* District */}
        <Field
          label="জেলা"
          error={errors.district ? { message: errors.district } : undefined}
        >
          <div className="relative   ">
            <Building2 className="input-icon" />
            <select
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className={`input !pl-10 ${errors.district ? 'border-red-500' : ''}`}
              disabled={isLoading}
            >
              <option value="">জেলা নির্বাচন করুন</option>
              {BANGLADESH_DISTRICTS.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </Field>

        {/* Domain */}
        <Field
          label="ওয়েবসাইট/ডোমেইন"
          error={errors.domain ? { message: errors.domain } : undefined}
        >
          <div className="relative">
            <Globe className="input-icon" />
            <input
              name="domain"
              type="url"
              value={formData.domain}
              onChange={handleInputChange}
              className={`input !pl-10 ${errors.domain ? 'border-red-500' : ''}`}
              placeholder="https://www.yourshop.com"
              disabled={isLoading}
            />
          </div>
        </Field>

        {/* Branch */}
        <Field
          label="ব্রাঞ্চ নির্বাচন *"
          error={errors.branch ? { message: errors.branch } : undefined}
        >
          <div className="relative">
            <Building className="input-icon" />
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className={`input !pl-10 ${errors.branch ? 'border-red-500' : ''}`}
              disabled={isLoading}
            >
              <option value="">ব্রাঞ্চ নির্বাচন করুন</option>
              {BRANCH_OPTIONS.map((branch) => (
                <option key={branch.value} value={branch.value}>
                  {branch.label}
                </option>
              ))}
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
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`input !pl-10 !pr-10 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
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
          {renderPasswordStrengthIndicator()}
        </Field>

        {/* Confirm Password */}
        <Field
          label="পাসওয়ার্ড নিশ্চিত করুন *"
          error={errors.confirmPassword ? { message: errors.confirmPassword } : undefined}
        >
          <div className="relative">
            <Lock className="input-icon" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`input !pl-10 !pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="পাসওয়ার্ড আবার লিখুন"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {renderPasswordMatchIndicator()}
        </Field>

      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={isLoading}
          />
          <label className="text-sm text-gray-700 leading-relaxed">
            আমি <Link href="/terms-and-conditions" className="text-blue-600 hover:text-blue-800 underline">শর্তাবলী</Link> এবং{' '}
            <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">গোপনীয়তা নীতি</Link> পড়েছি এবং সম্মত আছি।
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-white font-semibold transition-all ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              রেজিস্ট্রেশন হচ্ছে...
            </>
          ) : (
            <>
              <UserPlus className="h-5 w-5" />
              রেজিস্টার করুন
            </>
          )}
        </button>
      </div>

      {/* Login Link */}
      <div className="text-center pt-4 border-t">
        <p className="text-gray-600 text-sm">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
          <Link 
            href="/login" 
            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
          >
            লগইন করুন
          </Link>
        </p>
      </div>

    </form>
  );
}