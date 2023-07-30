import React from 'react'
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import './styles/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './config/react-router.config'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const router = createBrowserRouter(routes)

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			cacheTime: 5 * 60 * 1000,
		},
	},
})

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient} contextSharing>
			<RouterProvider router={router} />
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
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
