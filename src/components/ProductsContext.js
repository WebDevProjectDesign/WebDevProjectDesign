import react, { useState, createContext, useEffect } from 'react'
import { commerce } from '../lib/commerce'

export const ProductsContext = createContext()

export const ProductsProvider = props => {
	const [products, setProducts] = useState()

	const fetchProducts = async () => {
		const { data } = await commerce.products.list({ limit: 30 })
		setProducts(data)
	}
	useEffect(() => {
		fetchProducts()
	}, [])

	return <ProductsContext.Provider value={[products, setProducts]}>{props.children}</ProductsContext.Provider>
}
