import '../styles/style.css'
import { SWRConfig } from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function MyApp({ Component, pageProps }) {
  return     <SWRConfig 
      value={{
        refreshInterval: 1e3,
        fetcher
      }}
    >
    <Component {...pageProps} />
    </SWRConfig>
}
