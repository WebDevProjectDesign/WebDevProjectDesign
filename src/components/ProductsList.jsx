import React, { useContext } from 'react'
import { List, ListItem, Divider, Typography, Container, Button, Box, CircularProgress } from '@mui/material'

import useStyles from './styles'
import noImage from '../assets/no-image.jpg'
import { ProductsContext } from './ProductsContext'
import { CartContext } from './CartContext'
import { Link } from 'react-router-dom'

function ProductsList() {
	const style = useStyles()
	const [products, setProducts] = useContext(ProductsContext)
	const [cart, setCart, addToCart] = useContext(CartContext)

	return (
		<>
			<Container maxWidth='xl' sx={{ marginTop: '20px' }}>
				<List>
					{!products ? (
						<Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<CircularProgress color='secondary' />
						</Container>
					) : (
						products.map(item => (
							<div key={item.id}>
								<ListItem
									className={style.list_item}
									alignItems='flex-start'
									sx={{
										paddingTop: '20px',
										cursor: 'pointer',
										position: 'relative',
										flexDirection: { xs: 'column', sm: 'row' },
									}}>
									<Box
										sx={{
											maxWidth: { xs: '430px', sm: '230px' },
											margin: { xs: '0 auto 20px auto', sm: '0 10px 0 0' },
										}}>
										<img className={style.product_image} src={!item.image ? noImage : item.image.url} alt={item.name} />
									</Box>
									<Box sx={{ width: '100%' }}>
										<Link className={style.link} to={'/details/' + item.id}>
											<Typography variant='h3' sx={{ fontSize: { xs: '1.25rem', md: '1.4rem', lg: '1.7rem' } }}>
												{item.name}
											</Typography>
										</Link>
										<Typography
											sx={{
												fontSize: { xs: '1.3rem', md: '1.55rem', lg: '1.85rem' },
												color: '#ff0000',
												fontWeight: 'fontWeightBold',
											}}>
											{item.price.formatted_with_code}
										</Typography>
										<Typography variant='body2' sx={{ fontSize: { xs: '0.875rem', md: '1rem', lg: '1.2rem' } }}>
											Pozostało {item.inventory.available} szt.
										</Typography>
									</Box>
									<Box alignSelf='flex-end' sx={{ minWidth: '120px' }}>
										<Button
											onClick={() => {
												addToCart(item.id, 1)
											}}
											variant='contained'>
											Do koszyka
										</Button>
									</Box>
								</ListItem>
								<Divider variant='li' />
							</div>
						))
					)}
				</List>
			</Container>
		</>
	)
}

export default ProductsList
