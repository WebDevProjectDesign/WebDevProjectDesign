import { ThemeProvider, createTheme } from '@mui/material/styles'
import Header from './components/Header'
import Home from './components/Home'
import Cart from './components/Cart'
import Details from './components/Details'
import Categories from './components/Categories'
import Checkout from './components/Checkout/Checkout'
import Searched from './components/Searched'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProductsProvider } from './components/ProductsContext'
import { CartProvider } from './components/CartContext'
import { SearchedProvider } from './components/SearchedContext'

const customTheme = createTheme({
	palette: {
		primary: {
			main: '#fff200',
			light: '#fff421',
			dark: '#dbd000',
		},
		secondary: {
			main: '#000',
		},
	},
	typography: {
		fontFamily: 'Quicksand, sans-serif',
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
})

function App() {
	return (
		<ThemeProvider theme={customTheme}>
			<Router>
				<ProductsProvider>
					<CartProvider>
						<SearchedProvider>
							<Header />
							<Routes>
								<Route exact path='/' element={<Home />} />
								<Route path='/cart' element={<Cart />} />
								<Route path='/details/:type' element={<Details />} />
								<Route path='/category/:cat' element={<Categories />} />
								<Route path='/checkout/' element={<Checkout />} />
								<Route path='/searched/:keyword' element={<Searched />} />
							</Routes>
						</SearchedProvider>
					</CartProvider>
				</ProductsProvider>
			</Router>
		</ThemeProvider>
	)
}

export default App
