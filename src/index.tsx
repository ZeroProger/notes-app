import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './config/react-router.config'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import {
	queryStaleTime,
	queryCacheTime,
	queryRetryCount,
	toastCloseTime,
	queryRefetchInterval,
} from './config/constants'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter(routes)

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: queryStaleTime,
			cacheTime: queryCacheTime,
			retry: queryRetryCount,
			refetchInterval: queryRefetchInterval,
			refetchOnWindowFocus: false,
		},
	},
})

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ToastContainer
				position="bottom-right"
				autoClose={toastCloseTime}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</QueryClientProvider>
	</React.StrictMode>
)
