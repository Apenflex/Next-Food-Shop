'use client'
import 'react-toastify/dist/ReactToastify.css'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify'

import InputField from '@/components/authComponents/InputField'
import TermsService from '@/components/authComponents/TermsService'
import SectionWrapper from '@/components/hoc/SectionWrapper'
import { signin } from '@/lib/api'
import AuthenticationSection from '@/sections/Authentication'

const SignIn = () => {
    const router = useRouter()
    const initial = { email: '', password: '' }
    const [formData, setFormData] = useState({ ...initial })

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            try {
                await signin(formData)
                setFormData({ ...initial })
                toast.success('You have successfully signed in!')
                router.push('/')
                router.refresh()
            } catch (error) {
                let Errormessage = error.message.replace(/"/g, '')
                toast.warn(Errormessage)
                // console.log(error)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [formData.email, formData.password]
    )
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1400}
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
                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
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
                    <div>
                        <InputField
                            id="password"
                            name="Password"
                            type="password"
                            value={formData.password}
                            autoComplete="current-password"
                            required={true}
                            className="authFormInput"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                        />

                        <div className="flex text-sm mt-2">
                            <Link href="/forgotpassword" className="w-full text-end font-semibold text-teal-600 hover:text-teal-500">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="btnSigninup">
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Need an account?{' '}
                    <Link href="/signup" className="font-semibold leading-6 text-teal-600 hover:text-teal-500">
                        Sign up
                    </Link>
                </p>
                <TermsService />
            </div>
        </>
    )
}
const WrappedSignIn = SectionWrapper(AuthenticationSection(SignIn, 'Sign in to your account'), '')
export default WrappedSignIn
