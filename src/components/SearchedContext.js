import react, { useState, createContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { commerce } from '../lib/commerce'

export const SearchedContext = createContext()

export const SearchedProvider = props => {
	const navigate = useNavigate()
	const [query, setQuery] = useState('')

	const handleQuery = text => {
		setQuery(text)
	}

	const handleSubmitQuery = e => {
		e.preventDefault()
		if (query === '') return
		navigate('/searched/' + query)
	}

	return (
		<SearchedContext.Provider value={[query, handleQuery, handleSubmitQuery, setQuery]}>
			{props.children}
		</SearchedContext.Provider>
	)
}
