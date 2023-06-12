import { FunctionComponent } from 'react'

import AuthFormLogo from '@/components/authComponents/AuthFormLogo'

/**
 * Renders a section for authentication, including a logo and the provided component.
 *
 * @param {FunctionComponent} Component - The component to be rendered within the authentication section.
 * @param {string} title - The title of the authentication section.
 * @returns {JSX.Element} - The rendered authentication section.
 */
const AuthenticationSection = (Component: FunctionComponent, title: string) =>
    function HOC() {
        return (
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
                <AuthFormLogo title={title} />
                <Component />
            </div>
        )
    }

export default AuthenticationSection
