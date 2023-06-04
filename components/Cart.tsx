'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify'

import CartSkeleton from './skeletons/CartSkeleton'

const ProductsToCart = async () => {
    console.log('render Cart');
    const response = await axios.get('/api/gettocart')
    return response.data
}

const Cart = ({ formData }) => {
    console.log(formData);
    const [cartProducts, setCartProducts] = useState([])
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    })

    useEffect(() => {
        validateForm()
    }, [formData])

    const validateForm = () => {
        const { name, email, phone, address } = formData
        const newErrors = { name: '', email: '', phone: '', address: '' }

        if (!name) {
            newErrors.name = 'Name is required'
        }

        if (!email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid'
        }

        if (!phone) {
            newErrors.phone = 'Phone is required'
        } else if (!/^\+38\d{10}$/.test(phone)) {
            newErrors.phone = 'Phone number is invalid'
        }

        if (!address) {
            newErrors.address = 'Address is required'
        }

        setErrors(newErrors)
    }

    const ProductsToCartQuery = useQuery({
        queryFn: ProductsToCart,
        queryKey: ['products'],
    })

    const { data: fetchedProducts, isLoading, error } = ProductsToCartQuery

    const totalPrice = useMemo(() => {
        if (cartProducts && cartProducts.length > 0) {
            return cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
        }
        return 0
    }, [cartProducts])

    useEffect(() => {
        setCartProducts(fetchedProducts)
    }, [fetchedProducts])

    const handleCountChange = useCallback(async (product, count) => {
        try {
            await axios.put('/api/updatecart', { cartItemId: product.id, quantity: count })
            setCartProducts((prev) => prev.map((item) => (item.id === product.id ? { ...item, quantity: count } : item)))
            toast.success('Product quantity updated!')
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleRemoveFromCart = useCallback(async (product) => {
        try {
            await axios.delete(`/api/removefromcart?cartItemId=${product.id}`)
            setCartProducts((prev) => prev.filter((item) => item.id !== product.id))
            toast.warn('Product removed from cart!')
        } catch (error) {
            console.log(error)
        }
    }, [])

    const createOrder = async () => {
        // Перевірка наявності товарів у корзині
        if (cartProducts.length === 0) {
            toast.error('Please add items to your cart')
            return
        }
        // Перевірка наявності помилок в стані errors
        if (Object.values(errors).some((error) => error !== '')) {
            // Виведення повідомлення про помилку для кожного поля
            if (errors.name) {
                toast.error(errors.name)
            }
            if (errors.email) {
                toast.error(errors.email)
            }
            if (errors.phone) {
                toast.error(errors.phone)
            }
            if (errors.address) {
                toast.error(errors.address)
            }
            return
        }

        try {
            await axios.post('/api/createorder', { formData, cartProducts, totalPrice })
            toast.success('Order created!')
        } catch (error) {
            console.log(error)
        }
    }

    if (error) return <div>{error.message}</div>
    if (isLoading) return <CartSkeleton />

    return (
        <div className="pointer-events-auto w-1/2 h-full border-2 border-neutral-500 rounded-lg shadow-md shadow-neutral-700">
            <div className="flex h-full flex-col overflow-y-scroll shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-2 sm:px-3">
                    <div className="mt-8">
                        <div className="flow-root">
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
                            <ul role="list" className="-my-6 divide-y divide-neutral-500">
                                {cartProducts?.map((product) => (
                                    <li key={product.id} className="flex py-6">
                                        <div className="h-40 w-52 flex-shrink-0 overflow-hidden rounded-md border border-neutral-500">
                                            <Image
                                                width={210}
                                                height={160}
                                                src={product.image}
                                                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>{product.name}</h3>
                                                    <p className="ml-4">${product.price * product.quantity}.00</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="flex gap-2 items-center">
                                                    <input
                                                        type="number"
                                                        id="quantity"
                                                        name="quantity"
                                                        className="w-20 p-1 text-center bg-neutral-300"
                                                        value={product.quantity}
                                                        min="1"
                                                        onChange={(event) => handleCountChange(product, parseInt(event.target.value, 10))}
                                                    />
                                                </div>
                                                <div className="flex">
                                                    <button
                                                        type="button"
                                                        className="p-1 rounded-md bg-teal-600 hover:text-white hover:bg-teal-700 shadow-md shadow-neutral-500"
                                                        onClick={() => handleRemoveFromCart(product)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-500 px-2 py-4 sm:px-4">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$ {totalPrice} </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="flex justify-end mt-2">
                        <button type="submit" className="btnShops bg-teal-600" onClick={createOrder}>
                            Submit
                        </button>
                    </div>
                    <div className="mt-2 flex justify-end text-center text-sm text-gray-500">
                        <p>
                            or{' '}
                            <Link href={'/'} className="font-medium text-teal-600 hover:text-teal-500">
                                Continue Shopping
                                {/* <span aria-hidden="true"> &rarr;</span> */}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart