import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { commerce } from '../lib/commerce'
import useStyles from './styles'
import { Container, Box, Typography, Button, CircularProgress, Divider } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import noImage from '../assets/no-image.jpg'
import { CartContext } from './CartContext'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

function Details() {
	const LoadingProduct = () => (
		<Container maxWidth='xl' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<CircularProgress color='secondary' sx={{ marginTop: '20px' }} />
		</Container>
	)

	const style = useStyles()
	const [cart, setCart, addToCart] = useContext(CartContext)

	const [product, setProduct] = useState()
	const [recomend, setRecomend] = useState([])
	const params = useParams()

	const fetchProduct = async type => {
		const data = await commerce.products.retrieve(type)
		setProduct(data)
	}

	const fetchRecomend = async () => {
		const { data } = await commerce.products.list({ category_slug: 'recomend' })
		setRecomend(data)
	}

	useEffect(() => {
		fetchProduct(params.type)
		fetchRecomend()
	}, [params.type])

	return (
		<>
			{product && (
				<Container maxWidth='xl'>
					<Box
						sx={{
							marginBottom: '40px',
							marginTop: '20px',
							display: 'flex',
							flexDirection: { xs: 'column', md: 'row' },
						}}>
						<Box
							sx={{
								width: { xs: '80%', md: '50%' },
								display: 'flex',
								justifyContent: 'center',
								margin: { xs: '0 auto', md: '0 20px 20px 0' },
							}}>
							<img
								className={style.product_image}
								src={!product.image ? noImage : product.image.url}
								alt={product.name}
							/>
						</Box>
						<Box sx={{ width: { xs: '100%', sm: '80%', md: '50%' } }}>
							<Typography
								variant='h4'
								sx={{ fontSize: { xs: '1.25rem', md: '1.4rem', lg: '1.7rem' }, marginTop: { xs: '10px', md: '0' } }}>
								{product.name}
							</Typography>

							<Typography
								variant='h4'
								sx={{
									fontSize: { xs: '1.4rem', md: '1.7rem', lg: '2rem' },
									fontWeight: 'fontWeightBold',
									color: '#ff0000',
								}}>
								{product.price.formatted_with_code}
							</Typography>
							<Typography variant='body2' sx={{ fontSize: { xs: '0.875rem', md: '1rem', lg: '1.2rem' } }}>
								Pozostało {product.inventory.available} szt.
							</Typography>
							<Box sx={{ minWidth: '120px', my: 2 }}>
								<Button
									onClick={() => {
										addToCart(product.id, 1)
									}}
									variant='contained'>
									Do koszyka
								</Button>
							</Box>
						</Box>
					</Box>
					<Typography variant='h5' sx={{ fontWeight: 'fontWeightBold', marginBottom: '10px' }}>
						Może cię zainteresuje
					</Typography>
					<Splide
						options={{
							perPage: 4,
							gap: '3rem',
							pagination: false,
							drag: 'free',
							infinite: true,
							breakpoints: {
								1200: {
									perPage: 3,
								},
								900: {
									perPage: 2,
								},
								600: {
									perPage: 1,
								},
							},
						}}>
						{product.related_products.map(item => (
							<SplideSlide key={item.id}>
								<Box sx={{ display: 'flex', flexDirection: 'column' }}>
									<Box sx={{ height: '20rem' }}>
										<img className={style.product_image} src={!item.image ? noImage : item.image.url} />
									</Box>
									<Typography variant='h6'>{item.name}</Typography>
									<Typography variant='h5' sx={{ color: '#ff0000', fontWeight: 'fontWeightBold' }}>
										{item.price.formatted_with_code}
									</Typography>
								</Box>
							</SplideSlide>
						))}
					</Splide>
					<Divider sx={{ my: 1 }} />
					<Typography variant='h3' align='center' sx={{ marginTop: '20px' }}>
						Opis produktu
					</Typography>
					<Box>
						<Typography
							className={style.description}
							sx={{ flex: 1 }}
							dangerouslySetInnerHTML={{ __html: product.description }}
						/>
					</Box>
					<Divider sx={{ my: 2 }} />
					<Typography variant='h5' sx={{ fontWeight: 'fontWeightBold', marginBottom: '20px', marginTop: '20px' }}>
						Polecane dla ciebie
					</Typography>
					<Splide
						options={{
							perPage: 4,
							gap: '3rem',
							pagination: false,
							drag: 'free',
							infinite: true,
							breakpoints: {
								1200: {
									perPage: 3,
								},
								900: {
									perPage: 2,
								},
								600: {
									perPage: 1,
								},
							},
						}}>
						{recomend.map(item => (
							<SplideSlide key={item.id}>
								<Box sx={{ display: 'flex', flexDirection: 'column' }}>
									<Box sx={{ height: '20rem' }}>
										<img className={style.product_image} src={!item.image ? noImage : item.image.url} />
									</Box>
									<Typography variant='h6'>{item.name}</Typography>
									<Typography variant='h5' sx={{ color: '#ff0000', fontWeight: 'fontWeightBold' }}>
										{item.price.formatted_with_code}
									</Typography>
								</Box>
							</SplideSlide>
						))}
					</Splide>
				</Container>
			)}
		</>
	)
}

export default Details
