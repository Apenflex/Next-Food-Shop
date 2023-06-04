const CartSkeleton = () => {
    return (
        <div className="pointer-events-auto w-1/2 h-full border-2 border-neutral-500 rounded-lg shadow-md shadow-neutral-700">
            <div className="flex h-full flex-col overflow-y-scroll shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-2 sm:px-3">
                    <div className="mt-8">
                        <div className="flow-root">{/* Placeholder for ToastContainer */}</div>
                        <ul role="list" className="-my-6 divide-y divide-neutral-500">
                            {/* Placeholder for cartProducts */}
                            {/* Skeleton for each product */}
                            {[1, 2].map((productId) => (
                                <li key={productId} className="flex py-6">
                                    <div className="h-40 w-52 flex-shrink-0 overflow-hidden rounded-md border border-neutral-500 bg-neutral-300 animate-pulse"></div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900 animate-pulse">
                                                <div className="h-4 bg-neutral-300 rounded animate-pulse"></div>
                                                <div className="h-4 w-12 bg-neutral-300 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex gap-2 items-center">
                                                <div className="h-6 w-12 bg-neutral-300 rounded animate-pulse"></div>
                                            </div>
                                            <div className="flex">
                                                <div className="h-6 w-20 bg-teal-600 rounded-md animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-500 px-2 py-4 sm:px-4">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <div className="h-4 w-12 bg-neutral-300 rounded"></div>
                        <div className="h-4 w-16 bg-neutral-300 rounded"></div>
                    </div>
                    <div className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</div>
                    <div className="flex justify-end mt-2">
                        <div className="h-10 w-24 bg-teal-600 rounded-md"></div>
                    </div>
                    <div className="mt-2 flex justify-end text-center text-sm text-gray-500">
                        <div className="h-4 w-36 bg-teal-600 rounded-md"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CartSkeleton