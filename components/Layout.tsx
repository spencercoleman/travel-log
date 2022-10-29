import Head from 'next/head';

interface Props {
    children: JSX.Element;
}

const Layout = ({ children }: Props) => {
    return (
        <div>
            <Head>
                <title>Travel Log</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>{children}</main>

            <footer></footer>
        </div>
    );
};

export default Layout;
