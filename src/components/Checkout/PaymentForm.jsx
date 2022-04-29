import React, { useContext } from 'react'
import { Typography, Button, Divider } from '@mui/material'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'
import { CartContext } from '../CartContext'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

function PaymentForm({ checkoutToken, prevStep, shippingData, nextStep }) {
	const [cart, setCart, addToCart, updateQuantity, removeFromCart, emptyCart, handleCaptureCheckout] =
		useContext(CartContext)

	const handleSubmit = async (event, elements, stripe) => {
		event.preventDefault()

		if (!stripe || !elements) return

		const cardElement = elements.getElement(CardElement)

		const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })

		if (error) {
			console.log(error)
		} else {
			const orderData = {
				line_items: checkoutToken.live.line_items,
				customer: {
					firstname: shippingData.firstName,
					lastname: shippingData.lastName,
					email: shippingData.email,
				},
				shipping: {
					name: 'primary',
					street: shippingData.adress,
					town_city: shippingData.postalCity,
					postal_zip_code: shippingData.zipCode,
					country: 'PL',
				},
				fulfillment: {
					shipping_method: shippingData.shippingOption,
				},
				payment: {
					gateway: 'stripe',
					stripe: {
						payment_method_id: paymentMethod.id,
					},
				},
			}

			handleCaptureCheckout(checkoutToken.id, orderData)
			nextStep()
		}
	}

	return (
		<>
			<Review checkoutToken={checkoutToken} />
			<Divider />
			<Typography variant='h6' gutterBottom sx={{ my: 2, mx: 2 }}>
				Płatność
			</Typography>
			<Elements stripe={stripePromise}>
				<ElementsConsumer>
					{({ elements, stripe }) => (
						<form onSubmit={e => handleSubmit(e, elements, stripe)}>
							<CardElement />
							<br /> <br />
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Button variant='outlined' color='secondary' onClick={prevStep}>
									Powrót
								</Button>
								<Button variant='contained' color='primary' type='submit' disabled={!stripe}>
									Zapłać
								</Button>
							</div>
						</form>
					)}
				</ElementsConsumer>
			</Elements>
		</>
	)
}

export default PaymentForm
