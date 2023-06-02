// import { cookies } from 'next/headers'

import { About } from '@/components'
// import { NavBar } from '@/components'
// import { delay } from '@/lib/async'
// import { getUserFromCookie } from '@/lib/auth'

// const getData = async () => {
//     await delay(2300)
//     const user = await getUserFromCookie(cookies())
//     return user
// }

export default function Home() {
    // const user = await getData()
    return (
        <>
            {/* <NavBar user={user?.name} /> */}
            <About />
        </>
    )
}