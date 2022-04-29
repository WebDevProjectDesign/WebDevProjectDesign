import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { InputLabel, Select, MenuItem, Button, Grid, TextField, FormControl } from '@mui/material'
import { Link } from 'react-router-dom'

function AdressForm({ next, checkoutToken }) {
	const { control, handleSubmit, watch } = useForm()
	const [shippingOption, setShippingOption] = useState('')
	const handleChange = e => {
		setShippingOption(e.target.value)
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit(data => {
					next({ ...data, shippingOption })
				})}>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<Controller
							defaultValue=''
							name='firstName'
							control={control}
							render={({ field }) => <TextField {...field} label='Imię' required fullWidth color='secondary' />}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							defaultValue=''
							name='lastName'
							control={control}
							render={({ field }) => <TextField {...field} label='Nazwisko' required fullWidth color='secondary' />}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							defaultValue=''
							name='email'
							control={control}
							render={({ field }) => <TextField {...field} label='Adres email' required fullWidth color='secondary' />}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							defaultValue=''
							name='company'
							control={control}
							render={({ field }) => <TextField {...field} label='Firma' fullWidth color='secondary' />}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							defaultValue=''
							name='phoneNo'
							control={control}
							render={({ field }) => (
								<TextField {...field} label='Numer Telefonu' required fullWidth color='secondary' />
							)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							defaultValue=''
							name='adress'
							control={control}
							render={({ field }) => (
								<TextField {...field} label='Ulica i numer' required fullWidth color='secondary' />
							)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							defaultValue=''
							name='zipCode'
							control={control}
							render={({ field }) => <TextField {...field} label='Kod pocztowy' required fullWidth color='secondary' />}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Controller
							defaultValue=''
							name='postalCity'
							control={control}
							render={({ field }) => <TextField {...field} label='Miejscowość' required fullWidth color='secondary' />}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<FormControl color='secondary' required fullWidth>
							<InputLabel id='shipping'>Dostawa</InputLabel>
							<Select labelId='shipping' id='shipping' label='Dostawa' value={shippingOption} onChange={handleChange}>
								{checkoutToken &&
									checkoutToken.shipping_methods.map(method => (
										<MenuItem key={method.id} value={method.id}>
											{method.description}: {method.price.formatted_with_code}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<br />
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Button component={Link} to='/cart' variant='outlined' color='secondary'>
						koszyk
					</Button>
					<Button variant='contained' color='primary' type='submit'>
						dalej
					</Button>
				</div>
			</form>
		</div>
	)
}

export default AdressForm
