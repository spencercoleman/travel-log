import { useState, useEffect } from 'react';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import {
    Heading,
    Button,
    Box,
    Select,
    Container,
    theme,
    SimpleGrid,
} from '@chakra-ui/react';
import { TypePlace, TypePlaceFields } from '../types';
import { createClient } from 'contentful';
import Hero from '../components/Hero';
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

    const places = response.items.sort((a, b) => {
        if (a.fields.name < b.fields.name) {
            return -1;
        }
        if (a.fields.name > b.fields.name) {
            return 1;
        }
        return 0;
    });

    return {
        props: {
            places: places,
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
        <>
            <Hero />

            <Box as="section" py={4}>
                <Container maxW="container.xl">
                    <Heading as="h2" size="md">
                        Places to go
                    </Heading>
                </Container>

                <Box
                    position="sticky"
                    top={0}
                    zIndex={20}
                    backgroundColor={theme.colors.white}
                    boxShadow="md"
                >
                    <Container maxW="container.xl" py={4}>
                        <SimpleGrid columns={[3, 5, 6, 7]} gap={2}>
                            <Select
                                placeholder="Place type"
                                value={placeTypeFilter}
                                size="sm"
                                onChange={(e) =>
                                    setPlaceTypeFilter(e.target.value)
                                }
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
                                size="sm"
                                onChange={(e) =>
                                    setTemperatureFilter(e.target.value)
                                }
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
                                size="sm"
                                onChange={(e) =>
                                    setDistanceFilter(e.target.value)
                                }
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

                            <Button
                                onClick={clearFilters}
                                size="sm"
                                sx={{
                                    display:
                                        placeTypeFilter ||
                                        temperatureFilter ||
                                        distanceFilter
                                            ? 'initial'
                                            : 'none',
                                }}
                            >
                                Clear Filters
                            </Button>
                        </SimpleGrid>
                    </Container>
                </Box>

                <Container maxW="container.xl" py={4}>
                    <PlacesList places={filteredPlaces} />
                </Container>
            </Box>
        </>
    );
};

export default Home;
