// 'use client'
import '@/styles/globals.css'

import { cookies } from 'next/headers'

import { NavBar } from '@/components'
import { delay } from '@/lib/async'
import { getUserFromCookie } from '@/lib/auth'

import QueryWrapper from './QueryWrapper'

export const metadata = {
    title: 'Burger Shop',
    description: 'Burger Shop is a demo app built with Next.js and Tailwind CSS.',
}

const getData = async () => {
    await delay(1500)
    const user = await getUserFromCookie(cookies())
    return user
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const user = await getData()
    // console.log('render layout')
    return (
        <html lang="en">
            <body className="bg-neutral-400 max-h-screen">
                <QueryWrapper>
                    <header>
                        <NavBar user={user?.name} />
                    </header>
                    <main className="container mx-auto">{children}</main>
                </QueryWrapper>
            </body>
        </html>
    )
}
