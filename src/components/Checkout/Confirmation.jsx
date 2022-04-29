import React, { useContext } from 'react'
import { Typography, Divider, Container, CircularProgress } from '@mui/material'

function Confirmation({ order }) {
	return (
		<div>
			{!order ? (
				<Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<CircularProgress color='secondary' />
				</Container>
			) : (
				<div>
					<Typography variant='h6' sx={{ my: 2 }}>
						Dziękujemy za zakupy, {order.customer.firstname} {order.customer.lastname}.
					</Typography>
					<Divider />
					<Typography variant='subtitle1' sx={{ my: 2 }}>
						Informacje na temat zamówienia zostały przesłane na adres <b>{order.customer.email}</b>.
						<br />
						Za chwilę zostaniesz przekierowany na stronę główną.
					</Typography>
				</div>
			)}
		</div>
	)
}

export default Confirmation
