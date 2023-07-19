import Head from 'next/head'
import Image from 'next/future/image'
import styles from '../styles/Home.module.css'
import Carousel from './carousel';
import Description from './description';

export default function Home() {
  return (
    <div >
      <Head>
        <title>Otaku Store - A store for weebs</title>
        <meta name="description" content="Otaku Store - A store for weebs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Image className={styles.mainImg} src="/Picture2.jpg" width={1519} height={665} layout='raw' />
        </div>
        <section className={styles.contentBody}>
          <div className="container px-5 py-16 mx-auto">
            <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
              <h1 className="sm:text-5xl text-2xl font-medium title-font mb-2 text-yellow-400">Otaku Store Collections</h1>
              <p className="lg:w-1/2 w-full leading-relaxed text-gray-100">Create your own Isekai world with OtakuStore.com</p>
            </div>
            <Carousel />
            <Description />
          </div>
        </section>
      </main>
    </div>
  )
}
