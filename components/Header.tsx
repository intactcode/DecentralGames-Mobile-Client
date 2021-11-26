
import Head from 'next/head'
// import Image from 'next/image'


const Header = (props: {title: string, description: string}) => {
  return (
    
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      

      
    
  )
}

export default Header