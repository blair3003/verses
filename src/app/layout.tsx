import './globals.css'
import type { Metadata } from 'next'
import AuthProvider from './context/AuthProvider'

export const metadata: Metadata = {
	title: 'Verses',
	description: 'A messenger app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

	return (
		<html lang="en">
			<body>
				<AuthProvider>
					{children}
				</AuthProvider>	
			</body>
		</html>
	)
}
