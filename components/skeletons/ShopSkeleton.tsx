const ShopSkeleton = () => {
    return (
        <div className="flex w-full gap-2 max-h-[550px]">
            <div className="flex flex-col items-center basis-1/4 p-5 border-2 border-neutral-500 rounded-lg shadow-md shadow-neutral-700">
                <h2 className="mb-4 text-xl">Shops</h2>
                <div className="flex flex-col items-center py-3 gap-4 w-full overflow-y-scroll">
                    {[1, 2, 3, 4, 5].map((shopId) => (
                        <div key={shopId} className="w-full h-8 bg-gray-300 animate-pulse rounded"></div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col basis-3/4 p-5 border-2 border-neutral-500 rounded-lg overflow-y-scroll shadow-md shadow-neutral-700">
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((productId) => (
                        <div key={productId} className="flex flex-col p-3 border-2 border-neutral-500 rounded-lg shadow-md shadow-neutral-700">
                            <div className="w-full h-40 bg-gray-300 animate-pulse rounded-sm"></div>
                            <div className="flex justify-between py-2">
                                <span className="w-1/2 h-4 bg-gray-300 animate-pulse"></span>
                                <span className="w-1/4 h-4 bg-gray-300 animate-pulse"></span>
                            </div>
                            <div className="flex justify-end">
                                <button className="btnAddToCart w-1/2 h-10 bg-gray-300 animate-pulse rounded"></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ShopSkeleton
