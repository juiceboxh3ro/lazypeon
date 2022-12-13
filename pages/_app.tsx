import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <nav className='bg-blue-900'>
        <ul className='flex flex-1 justify-end items-center p-4 gap-8'>
          <li>
            <Link href='/character'>Character Info</Link>
          </li>
          <li>
            <Link href='/guild'>Guild Info</Link>
          </li>
          <li>
            <Link href='/auction_house'>Auction House</Link>
          </li>
          <li>
            <Link href='/login'>Login</Link>
          </li>
        </ul>
      </nav>

      <main className='min-h-screen p-8'>
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
    </>
  )
}

export default App
