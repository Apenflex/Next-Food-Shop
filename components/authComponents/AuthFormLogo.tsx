// import Image from "next/image"

const AuthFormLogo = ({ title }) => {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=teal&shade=600" alt="Your Company" />
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">{title}</h2>
        </div>
    )
}
export default AuthFormLogo
