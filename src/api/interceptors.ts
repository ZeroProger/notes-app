import { API_SERVER_URL } from '@/config/api.config'
import axios from 'axios'

export const axiosClassic = axios.create({
	baseURL: `${API_SERVER_URL}/api`,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})
