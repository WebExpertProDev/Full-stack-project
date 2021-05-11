import "../styles/globals.css"
import "../styles/styles.css"
import "swiper/swiper.scss"
import "swiper/components/navigation/navigation.scss"
import "react-modern-drawer/dist/index.css"
import "react-image-lightbox/style.css"
import "react-datepicker/dist/react-datepicker.css"

import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
