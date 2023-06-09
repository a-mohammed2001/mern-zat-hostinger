import { Fragment } from 'react'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import BlogsProvider from './api/blogsContext'

function MyApp({ Component, pageProps }) {
  console.log("###2223333#####");
  return(
    <BlogsProvider>
    <Fragment>
    <Navbar/>
    <Component {...pageProps} />
    </Fragment>
    </BlogsProvider> 
  )
}

export default MyApp
