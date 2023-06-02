'use client'
import { useRouter } from 'next/navigation'

import { logout } from '../lib/api'

const Logout = async () => {
    const router = useRouter()
    await logout()
    router.push('/')
    router.refresh()
    // return (
    //     <>
    //         <h1>Logout</h1>
    //     </>
    // )
}
export default Logout