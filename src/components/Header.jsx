import React, { useState, useContext } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import useStyles from './styles'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import { CartContext } from './CartContext'
import { SearchedContext } from './SearchedContext'
import {
	Container,
	AppBar,
	Toolbar,
	Typography,
	Box,
	Tooltip,
	IconButton,
	Menu,
	MenuItem,
	Input,
	Button,
	Badge,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined'

const pages = [
	{ name: 'Komputery', cat: 'pc' },
	{ name: 'Monitory', cat: 'monitor' },
	{ name: 'Laptopy', cat: 'laptop' },
	{ name: 'Klawiatury', cat: 'keyboard' },
	{ name: 'Myszki', cat: 'mouse' },
	{ name: 'Słuchawki', cat: 'headphones' },
	{ name: 'Mikrofony', cat: 'mic' },
]

function Header() {
	const style = useStyles()
	const [anchorElNav, setAnchorElNav] = useState(null)
	const [cart] = useContext(CartContext)
	const [query, handleQuery, handleSubmitQuery] = useContext(SearchedContext)

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	return (
		<>
			<div className={style.top_bar}>
				<Container maxWidth='xl' sx={{ display: { xs: 'none', sm: 'block' } }}>
					<Box
						sx={{
							padding: '10px 0',
							display: 'flex',
							justifyContent: 'flex-end',
						}}>
						<p className={style.top_bar_item}>
							<EmailOutlinedIcon /> <span>nestshop@kontakt.com</span>
						</p>
						<p className={style.top_bar_item}>
							<LocalPhoneOutlinedIcon /> <span>789 654 234</span>
						</p>
					</Box>
				</Container>
			</div>

			<AppBar position='static' sx={{ backgroundColor: '#2b2b2b' }}>
				<Container maxWidth='xl'>
					<Toolbar disableGutters sx={{ justifyContent: 'center', paddingTop: '15px' }}>
						<Typography
							component={Link}
							to='/'
							sx={{
								mr: 2,
								display: 'flex',
								textDecoration: 'none',
								color: 'white',
								fontSize: { xs: '1.25rem', md: '1.5rem', lg: '2.125rem' },
								fontWeight: 'fontWeightBold',
							}}>
							<img src={logo} alt='NestShop' />
							<span style={{ color: '#fff200' }}>Nest</span>Shop
						</Typography>
						{/* SEARCHBAR INPUT */}
						<Box sx={{ width: '100%', flexGrow: 1, display: { xs: 'none', sm: 'block' }, margin: '0px, auto' }}>
							<form onSubmit={handleSubmitQuery}>
								<div className={style.searchbar_wrapper}>
									<Input
										value={query}
										onChange={e => handleQuery(e.target.value)}
										type='text'
										placeholder='Przeszukaj sklep'
										sx={{ backgroundColor: '#f6f6f6', width: '100%', padding: '5px 10px 5px 10px' }}
									/>
									<Button
										variant='contained'
										type='submit'
										sx={{ position: 'absolute' }}
										className={style.searchbar_icon}>
										<SearchIcon />
									</Button>
								</div>
							</form>
						</Box>
						<Box sx={{ flex: 1, display: { xs: 'block', sm: 'block' } }}></Box>

						<Box sx={{ textAlign: 'center', display: 'flex' }}>
							<Badge color='primary' badgeContent={!cart ? 0 : cart.total_items} sx={{ mx: { xs: '20px', sm: '0px' } }}>
								<Button component={Link} to='/cart' size='small' sx={{ color: '#f6f6f6' }}>
									<ShoppingCartCheckoutOutlinedIcon sx={{ color: '#fff200' }} />
									<Typography variant='subtitle1' sx={{ display: { xs: 'none', md: 'flex' } }}>
										Koszyk
									</Typography>
								</Button>
							</Badge>

							{/* MOBILE DEVICES MENU */}
							<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, borderLeft: '1px solid #f6f6f6' }}>
								<Tooltip title='Otwórz menu'>
									<IconButton
										size='large'
										aria-label='otwórz menu'
										aria-controls='menu-appbar'
										aria-haspopup='true'
										onClick={handleOpenNavMenu}>
										<MenuIcon sx={{ color: '#f6f6f6' }} />
									</IconButton>
								</Tooltip>
								<Menu
									id='menu-appbar'
									anchorEl={anchorElNav}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'left',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
									sx={{
										display: { xs: 'block', md: 'none' },
									}}>
									{pages.map(page => (
										<MenuItem key={page.name} onClick={handleCloseNavMenu}>
											<Typography
												className={style.link}
												component={Link}
												to={'/category/' + page.cat}
												sx={{ textAlign: 'center' }}>
												{page.name}
											</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
						</Box>
					</Toolbar>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
						{pages.map(page => (
							<Button
								key={page.name}
								onClick={handleCloseNavMenu}
								sx={{ my: 1, mx: 2, display: 'block', color: '#fff' }}
								component={Link}
								to={'/category/' + page.cat}>
								{page.name}
							</Button>
						))}
					</Box>
				</Container>
			</AppBar>
			<Container maxWidth='xl'></Container>
		</>
	)
}

export default Header
