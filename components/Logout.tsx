'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { logout } from '../lib/api'

const Logout = () => {
    const router = useRouter()
    useEffect(() => {
        const handleLogout = async () => {
            await logout()
            router.push('/')
            if (typeof window === 'undefined') {
                // @ts-ignore
                window.location.replace('/')
            }
        }

        handleLogout()
    }, [router])

    return null 
}
export default Logout