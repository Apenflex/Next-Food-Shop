import Image from 'next/image'

const Shop = () => {
    return (
        <div className="flex w-full gap-2 max-h-[550px]">
            <div className="flex flex-col items-center basis-1/4 p-5 border-2 border-neutral-500 rounded-lg shadow-md shadow-neutral-700">
                <h2 className="mb-4 text-xl">Shops</h2>
                <div className="flex flex-col items-center py-3 gap-4 w-full overflow-y-scroll">
                    <button className="btnShops">Shop 1</button>
                    <button className="btnShops">Shop 2</button>
                    <button className="btnShops">Shop 3</button>
                    <button className="btnShops">Shop 4</button>
                    <button className="btnShops">Shop 5</button>
                </div>
            </div>
            <div className="flex flex-col basis-3/4 p-5 border-2 border-neutral-500 rounded-lg overflow-y-scroll shadow-md shadow-neutral-700">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col p-3 border-2 border-neutral-500 rounded-lg shadow-md shadow-neutral-700">
                        <Image src="" width={40} height={40} alt="some tasty good" className="w-[100%] h-[200px] object-contain" />
                        <div className="flex justify-between py-2">
                            <span className="text-left">Title</span>
                            <span className="text-right">Price</span>
                        </div>
                        <div className="flex justify-end">
                            <button className="btnAddToCart">Add to Cart</button>
                        </div>
                    </div>
                    <div className="flex flex-col border-2 border-neutral-500 rounded-lg">
                        <Image src="" width={40} height={40} alt="shop1" className="w-[100%] h-[200px] object-contain" />
                        <div>
                            <span>Title</span>
                            <span>Price</span>
                        </div>
                        <button>Add to Cart</button>
                    </div>
                    <div className="flex flex-col border-2 border-neutral-500 rounded-lg">
                        <Image src="" width={40} height={40} alt="shop1" className="w-[100%] h-[200px] object-contain" />
                        <div>
                            <span>Title</span>
                            <span>Price</span>
                        </div>
                        <button>Add to Cart</button>
                    </div>
                    <div className="flex flex-col border-2 border-neutral-500 rounded-lg">
                        <Image src="" width={40} height={40} alt="shop1" className="w-[100%] h-[200px] object-contain" />
                        <div>
                            <span>Title</span>
                            <span>Price</span>
                        </div>
                        <button>Add to Cart</button>
                    </div>
                    <div className="flex flex-col border-2 border-neutral-500 rounded-lg">
                        <Image src="" width={40} height={40} alt="shop1" className="w-[100%] h-[200px] object-contain" />
                        <div>
                            <span>Title</span>
                            <span>Price</span>
                        </div>
                        <button>Add to Cart</button>
                    </div>
                    <div className="flex flex-col border-2 border-neutral-500 rounded-lg">
                        <Image src="" width={40} height={40} alt="shop1" className="w-[100%] h-[200px] object-contain" />
                        <div>
                            <span>Title</span>
                            <span>Price</span>
                        </div>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Shop