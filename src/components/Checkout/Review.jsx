import React from 'react'
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material'

function Review({ checkoutToken }) {
	return (
		<>
			<Typography variant='h5' sx={{ fontWeight: 'fontWeightBold' }}>
				Podsumowanie
			</Typography>
			<List>
				{checkoutToken.live.line_items.map(item => (
					<ListItem sx={{ padding: '10px 0' }} key={item.name}>
						<ListItemText primary={item.name} secondary={`Ilość: ${item.quantity}`} />
						<Typography variant='body2'>{item.line_total.formatted_with_code}</Typography>
					</ListItem>
				))}
				<Divider />
				<ListItemText sx={{ padding: '10px 0' }} primary='Łącznie' />
				<Typography variant='subtitle2'>{checkoutToken.live.subtotal.formatted_with_code}</Typography>
			</List>
		</>
	)
}

export default Review
