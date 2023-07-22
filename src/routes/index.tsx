import { Home } from '../screens/home/Home'
import { Outlet } from 'react-router-dom'

export function RootRoute() {
	return (
		<Home>
			<Outlet />
		</Home>
	)
}
