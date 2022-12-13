import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return(
    <Html>
      <Head>
        <meta name="description" content="World of Warcraft Profession Tracker" />
        <meta name="keywords" content="World of Warcraft, Dragonflight, Dragon Isles, Crafting, Profession, Work Order, Consumables, Auction House" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
