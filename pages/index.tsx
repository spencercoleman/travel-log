import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { TypePlace, TypePlaceFields } from '../types';
import { createClient } from 'contentful';
import Head from 'next/head';
import PlacesList from '../components/PlacesList';

export const getStaticProps: GetStaticProps<{
    places: TypePlace[];
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
            <main>
                <section>
                    <PlacesList places={places} />
                </section>
            </main>
            <footer></footer>
        </div>
    );
};

export default Home;
