import { ReactNode } from 'react';
import Head from 'next/head';
import Hero from './Hero';

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <Head>
                <title>Travel Log</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Hero />
            <main>{children}</main>
            <footer></footer>
        </>
    );
};

export default Layout;
