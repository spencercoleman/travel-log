import { Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import { TypePlace } from '../types';
import PlaceCard from './PlaceCard';

interface Props {
    title: string;
    places: TypePlace[];
}

const PlacesList = ({ title, places }: Props): JSX.Element => {
    return (
        <Stack spacing={3}>
            <Heading as="h2" size="lg">
                {title}
            </Heading>
            <SimpleGrid columns={[1, null, 2, 3]} spacing="20px">
                {places.map((place) => (
                    <PlaceCard key={place.sys.id} place={place} />
                ))}
            </SimpleGrid>
        </Stack>
    );
};

export default PlacesList;
