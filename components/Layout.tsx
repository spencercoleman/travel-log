import { ReactNode } from 'react';
import Head from 'next/head';

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

            <main>{children}</main>
            <footer></footer>
        </>
    );
};

export default Layout;
