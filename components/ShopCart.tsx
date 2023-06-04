'use client'
import { useCallback, useState } from 'react'

import Cart from './Cart'

interface FormData {
    name: string
    email: string
    phone: string
    address: string
}

const ShopCart = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        address: '',
    })

    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }))
        },
        [setFormData]
    )

    return (
        <div className="flex w-full gap-2 h-[550px] max-h-[550px]">
            <div className="flex flex-col items-center justify-center w-1/2 h-full p-16 border-2 border-neutral-500 rounded-lg shadow-md shadow-neutral-700">
                <div className="flex flex-col items-center space-y-4 gap-6 w-full">
                    <div className="w-5/6">
                        <label htmlFor="name" className="block font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="p-2 shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="w-5/6">
                        <label htmlFor="email" className="block font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="p-2 shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="w-5/6">
                        <label htmlFor="phone" className="block font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="p-2 shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="w-5/6">
                        <label htmlFor="address" className="block font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="p-2 shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Enter your address"
                        />
                    </div>
                </div>
            </div>
            <Cart formData={formData} />
        </div>
    )
}
export default ShopCart