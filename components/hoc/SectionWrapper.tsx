// 'use client'
import { FunctionComponent } from 'react'

import { styles } from '@/components/styles'

interface StarWrapperProps {
    idName: string
}

const SectionWrapper = (Component: FunctionComponent, idName: string) =>
    function HOC() {
        return (
            <section className={`${styles['padding']} max-w-7xl mx-auto relative z-0`}>
                <span className="hash-span" id={idName}>
                    &nbsp;
                </span>

                <Component />
            </section>
        )
    }

export default SectionWrapper
