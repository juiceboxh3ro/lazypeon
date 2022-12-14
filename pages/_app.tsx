import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { SessionProvider } from 'next-auth/react'

import SignInButton from 'components/SignInButton'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <nav className='bg-blue-900'>
        <ul className='flex flex-1 justify-end items-center p-4 gap-8'>
          <li>
            <Link href='/character'>Character Info</Link>
          </li>
          <li>
            <Link href='/guild'>Guild Info</Link>
          </li>
          <li>
            <Link href='/professions/raid-ready'>Professions</Link>
          </li>
          <li>
            <Link href='/classes'>Class Consumables</Link>
          </li>
          <li>
            <SignInButton />
          </li>
        </ul>
      </nav>

      <main className='p-8' style={{ minHeight: 'calc(100vh - 169px)'}}>
        <Component {...pageProps} />
      </main>

      <footer className='flex flex-1 flex-col justify-center items-center py-8 border-t border-indigo-700'>
        <p>Made with &lt;3 by Vue @ Zuluhed-US</p>
        <a
          href="https://github.com/juiceboxh3ro/lazypeon"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-blue-500 hover:underline"
        >
          LazyPeon Github
        </a>
      </footer>
    </SessionProvider>
  )
}

export default App
