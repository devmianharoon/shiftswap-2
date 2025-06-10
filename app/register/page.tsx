'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const RegisterPage = () => {
    const searchParams = useSearchParams();
    const role = searchParams.get('type'); // 'owner' or 'employee'
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<{
        name: string;
        businessName: string;
        businessType: string;
        employeeCount: string;
        primaryNeed: string;
        businessDuration: string;
        payrollMethod: string;
        email: string;
        password: string;
        phone: string;
        sendMobileApp: boolean;
        agreeToTerms: boolean;
        logo: File | null;
        logoPreview: string;
        secretCode: string;
        companyType: string;
        skillType: string;
    }>(() => ({
        name: '',
        businessName: '',
        businessType: '',
        employeeCount: '',
        primaryNeed: '',
        businessDuration: '',
        payrollMethod: '',
        email: '',
        password: '',
        phone: '',
        sendMobileApp: true,
        agreeToTerms: false,
        logo: null,
        logoPreview: '',
        secretCode: '',
        companyType: '',
        skillType: '',
    }));
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registrationComplete, setRegistrationComplete] = useState(false);

    const totalSteps = 2;
    //      Validate current step
    const validateStep = (step: number) => {
        const newErrors: Record<string, string> = {};

        switch (step) {
            case 1:
                if (!formData.businessName.trim()) {
                    newErrors.businessName = 'Please enter your business name';
                }
                if (!formData.businessType) {
                    newErrors.businessType = 'Please select your business type';
                }
                // if (!formData.employeeCount) {
                //     newErrors.employeeCount = 'Please select your team size';
                // }
                break;
            case 2:
                if (!formData.name.trim()) {
                    newErrors.name = 'Please tell us your name';
                }
                if (!formData.email.trim()) {
                    newErrors.email = 'Please enter your email';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    newErrors.email = 'Please enter a valid email address';
                }
                if (!formData.password) {
                    newErrors.password = 'Please create a password';
                } else if (formData.password.length < 8) {
                    newErrors.password = 'Password must be at least 8 characters';
                } else if (!/\d/.test(formData.password)) {
                    newErrors.password = 'Password must contain at least one number';
                }
                if (!formData.phone.trim()) {
                    newErrors.phone = 'Please enter your phone number';
                }
                if (!formData.agreeToTerms) {
                    newErrors.agreeToTerms = 'You must agree to the terms to continue';
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateEmployeeStep = (step: number) => {
        const newErrors: Record<string, string> = {};

        switch (step) {
            case 1:
                if (!formData.secretCode.trim()) {
                    newErrors.secretCode = 'Please enter your Secret Code';
                }
                if (!formData.companyType) {
                    newErrors.companyType = 'Please select your company type';
                }
                if (!formData.skillType) {
                    newErrors.skillType = 'Please select your skill';
                }
                break;
            case 2:
                if (!formData.name.trim()) {
                    newErrors.name = 'Please tell us your name';
                }
                if (!formData.email.trim()) {
                    newErrors.email = 'Please enter your email';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                    newErrors.email = 'Please enter a valid email address';
                }
                if (!formData.password) {
                    newErrors.password = 'Please create a password';
                } else if (formData.password.length < 8) {
                    newErrors.password = 'Password must be at least 8 characters';
                } else if (!/\d/.test(formData.password)) {
                    newErrors.password = 'Password must contain at least one number';
                }
                if (!formData.phone.trim()) {
                    newErrors.phone = 'Please enter your phone number';
                }
                if (!formData.agreeToTerms) {
                    newErrors.agreeToTerms = 'You must agree to the terms to continue';
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        const isValid = validateStep(currentStep);
        console.log('Step:', currentStep, '| Valid:', isValid);
        if (isValid) {
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
                window.scrollTo(0, 0);
            }
        }
    };

    const handleNextE = () => {
        const isValid = validateEmployeeStep(currentStep);
        console.log('Step:', currentStep, '| Valid:', isValid);
        if (isValid) {
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
                window.scrollTo(0, 0);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear error when field is updated
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };
    const handleSubmit = async () => {
        if (validateStep(currentStep)) {
            setIsSubmitting(true);

            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setRegistrationComplete(true);

                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);
            } catch (error) {
                console.error('Registration failed:', error);
                setErrors({ submit: 'Registration failed. Please try again.' });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleSubmitE = async () => {
        if (validateEmployeeStep(currentStep)) {
            setIsSubmitting(true);

            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1500));
                setRegistrationComplete(true);

                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);
            } catch (error) {
                console.error('Registration failed:', error);
                setErrors({ submit: 'Registration failed. Please try again.' });
            } finally {
                setIsSubmitting(false);
            }
        }
    };
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setFormData((prev: any) => ({
                        ...prev,
                        logo: file,
                        logoPreview: reader.result,
                    }));
                }
            };
            reader.readAsDataURL(file);
        } else {
            setErrors((prev) => ({ ...prev, logo: 'Please upload a valid image file.' }));
        }
    };

    const renderStep: any = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="max-w-md animate-fadeIn">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4"> Tell us about your business</h1>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-900 font-medium mb-3">Whats your business called?</label>
                            <input
                                type="text"
                                placeholder="Business name"
                                value={formData.businessName}
                                onChange={(e) => handleInputChange('businessName', e.target.value)}
                                className={`w-full px-4 py-3 border ${
                                    errors.businessName ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            />
                            {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-900 font-medium mb-3">What kind of business is it?</label>
                            <div className="relative">
                                <select
                                    value={formData.businessType}
                                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                                    className={`w-full px-4 py-3 border ${
                                        errors.businessType ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white pr-10`}
                                >
                                    <option value="">What kind of business is it?</option>
                                    <option value="restaurant">Restaurant</option>
                                    <option value="retail">Retail</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="service">Service Business</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-900 font-medium mb-3">Upload your business logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-700 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            />
                            {formData.logoPreview && (
                                <div className="mt-3">
                                    <Image src={formData.logoPreview} width={96} height={96} alt="Logo preview" className="h-16 object-contain" />
                                </div>
                            )}
                            {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo}</p>}
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handlePrevious}
                                className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back
                            </button>

                            <button onClick={handleNext} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center">
                                Next
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="max-w-md animate-fadeIn">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Finish signing up</h1>
                            <p className="text-gray-600">
                                DEV, youre about to <strong>join 100,000+ businesses</strong> that are already loving Shift Swap.
                            </p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-900 font-medium mb-3">Name</label>
                            <input
                                type="text"
                                placeholder="ex: Jane Smith"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className={`w-full px-4 py-3 border ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            {/* <p className="text-sm text-gray-500 mt-2">Tell us your name. Well ask about your business later.</p> */}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-900 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="email@company.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`w-full px-4 py-3 border ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-900 font-medium mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className={`w-full px-4 py-3 border ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-700"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={
                                                showPassword
                                                    ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                                                    : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                            }
                                        />
                                    </svg>
                                </button>
                            </div>
                            {errors.password ? (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            ) : (
                                <p className="text-sm text-gray-500 mt-1">Must be at least 8 characters, with 1 number</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-900 font-medium mb-2">Phone number</label>
                            <input
                                type="tel"
                                placeholder="(XXX) XXX-XXXX"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className={`w-full px-4 py-3 border ${
                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-900 font-medium mb-3">Upload your business logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-700 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            />
                            {formData.logoPreview && (
                                <div className="mt-3">
                                    <Image src={formData.logoPreview} width={96} height={96} alt="Logo preview" className="h-16 object-contain" />
                                </div>
                            )}
                            {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo}</p>}
                        </div>

                        <div className="mb-6">
                            <label className={`flex items-start ${errors.agreeToTerms ? 'text-red-500' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={formData.agreeToTerms}
                                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                                    className={`mr-3 mt-1 ${errors.agreeToTerms ? 'text-red-500' : 'text-purple-600'} rounded`}
                                />
                                <span className="text-sm">
                                    By continuing, you agree to our{' '}
                                    <Link href="/terms" className="text-purple-600 underline">
                                        Terms of Service
                                    </Link>
                                    ,{' '}
                                    <Link href="/privacy" className="text-purple-600 underline">
                                        Privacy Policy
                                    </Link>
                                    , and{' '}
                                    <Link href="/user-agreement" className="text-purple-600 underline">
                                        User Agreement
                                    </Link>
                                    .
                                </span>
                            </label>
                            {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1 ml-7">{errors.agreeToTerms}</p>}
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={handlePrevious}
                                className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                                    isSubmitting ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Continue to Shift Swap
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>

                        {errors.submit && <p className="text-red-500 text-sm mt-4 text-center">{errors.submit}</p>}

                        <p className="text-xs text-gray-500 mt-4">
                            You may receive text messages related to your account setup. Message & data rates may apply. Message frequency varies. Reply STOP to cancel messages.
                        </p>
                    </div>
                );

            default:
                return null;
        }
    };

    const renderStepE: any = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="max-w-md animate-fadeIn">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tell us about your Company</h1>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-900 font-medium mb-3">Whats your company sceret code?</label>
                            <input
                                type="text"
                                placeholder="sceret code..."
                                // value={formData.secretCode}
                                onChange={(e) => handleInputChange('Secret Code', e.target.value)}
                                className={`w-full px-4 py-3 border ${
                                    errors.secretCode ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            />
                            {errors.secretCode && <p className="text-red-500 text-sm mt-1">{errors.secretCode}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-900 font-medium mb-3">What kind of company is it?</label>
                            <div className="relative">
                                <select
                                    value={formData.companyType}
                                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                                    // disabled
                                    className={`w-full px-4 py-3 border ${
                                        errors.companyType ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white pr-10`}
                                >
                                    <option value="">What kind of company is it?</option>
                                    <option value="restaurant">Restaurant</option>
                                    <option value="retail">Retail</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="service">Service company</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.companyType && <p className="text-red-500 text-sm mt-1">{errors.companyType}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-900 font-medium mb-3">which kind of skill do you have?</label>
                            <div className="relative">
                                <select
                                    value={formData.skillType}
                                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                                    // disabled
                                    className={`w-full px-4 py-3 border ${
                                        errors.skillType ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white pr-10`}
                                >
                                    <option value="">Select your skill</option>
                                    <option value="restaurant">Restaurant</option>
                                    <option value="retail">Retail</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="service">Service company</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.companyType && <p className="text-red-500 text-sm mt-1">{errors.companyType}</p>}
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handlePrevious}
                                className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back
                            </button>

                            <button onClick={handleNextE} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center">
                                Next
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="max-w-md animate-fadeIn">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Finish signing up</h1>
                            <p className="text-gray-600">
                                DEV, youre about to <strong>join 100,000+ companies</strong> that are already loving Shift Swap.
                            </p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-900 font-medium mb-3">Name</label>
                            <input
                                type="text"
                                placeholder="ex: Jane Smith"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className={`w-full px-4 py-3 border ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            {/* <p className="text-sm text-gray-500 mt-2">Tell us your name. Well ask about your business later.</p> */}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-900 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="email@company.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`w-full px-4 py-3 border ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-900 font-medium mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className={`w-full px-4 py-3 border ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-700"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={
                                                showPassword
                                                    ? 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                                                    : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                                            }
                                        />
                                    </svg>
                                </button>
                            </div>
                            {errors.password ? (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            ) : (
                                <p className="text-sm text-gray-500 mt-1">Must be at least 8 characters, with 1 number</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-900 font-medium mb-2">Phone number</label>
                            <input
                                type="tel"
                                placeholder="(XXX) XXX-XXXX"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className={`w-full px-4 py-3 border ${
                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-900 font-medium mb-3">Upload your company logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-700 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                            />
                            {formData.logoPreview && (
                                <div className="mt-3">
                                    <Image src={formData.logoPreview} width={96} height={96} alt="Logo preview" className="h-16 object-contain" />
                                </div>
                            )}
                            {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo}</p>}
                        </div>

                        <div className="mb-6">
                            <label className={`flex items-start ${errors.agreeToTerms ? 'text-red-500' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={formData.agreeToTerms}
                                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                                    className={`mr-3 mt-1 ${errors.agreeToTerms ? 'text-red-500' : 'text-purple-600'} rounded`}
                                />
                                <span className="text-sm">
                                    By continuing, you agree to our{' '}
                                    <Link href="/terms" className="text-purple-600 underline">
                                        Terms of Service
                                    </Link>
                                    ,{' '}
                                    <Link href="/privacy" className="text-purple-600 underline">
                                        Privacy Policy
                                    </Link>
                                    , and{' '}
                                    <Link href="/user-agreement" className="text-purple-600 underline">
                                        User Agreement
                                    </Link>
                                    .
                                </span>
                            </label>
                            {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1 ml-7">{errors.agreeToTerms}</p>}
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={handlePrevious}
                                className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back
                            </button>

                            <button
                                onClick={handleSubmitE}
                                disabled={isSubmitting}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                                    isSubmitting ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Continue to Shift Swap
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>

                        {errors.submit && <p className="text-red-500 text-sm mt-4 text-center">{errors.submit}</p>}

                        <p className="text-xs text-gray-500 mt-4">
                            You may receive text messages related to your account setup. Message & data rates may apply. Message frequency varies. Reply STOP to cancel messages.
                        </p>
                    </div>
                );

            default:
                return null;
        }
    };

    // Success modal
    const renderSuccessModal = () => {
        if (!registrationComplete) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
                <div className="bg-white rounded-lg p-8 max-w-md w-full">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Complete!</h3>
                        <p className="text-gray-600 mb-6">Welcome to Shift Swap, {formData.name}! Were setting up your account and will redirect you shortly.</p>
                        <div className="flex justify-center">
                            <div className="animate-pulse bg-purple-600 h-2 w-24 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="min-h-screen bg-gray-50">
            {role === 'owner' ? (
                <>
                    {/* Header */}
                    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
                        <div className="flex items-center justify-between max-w-7xl mx-auto">
                            <div className="text-2xl font-bold text-purple-600">Shift Swap</div>
                            <div className="text-sm text-gray-600">
                                {currentStep === 2 ? 'Already have an account?' : 'Have an account?'}{' '}
                                <Link href="/signin" className="text-purple-600 font-medium hover:underline">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </header>

                    <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
                        {/* Main Content */}
                        <div className="flex-1 px-6 py-12">
                            {/* Progress Bar */}
                            <div className="mb-8 max-w-md">
                                <div className="text-sm text-gray-600 mb-2">
                                    STEP {currentStep} OF {totalSteps}
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
                                </div>
                            </div>

                            {/* Step Content */}
                            {renderStep()}
                        </div>

                        {/* Right Sidebar - Hidden on mobile */}
                        <div className="w-full md:w-96 bg-white p-8 border-l border-gray-200 hidden md:block">
                            <div className="mb-8">
                                <div className="text-right mb-4">
                                    <div className="flex items-center justify-end mb-2">
                                        <span className="text-orange-500 font-bold mr-2">🏠 Capterra</span>
                                        <div className="flex text-purple-500">{'★'.repeat(5)}</div>
                                        <span className="ml-2 font-bold">5.0</span>
                                    </div>
                                    <p className="text-sm text-gray-600 italic">One of the best software tools out there for small businesses</p>
                                </div>
                            </div>

                            <div className="bg-purple-600 text-white p-6 rounded-lg mb-8">
                                <div className="text-xl font-bold mb-4">Shift Swap</div>
                                <div className="border-l-4 border-purple-400 pl-4">
                                    <div className="font-medium">Scheduling</div>
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-lg font-bold text-gray-900 mb-4">100k+ businesses love us</div>
                                <div className="flex justify-center items-center space-x-8">
                                    <div className="text-center">
                                        <div className="flex text-purple-500 mb-1">{'★'.repeat(4)}☆</div>
                                        <div className="text-sm font-medium">4.6 of 5</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex text-purple-500 mb-1">{'★'.repeat(5)}</div>
                                        <div className="text-sm font-medium">4.9 out of 5</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex text-purple-500 mb-1">{'★'.repeat(4)}☆</div>
                                        <div className="text-sm font-medium">4.8 of 5</div>
                                    </div>
                                </div>
                            </div>

                            {currentStep === 1 && (
                                <div className="mt-8 text-right">
                                    <p className="text-lg font-medium text-gray-900 mb-2">Simplify scheduling, time clocks, and payroll for your team with Shift Swap.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Success Modal */}
                    {renderSuccessModal()}
                </>
            ) : (
                <div className="min-h-screen">
                    {role === 'employee' ? (
                        <>
                            {/* Header */}
                            <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
                                <div className="flex items-center justify-between max-w-7xl mx-auto">
                                    <div className="text-2xl font-bold text-purple-600">Shift Swap employee</div>
                                    <div className="text-sm text-gray-600">
                                        {currentStep === 2 ? 'Already have an account?' : 'Have an account?'}{' '}
                                        <Link href="/signin" className="text-purple-600 font-medium hover:underline">
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                            </header>

                            <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
                                {/* Main Content */}
                                <div className="flex-1 px-6 py-12">
                                    {/* Progress Bar */}
                                    <div className="mb-8 max-w-md">
                                        <div className="text-sm text-gray-600 mb-2">
                                            STEP {currentStep} OF {totalSteps}
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
                                        </div>
                                    </div>

                                    {/* Step Content */}
                                    {renderStepE()}
                                </div>

                                {/* Right Sidebar - Hidden on mobile */}
                                <div className="w-full md:w-96 bg-white p-8 border-l border-gray-200 hidden md:block">
                                    <div className="mb-8">
                                        <div className="text-right mb-4">
                                            <div className="flex items-center justify-end mb-2">
                                                <span className="text-orange-500 font-bold mr-2">🏠 Capterra</span>
                                                <div className="flex text-purple-500">{'★'.repeat(5)}</div>
                                                <span className="ml-2 font-bold">5.0</span>
                                            </div>
                                            <p className="text-sm text-gray-600 italic">One of the best software tools out there for small companies</p>
                                        </div>
                                    </div>

                                    <div className="bg-purple-600 text-white p-6 rounded-lg mb-8">
                                        <div className="text-xl font-bold mb-4">Shift Swap</div>
                                        <div className="border-l-4 border-purple-400 pl-4">
                                            <div className="font-medium">Scheduling</div>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900 mb-4">100k+ companies love us</div>
                                        <div className="flex justify-center items-center space-x-8">
                                            <div className="text-center">
                                                <div className="flex text-purple-500 mb-1">{'★'.repeat(4)}☆</div>
                                                <div className="text-sm font-medium">4.6 of 5</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex text-purple-500 mb-1">{'★'.repeat(5)}</div>
                                                <div className="text-sm font-medium">4.9 out of 5</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="flex text-purple-500 mb-1">{'★'.repeat(4)}☆</div>
                                                <div className="text-sm font-medium">4.8 of 5</div>
                                            </div>
                                        </div>
                                    </div>

                                    {currentStep === 1 && (
                                        <div className="mt-8 text-right">
                                            <p className="text-lg font-medium text-gray-900 mb-2">Simplify scheduling, time clocks, and payroll for your team with Shift Swap.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Success Modal */}
                            {renderSuccessModal()}
                        </>
                    ) : (
                        <p className="text-lg text-gray-600">Access restricted. Please contact your administrator.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default RegisterPage;
