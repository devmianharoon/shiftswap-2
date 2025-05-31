// "use client";

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// const signup = () => {

//       const router = useRouter();

//     const handleSelectRole = (role: 'owner' | 'employee') => {
//         if (role === 'owner') {
//             router.push('/register?type=owner');
//         } else {
//             router.push('/register?type=employee');
//         }
//     };




//     return (
//         <div className="flex min-h-screen">
//             {/* Left Section */}
//             <div className="flex-1 bg-white p-8 flex flex-col justify-center">
//                 {/* <div className="text-purple-600 text-sm font-medium mb-8">homebase</div> */}
//                 <h1 className="text-5xl font-bold text-gray-900 mb-4">LET,S MAKE WORK EASIER.</h1>
//                 {/* <p className="text-lg text-purple-600">How will you be using Homebase?</p> */}
//             </div>

//             {/* Right Section */}
//             <div className="flex-1 bg-gray-100 p-8 flex flex-col justify-center items-center">
//                 <Link href="/signin" className="text-purple-600 text-sm font-medium mb-8">
//                     Already have an account? <span className="underline">Sign in</span>
//                 </Link>
//                 <div className="space-y-4">
//                     <Link href={'/register'}>
//                         <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between w-80 mb-4">
//                             <div>
//                                 <h2 className="text-3xl font-semibold text-gray-900">Do you manage a business?</h2>
//                                 <div className="flex gap-1 items-center">
//                                     <p className="text-purple-600">Set up a new business</p>
//                                     <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-600">
//                                         <path
//                                             fill="currentColor"
//                                             d="M22.06 13.059a1.502 1.502 0 0 0 0-2.123l-7.5-7.5a1.502 1.502 0 0 0-2.124 2.123l4.945 4.94H3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h14.377L12.44 18.44a1.502 1.502 0 0 0 2.123 2.124l7.5-7.5-.005-.005Z"
//                                         ></path>
//                                     </svg>
//                                 </div>
//                             </div>
//                             <svg className="w-12 h-12 text-gray-400 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
//                             </svg>
//                         </div>
//                     </Link>
//                     <Link href={'/signin'}>
//                         <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between w-80">
//                             <div>
//                                 <h2 className="text-3xl font-semibold text-gray-900">Are you an employee joining a team?</h2>

//                                 <div className="flex gap-1 items-center">
//                                     <p className="text-purple-600">Sign up with your email</p>
//                                     <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-600">
//                                         <path
//                                             fill="currentColor"
//                                             d="M22.06 13.059a1.502 1.502 0 0 0 0-2.123l-7.5-7.5a1.502 1.502 0 0 0-2.124 2.123l4.945 4.94H3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h14.377L12.44 18.44a1.502 1.502 0 0 0 2.123 2.124l7.5-7.5-.005-.005Z"
//                                         ></path>
//                                     </svg>
//                                 </div>
//                             </div>
//                             <svg className="w-12 h-12 text-gray-400 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//                             </svg>
//                         </div>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default signup;


"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const router = useRouter();

    const handleSelectRole = (role: 'owner' | 'employee') => {
        if (role === 'owner') {
            router.push('/register?type=owner');
        } else {
            router.push('/register?type=employee');
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Section */}
            <div className="flex-1 bg-white p-8 flex flex-col justify-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">LET’S MAKE WORK EASIER.</h1>
            </div>

            {/* Right Section */}
            <div className="flex-1 bg-gray-100 p-8 flex flex-col justify-center items-center">
                <Link href="/signin" className="text-purple-600 text-sm font-medium mb-8">
                    Already have an account? <span className="underline">Sign in</span>
                </Link>

                <div className="space-y-4">
                    <div className='flex flex-col'>
                    <button onClick={() => handleSelectRole('owner')} className="w-80">
                        <div className="bg-white p-6 rounded-lg shadow-md text-left flex items-center justify-between w-full mb-4">
                            <div>
                                <h2 className="text-3xl font-semibold text-gray-900">Do you manage a business?</h2>
                                <div className="flex gap-1 items-center">
                                    <p className="text-purple-600">Set up a new business</p>
                                    <svg
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="text-purple-600"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M22.06 13.059a1.502 1.502 0 0 0 0-2.123l-7.5-7.5a1.502 1.502 0 0 0-2.124 2.123l4.945 4.94H3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h14.377L12.44 18.44a1.502 1.502 0 0 0 2.123 2.124l7.5-7.5-.005-.005Z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <svg className="w-12 h-12 text-gray-400 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                        </div>
                    </button>

                    <button onClick={() => handleSelectRole('employee')} className="w-80">
                        <div className="bg-white p-6 rounded-lg shadow-md text-left flex items-center justify-between w-full">
                            <div>
                                <h2 className="text-3xl font-semibold text-gray-900">Are you an employee joining a team?</h2>
                                <div className="flex gap-1 items-center">
                                    <p className="text-purple-600">Sign up with your email</p>
                                    <svg
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className="text-purple-600"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M22.06 13.059a1.502 1.502 0 0 0 0-2.123l-7.5-7.5a1.502 1.502 0 0 0-2.124 2.123l4.945 4.94H3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h14.377L12.44 18.44a1.502 1.502 0 0 0 2.123 2.124l7.5-7.5-.005-.005Z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <svg className="w-12 h-12 text-gray-400 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
