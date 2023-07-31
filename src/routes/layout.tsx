import { Layout } from '../components/layout/Layout'
import { Outlet } from 'react-router-dom'

export function LayoutPage() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	)
}
