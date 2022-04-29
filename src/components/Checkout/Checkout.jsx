import React, { useState, useEffect, useContext } from 'react'
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	CircuralProgress,
	Divider,
	Button,
	Container,
} from '@mui/material'
import AdressForm from './AdressForm'
import PaymentForm from './PaymentForm'
import Confirmation from './Confirmation'
import { CartContext } from '../CartContext'
import { commerce } from '../../lib/commerce'
import { useNavigate } from 'react-router-dom'

const steps = ['Adres dostawy', 'Dane płatności']

function Checkout() {
	const [activeStep, setActiveStep] = useState(0)
	const [shippingData, setShippingData] = useState({})
	const [checkoutToken, setCheckoutToken] = useState(null)

	const [cart, setCart, addToCart, updateQuantity, removeFromCart, emptyCart, handleCaptureCheckout, order] =
		useContext(CartContext)
	let navigate = useNavigate()

	useEffect(() => {
		const generateCheckoutToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })

				setCheckoutToken(token)
			} catch (error) {
				setTimeout(() => {
					navigate('/')
				}, 5000)
			}
		}
		generateCheckoutToken()
	}, [cart])

	const nextStep = () => {
		setActiveStep(activeStep => activeStep + 1)
	}

	const prevStep = () => {
		setActiveStep(activeStep => activeStep - 1)
	}

	const next = data => {
		setShippingData(data)
		nextStep()
	}

	const Form = () =>
		activeStep === 0 ? (
			<AdressForm next={next} checkoutToken={checkoutToken} nextStep={nextStep} prevStep={prevStep} />
		) : (
			<PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} prevStep={prevStep} shippingData={shippingData} />
		)

	return (
		<Container maxWidth='xl'>
			<Paper sx={{ padding: '20px', marginTop: '20px', width: { xs: '100%', sm: '90%', md: '70%' }, mx: 'auto' }}>
				<Typography variant='h4' align='center'>
					Finalizowanie transakcji
				</Typography>
				<Stepper sx={{ my: 2 }} activeStep={activeStep}>
					{steps.map(step => (
						<Step key={step}>
							<StepLabel>{step}</StepLabel>
						</Step>
					))}
				</Stepper>
				{activeStep === steps.length ? <Confirmation order={order} /> : <Form />}
			</Paper>
		</Container>
	)
}

export default Checkout
