import React, { useContext } from 'react'
import { CartContext } from './CartContext'
import {
	List,
	ListItem,
	Divider,
	Typography,
	Container,
	Button,
	Box,
	CircularProgress,
	Tooltip,
	IconButton,
} from '@mui/material'
import useStyles from './styles'
import noImage from '../assets/no-image.jpg'
import { Link } from 'react-router-dom'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

const EmptyCart = ({ style }) => (
	<Typography variant='h4' align='center' sx={{ my: '20px' }}>
		Twój koszyk jest pusty.{' '}
		<Link className={style.link} to='/'>
			Rozpocznij zakupy.
		</Link>
	</Typography>
)

const LoadingCart = () => (
	<Container maxWidth='xl' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
		<CircularProgress color='secondary' sx={{ marginTop: '20px' }} />
	</Container>
)
const FullCart = ({ cart, style, updateQuantity, removeFromCart, emptyCart }) => (
	<Container maxWidth='xl'>
		{!cart.total_items ? (
			<EmptyCart style={style} />
		) : (
			<>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: { xs: 'column', sm: 'row' },
						justifyContent: { xs: 'center', sm: 'space-between' },
						alignItems: { xs: 'flex-start', sm: 'center' },
					}}>
					<Typography variant='h4' sx={{ my: 2, fontSize: { xs: '1.25rem', md: '1.4rem', lg: '1.7rem' } }}>
						Łącznie: {cart.subtotal.formatted_with_code}
					</Typography>
					<Box sx={{ width: '100%', display: 'flex', justifyContent: { xs: 'space-between', sm: 'flex-end' } }}>
						<Button
							variant='outlined'
							color='secondary'
							sx={{ textTransform: 'uppercase', marginRight: { xs: '0px', sm: '20px' } }}
							onClick={emptyCart}>
							Wyczyść
						</Button>
						<Button
							className={style.link}
							component={Link}
							to='/checkout'
							variant='contained'
							color='primary'
							sx={{ textTransform: 'uppercase' }}>
							Do kasy
						</Button>
					</Box>
				</Box>
				<List>
					{cart.line_items.map(item => (
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
								<Tooltip sx={{ position: 'absolute', top: '4px', right: '8px' }} title='Usuń'>
									<IconButton
										size='large'
										onClick={() => {
											removeFromCart(item.id)
										}}>
										<DeleteOutlineOutlinedIcon />
									</IconButton>
								</Tooltip>
								<Box
									sx={{ maxWidth: { xs: '430px', sm: '230px' }, margin: { xs: '0 auto 20px auto', sm: '0 10px 0 0' } }}>
									<img className={style.product_image} src={!item.image ? noImage : item.image.url} alt={item.name} />
								</Box>
								<Box sx={{ width: '100%', marginRight: '24px' }}>
									<Typography
										component={Link}
										to={'/details/' + item.product_id}
										className={style.link}
										variant='h3'
										sx={{ fontSize: { xs: '1.25rem', md: '1.4rem', lg: '1.7rem' } }}>
										{item.name}
									</Typography>
									<Typography
										sx={{
											fontSize: { xs: '1.4rem', md: '1.55rem', lg: '1.95rem' },
											color: '#ff0000',
											fontWeight: 'fontWeightBold',
										}}>
										{item.price.formatted_with_code}
									</Typography>
									<Typography sx={{ fontSize: { xs: '1.125rem', md: '1.25rem', lg: '1.5rem' } }}>
										Łącznie: {item.line_total.formatted_with_code}
									</Typography>
									<div className={style.button_group}>
										<Button
											variant='outlined'
											size='small'
											color='secondary'
											onClick={() => {
												updateQuantity(item.id, item.quantity - 1)
											}}>
											-
										</Button>
										<Typography sx={{ mx: 2 }} variant='body1'>
											{item.quantity}
										</Typography>
										<Button
											variant='outlined'
											size='small'
											color='secondary'
											onClick={() => {
												updateQuantity(item.id, item.quantity + 1)
											}}>
											+
										</Button>
									</div>
								</Box>
							</ListItem>
							<Divider variant='li' />
						</div>
					))}
				</List>
			</>
		)}
	</Container>
)

function Cart() {
	const style = useStyles()
	const [cart, setCart, addToCart, updateQuantity, removeFromCart, emptyCart] = useContext(CartContext)

	return (
		<>
			{!cart ? (
				<LoadingCart />
			) : (
				<FullCart
					style={style}
					cart={cart}
					updateQuantity={updateQuantity}
					removeFromCart={removeFromCart}
					emptyCart={emptyCart}
				/>
			)}
		</>
	)
}

export default Cart
