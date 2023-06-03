import Image from 'next/image'
import Link from 'next/link'

const ShopCart = () => {
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
                            className="p-2 shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Enter your address"
                        />
                    </div>
                </div>
            </div>

            <div className="pointer-events-auto w-1/2 h-full border-2 border-neutral-500 rounded-lg shadow-md shadow-neutral-700">
                <div className="flex h-full flex-col overflow-y-scroll shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-2 sm:px-3">
                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-neutral-500">
                                    <li className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-500">
                                            <Image
                                                width={200}
                                                height={200}
                                                src="https://tailwindui.com/Image/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                                                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href="#">Throwback Hip Bag</a>
                                                    </h3>
                                                    <p className="ml-4">$90.00</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">Qty 1</p>

                                                <div className="flex">
                                                    <button type="button" className="p-1 rounded-md bg-teal-600 hover:text-white hover:bg-teal-700 shadow-md shadow-neutral-500">
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-500">
                                            <Image
                                                width={200}
                                                height={200}
                                                src="https://tailwindui.com/Image/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                                                alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href="#">Medium Stuff Satchel</a>
                                                    </h3>
                                                    <p className="ml-4">$32.00</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">Blue</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">Qty 1</p>

                                                <div className="flex">
                                                    <button type="button" className="font-medium text-teal-600 hover:text-teal-500">
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-500">
                                            <Image
                                                width={200}
                                                height={200}
                                                src="https://tailwindui.com/Image/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                                                alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href="#">Medium Stuff Satchel</a>
                                                    </h3>
                                                    <p className="ml-4">$32.00</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">Blue</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">Qty 1</p>

                                                <div className="flex">
                                                    <button type="button" className="font-medium text-teal-600 hover:text-teal-500">
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    {/* More products... */}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-neutral-500 px-2 py-4 sm:px-4">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>$262.00</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="flex justify-end mt-2">
                            <button type="button" className="btnShops bg-teal-600">
                                Checkout
                            </button>
                        </div>
                        <div className="mt-2 flex justify-end text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <Link href={'/'} className="font-medium text-teal-600 hover:text-teal-500">
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShopCart