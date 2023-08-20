import './globals.css'
import type { Metadata } from 'next'
import AuthProvider from './context/AuthProvider'
import { Yantramanav } from 'next/font/google'

export const metadata: Metadata = {
	title: 'Verses',
	description: 'A messenger app',
}

const yantramanav = Yantramanav({ weight: "400", subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {

	return (
		<html lang="en">
			<body className={`${yantramanav.className} h-screen bg-gray-950 text-white flex flex-col`}>
				<AuthProvider>
					{children}
				</AuthProvider>	
			</body>
		</html>
	)
}
