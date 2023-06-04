'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify'

import ShopSkeleton from './skeletons/ShopSkeleton'

const AllProducts = async () => {
    const response = await axios.get('/api/getproducts')
    return response.data
}

const Shops = async () => {
    const response = await axios.get('/api/getshops')
    return response.data
}

const Shop = () => {
    const [selectedShopId, setSelectedShopId] = useState(null)
    const [allShops, setAllShops] = useState(false)
    const AllProductsQuery = useQuery({
        queryFn: AllProducts,
        queryKey: ['products'],
    })

    const shopsQuery = useQuery({
        queryFn: Shops,
        queryKey: ['shops'],
    })

    const { data: products, isLoading: productsLoading, error: productsError } = AllProductsQuery
    const { data: shops, isLoading: shopsLoading, error: shopsError } = shopsQuery

    if (productsError) return <div>{productsError.message}</div>
    if (shopsError) return <div>{shopsError.message}</div>
    if (productsLoading || shopsLoading) return <ShopSkeleton />

    const handleShopClick = (shopId) => {
        setSelectedShopId(shopId)
        setAllShops(true)
    }

    const handleAllShopsClick = () => {
        setSelectedShopId(null)
        setAllShops(false)
    }

    const filteredProducts = selectedShopId ? products?.filter((product) => product.shopId === selectedShopId) : products

    const handleAddToCart = async (product) => { 
        try {
            await axios.post('/api/addtocart', { productId: product.id, quantity: 1, price: product.price, name: product.name, image: product.image });
            toast.success('Product added to cart!')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex w-full gap-2 max-h-[550px]">
            <div className="flex flex-col items-center basis-1/4 p-5 border-2 border-neutral-500 rounded-lg shadow-md shadow-neutral-700">
                <div className="flex flex-col items-center">
                    <h2 className="mb-4 text-xl">Shops</h2>
                    <button className={`${allShops ? 'flex' : 'hidden'} allShops`} onClick={() => handleAllShopsClick()}>
                        All goods
                    </button>
                </div>
                <div className="flex flex-col items-center py-3 gap-4 w-full overflow-y-scroll">
                    {shops?.map((shop: any) => (
                        <button key={shop.id} className={`${selectedShopId === shop.id ? 'bg-teal-800' : 'bg-teal-600'} btnShops`} onClick={() => handleShopClick(shop.id)}>
                            {shop.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col basis-3/4 p-5 border-2 border-neutral-500 rounded-lg overflow-y-scroll shadow-md shadow-neutral-700">
                    <ToastContainer
                        position="top-center"
                        autoClose={1400}
                        transition={Slide}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover={false}
                        theme="dark"
                    />
                <div className="grid grid-cols-2 gap-4">
                    {filteredProducts?.map((product: any) => (
                        <div key={product.id} className="flex flex-col p-3 border-2 border-neutral-500 rounded-lg shadow-md shadow-neutral-700">
                            <Image src={product.image} width={500} height={200} alt="some tasty good" className="w-[100%] h-[200px] object-cover rounded-sm" />
                            <div className="flex justify-between py-2">
                                <span className="text-left">{product.name}</span>
                                <span className="text-right">{product.price} $</span>
                            </div>
                            <div className="flex justify-end">
                                <button className="btnAddToCart" onClick={() => handleAddToCart(product)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Shop