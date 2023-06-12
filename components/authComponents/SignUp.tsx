'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify'

import InputField from '@/components/authComponents/InputField'
import TermsService from '@/components/authComponents/TermsService'
import SectionWrapper from '@/components/hoc/SectionWrapper'
import { signup } from '@/lib/api'
import AuthenticationSection from '@/sections/Authentication'

const SignUp = () => {
    const router = useRouter()
    const initial = { name: '', email: '', password: '' }
    const [formData, setFormData] = useState({ ...initial })

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            try {
                await signup(formData)
                setFormData({ ...initial })
                toast.success('You have successfully signed up!')
                router.push('/')
                router.refresh()
            } catch (error) {
                toast.warn('The email you entered is already in use.')
                // console.log(error)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [formData.name, formData.email, formData.password]
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
                        id="name"
                        name="Name"
                        type="text"
                        value={formData.name}
                        autoComplete="name"
                        required={true}
                        className="authFormInput"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    />

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

                    <InputField
                        id="password"
                        name="Enter password"
                        type="password"
                        value={formData.password}
                        autoComplete="new-password"
                        required={true}
                        className="authFormInput"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    />
                    <div>
                        <button type="submit" className="btnSigninup">
                            Sign up
                        </button>
                    </div>
                </form>
                <p className="mt-5 text-center text-sm text-gray-500">
                    Have an account? {''}
                    <Link href="/sign-in" className="font-semibold leading-6 text-teal-600 hover:text-teal-500">
                        Sign in
                    </Link>
                </p>
                <TermsService />
            </div>
        </>
    )
}
const WrappedSignUp = SectionWrapper(AuthenticationSection(SignUp, 'Sign up for an account'), '')
export default WrappedSignUp
