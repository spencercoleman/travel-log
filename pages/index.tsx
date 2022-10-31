import { useState, useEffect } from 'react';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import { Heading, Button, Flex, Select, Stack } from '@chakra-ui/react';
import { TypePlace, TypePlaceFields } from '../types';
import { createClient } from 'contentful';
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
    const [filteredPlaces, setFilteredPlaces] = useState<TypePlace[]>([]);
    const [placeTypeFilter, setPlaceTypeFilter] = useState<string>('');
    const [temperatureFilter, setTemperatureFilter] = useState<string>('');
    const [distanceFilter, setDistanceFilter] = useState<string>('');

    const placeTypes = ['Beach', 'City', 'Camp', 'Mountains'];
    const temperatures = ['Cold', 'Temperate', 'Hot'];
    const distances = ['Close', 'Mid', 'Far'];

    const clearFilters = (): void => {
        setPlaceTypeFilter('');
        setTemperatureFilter('');
        setDistanceFilter('');
    };

    useEffect(() => {
        const filterPlaces = () => {
            return places.filter((place) => {
                const { type, temperature, distance } = place.fields;

                return (
                    type.includes(placeTypeFilter) &&
                    temperature.includes(temperatureFilter) &&
                    distance.includes(distanceFilter)
                );
            });
        };

        const filteredPlaces = filterPlaces();
        setFilteredPlaces(filteredPlaces);
    }, [places, placeTypeFilter, temperatureFilter, distanceFilter]);

    return (
        <section>
            <Stack spacing={3}>
                <Heading as="h2" size="lg">
                    Places to go
                </Heading>

                <Flex gap={2}>
                    <Select
                        placeholder="Place type"
                        value={placeTypeFilter}
                        onChange={(e) => setPlaceTypeFilter(e.target.value)}
                    >
                        {placeTypes.map((placeType) => (
                            <option
                                key={placeType}
                                value={placeType.toLowerCase()}
                            >
                                {placeType}
                            </option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Temperature"
                        value={temperatureFilter}
                        onChange={(e) => setTemperatureFilter(e.target.value)}
                    >
                        {temperatures.map((temperature) => (
                            <option
                                key={temperature}
                                value={temperature.toLowerCase()}
                            >
                                {temperature}
                            </option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Distance"
                        value={distanceFilter}
                        onChange={(e) => setDistanceFilter(e.target.value)}
                    >
                        {distances.map((distance) => (
                            <option
                                key={distance}
                                value={distance.toLowerCase()}
                            >
                                {distance}
                            </option>
                        ))}
                    </Select>

                    <Button minW="fit-content" onClick={clearFilters}>
                        Clear Filters
                    </Button>
                </Flex>

                <PlacesList places={filteredPlaces} />
            </Stack>
        </section>
    );
};

export default Home;
