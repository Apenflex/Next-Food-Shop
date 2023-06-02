'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify'

import { sendEmail } from '../lib/api'
import { delay } from '../lib/async'
import SectionWrapper from './hoc/SectionWrapper'

const ForgotPassword = () => {
    const router = useRouter()
    const [showReset, setShowReset] = useState(false)
    const initial = { email: '', code: '' }
    const [formData, setFormData] = useState({ ...initial })
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [inputCode, setInputCode] = useState('')
    const [isReset, setIsReset] = useState(false)

    const handleSendCode = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()

            try {
                const code = Math.floor(100000 + Math.random() * 900000).toString()
                setFormData((prev) => ({ ...prev, code: code }))
                // console.log(formData)
                await sendEmail({ email: formData.email, code: code })
                toast.success('Code sent to your Email!')
                setIsCodeSent(true)
            } catch (error) {
                toast.warn('Please check your email and try again.')
                setIsCodeSent(false)
                console.log(error)
            }
        },
        [formData.email]
    )

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
    }
    
    const handleSubmitNewPassword = async (e) => {
        e.preventDefault()
    //     if (formData.code === inputCode && isCodeSent) {
    //         // toast.success('Password reset successful!')
    //         await delay(3100)
    //         // router.replace('/sign-in')
    //     } else {
    //         toast.warn('Please enter your code and try again.')
    //     }
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                transition={Slide}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=600" alt="Your Company" />
                    <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">Reset password</h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="reset-password"
                                name="reset-password"
                                type="checkbox"
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                                onClick={() => setShowReset(!showReset)}
                            />
                            <label htmlFor="reset-password" className="ml-2 block text-sm font-medium text-white">
                                Yes, I really want to reset my password
                            </label>
                        </div>
                        {showReset && (
                            <div className="" id="reset-password-fields">
                                {isCodeSent && (
                                    <div>
                                        <label htmlFor="code" className="block text-sm font-medium leading-6 text-white">
                                            Enter code from email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="code"
                                                name="code"
                                                type="text"
                                                value={inputCode}
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => setInputCode(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="flex gap-1">
                                    <button
                                        type="submit"
                                        onClick={handleSendCode}
                                        className={`${
                                            isCodeSent ? 'w-1/2' : 'w-full'
                                        } flex justify-center py-2 px-2 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                                    >
                                        Send code
                                    </button>
                                    {isCodeSent && (
                                        <button
                                            type="submit"
                                            onClick={handleResetPassword}
                                            className="w-1/2 flex justify-center py-2 px-2 mt-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Reset Password
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                onClick={(e) => handleSubmitNewPassword(e)}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SectionWrapper(ForgotPassword, '')