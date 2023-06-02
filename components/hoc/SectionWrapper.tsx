// 'use client'
import { FunctionComponent } from 'react'

import { styles } from '@/components/styles'

const SectionWrapper = (Component: FunctionComponent) =>
    function HOC() {
        return (
            <section className={`${styles['padding']} max-w-7xl mx-auto relative z-0 h-screen`}>
                <Component />
            </section>
        )
    }

export default SectionWrapper
