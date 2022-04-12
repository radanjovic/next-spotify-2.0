import '../styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import {RecoilRoot} from 'recoil';

export default function MyApp({Component, pageProps: {session, ...pageProps}}) {
    return <>
        <Head>
            <title>Spotify 2.0</title>
            <link rel='icon' href='/favicon.ico' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='author' content='Radan Jovic' />
        </Head>
        <SessionProvider session={session}>
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </SessionProvider>
        
    </>
}