import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { TypePlaceFields } from '../types';
import { createClient, Entry } from 'contentful';
import Head from 'next/head';

export const getStaticProps: GetStaticProps<{
    places: Entry<TypePlaceFields>[];
}> = async () => {
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID!,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });

    const response = await client.getEntries<TypePlaceFields>({
        content_type: 'place',
    });

    return {
        props: {
            places: response.items,
        },
        revalidate: 1,
    };
};

const Home = ({ places }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>
            <Head>
                <title>Travel Log</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main></main>
            <footer></footer>
        </div>
    );
};

export default Home;
