import { makeStyles } from '@mui/styles'
import { flexbox } from '@mui/system'

export default makeStyles(() => ({
	top_bar: {
		backgroundColor: '#f6f6f6',
	},
	top_bar_content: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	top_bar_item: {
		marginLeft: '50px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	searchbar_wrapper: {
		position: 'relative',
	},
	searchbar_icon: {
		position: 'absolute',
		top: '0',
		right: '0',
		backgroundColor: '#fff200',
		color: '#333333',
		width: '41px',
		height: '41px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 'large',
		cursor: 'pointer',
	},
	product_image: {
		width: '100%',
		height: '100%',
		objectFit: 'scale-down',
	},
	button_group: {
		display: 'flex',
		alignItems: 'center',
		marginTop: 'auto',
	},
	link: {
		color: '#000',
		textDecoration: 'none',

		'&:hover': {
			textDecoration: 'underline',
		},
	},
}))
