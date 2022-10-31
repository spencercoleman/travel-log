import { ReactNode } from 'react';
import { Container } from '@chakra-ui/react';
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

            <Container maxW="container.xl" py={3}>
                <main>{children}</main>
                <footer></footer>
            </Container>
        </>
    );
};

export default Layout;
