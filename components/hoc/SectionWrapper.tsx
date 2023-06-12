// 'use client'
import { FunctionComponent } from 'react'

import { styles } from '@/components/styles'

/**
 * Wraps the provided component with a section wrapper.
 *
 * @param {FunctionComponent} Component - The component to be wrapped.
 * @param {string} idName - The ID attribute for the section wrapper.
 * @returns {JSX.Element} - The wrapped component within a section wrapper.
 */
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
