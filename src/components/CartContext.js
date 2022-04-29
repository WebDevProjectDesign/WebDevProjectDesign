import react, { useState, createContext, useEffect } from 'react'
import { commerce } from '../lib/commerce'

export const CartContext = createContext()

export const CartProvider = props => {
	const [cart, setCart] = useState()
	const [order, setOrder] = useState(undefined)
	const [error, setError] = useState('')

	const fetchCart = async () => {
		const data = await commerce.cart.retrieve()
		setCart(data)
	}
	useEffect(() => {
		fetchCart()
	}, [])

	const addToCart = async (pid, count) => {
		const { cart } = await commerce.cart.add(pid, count)
		setCart(cart)
	}
	const updateQuantity = async (pid, quantity) => {
		const { cart } = await commerce.cart.update(pid, { quantity })
		setCart(cart)
	}
	const removeFromCart = async pid => {
		const { cart } = await commerce.cart.remove(pid)
		setCart(cart)
	}
	const emptyCart = async () => {
		const { cart } = await commerce.cart.empty()
		setCart(cart)
	}

	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh()
		setCart(newCart)
	}

	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
			setOrder(incomingOrder)
			refreshCart()
		} catch (err) {
			setError(err)
			console.log(err)
		}
	}

	return (
		<CartContext.Provider
			value={[cart, setCart, addToCart, updateQuantity, removeFromCart, emptyCart, handleCaptureCheckout, order]}>
			{props.children}
		</CartContext.Provider>
	)
}
