'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify'

import InputField from '@/components/authComponents/InputField'
import SectionWrapper from '@/components/hoc/SectionWrapper'
import { resetPassword, sendRecoverCode } from '@/lib/api'
import { delay } from '@/lib/async'
import AuthenticationSection from '@/sections/Authentication'

const ForgotPassword = () => {
    const router = useRouter()
    const [showReset, setShowReset] = useState(false)

    const initialForm = { email: '', newPassword: '' }
    const [formData, setFormData] = useState({ ...initialForm })

    const initialCode = { isCodeSent: false, inputCode: '' }
    const [codeData, setCodeData] = useState({ ...initialCode })

    const handleSendCode = useCallback(
        async (e: FormEvent) => {
            e.preventDefault()

            try {
                await sendRecoverCode({ email: formData.email })
                setCodeData((prev) => ({ ...prev, isCodeSent: true }))
                toast.success('Code sent to your Email!')
            } catch (error) {
                setCodeData((prev) => ({ ...prev, isCodeSent: false }))
                let Errormessage = error.message.replace(/"/g, '')
                toast.warn(Errormessage)
                // console.log(error)
            }
        },
        [formData.email]
    )

    const handleResetPassword = async (e: FormEvent) => {
        e.preventDefault()

        try {
            await resetPassword({ email: formData.email, newPassword: formData.newPassword, code: codeData.inputCode })
            await delay(800)
            setFormData({ ...initialForm })
            setCodeData({ ...initialCode })
            toast.success('Password reset successfully!')
            router.push('/sign-in')
        } catch (error) {
            let Errormessage = error.message.replace(/"/g, '')
            toast.warn(Errormessage)
            // console.log(error)
        }
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
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-5" action="#" method="POST">
                    <InputField
                        id="email"
                        name="Email address"
                        type="email"
                        value={formData.email}
                        autoComplete="email"
                        required={true}
                        className="authFormInput"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    />
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
                            {codeData.isCodeSent && (
                                <motion.div animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.8 }} transition={{ ease: 'easeOut' }}>
                                    <InputField
                                        id="code"
                                        name="Enter code from email"
                                        type="text"
                                        value={codeData.inputCode}
                                        autoComplete=""
                                        required={true}
                                        className="authFormInput"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCodeData((prev) => ({ ...prev, inputCode: e.target.value }))}
                                    />
                                </motion.div>
                            )}
                            <motion.div animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.8 }} transition={{ ease: 'easeOut' }}>
                                <div className="flex gap-1">
                                    <button type="submit" onClick={handleSendCode} className="btnSendCode">
                                        Send code
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                    {codeData.isCodeSent && (
                        <motion.div animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.8 }} transition={{ ease: 'easeOut' }}>
                            <InputField
                                id="newPassword"
                                name="New password"
                                type="password"
                                value={formData.newPassword}
                                autoComplete="current-password"
                                required={true}
                                className="authFormInput"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, newPassword: e.target.value }))}
                            />
                            <div className="flex justify-end">
                                <button type="submit" onClick={handleResetPassword} className="btnResetPassword">
                                    Reset Password
                                </button>
                            </div>
                        </motion.div>
                    )}
                </form>
            </div>
        </>
    )
}
const WrappedForgotPassword = SectionWrapper(AuthenticationSection(ForgotPassword, 'Reset password to your account'), '')
export default WrappedForgotPassword
