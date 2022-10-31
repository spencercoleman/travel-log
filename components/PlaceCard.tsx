import {
    Badge,
    Box,
    Heading,
    Stack,
    Icon,
    Flex,
    chakra,
} from '@chakra-ui/react';
import {
    FaMountain,
    FaBuilding,
    FaCampground,
    FaUmbrellaBeach,
    FaThermometerEmpty,
    FaThermometerHalf,
    FaThermometerThreeQuarters,
} from 'react-icons/fa';
import { IoAirplane, IoLocationSharp } from 'react-icons/io5';
import { TypePlace } from '../types';
import Image from 'next/image';
import React, { ReactNode } from 'react';

const CardImage = chakra(Image, {
    baseStyle: { maxH: 225, maxW: 'auto' },
    shouldForwardProp: (prop) =>
        [
            'width',
            'height',
            'src',
            'alt',
            'quality',
            'placeholder',
            'blurDataURL',
            'loader ',
            'priority',
        ].includes(prop),
});

interface TagProps {
    colorScheme?: string;
    children: ReactNode;
}

const Tag = ({ colorScheme, children }: TagProps): JSX.Element => {
    return (
        <Badge
            colorScheme={colorScheme}
            textTransform="initial"
            borderRadius="xl"
            display="flex"
            alignItems="center"
            gap={1}
            px={3}
            py={1}
        >
            {children}
        </Badge>
    );
};

interface PlaceCardProps {
    place: TypePlace;
}

const PlaceCard = ({ place }: PlaceCardProps): JSX.Element => {
    const { name, image, type, distance, temperature, visited, visitedDate } =
        place.fields;

    const getPlaceIcon = (type: string) => {
        switch (type) {
            case 'beach':
                return FaUmbrellaBeach;
            case 'camp':
                return FaCampground;
            case 'mountains':
                return FaMountain;
            default:
                return FaBuilding;
        }
    };

    const getTemperatureIcon = (temperature: string) => {
        switch (temperature) {
            case 'temperate':
                return FaThermometerHalf;
            case 'hot':
                return FaThermometerThreeQuarters;
            default:
                return FaThermometerEmpty;
        }
    };

    return (
        <Box
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            position="relative"
            pb={1}
        >
            {visited && (
                <Box p={2} position="absolute" right={0} zIndex={10}>
                    <Tag colorScheme="green">
                        <Icon as={IoAirplane} /> Visited{' '}
                        {new Date(visitedDate!).toLocaleDateString()}
                    </Tag>
                </Box>
            )}

            <CardImage
                src={`https:${image.fields.file.url}`}
                alt={name}
                width={image.fields.file.details.image?.width}
                height={image.fields.file.details.image?.height}
                pos="relative"
                objectFit="cover"
                priority={true}
            />

            <Stack p={3} spacing={3}>
                <Heading
                    mt="1"
                    fontWeight="semibold"
                    as="h3"
                    size="sm"
                    lineHeight="tight"
                    noOfLines={1}
                >
                    {name}
                </Heading>

                <Flex wrap="wrap" gap={2}>
                    <Tag>
                        <Icon as={getPlaceIcon(type)} />
                        {type.slice(0, 1).toUpperCase() + type.slice(1)}
                    </Tag>

                    <Tag>
                        <Icon as={getTemperatureIcon(temperature)} />
                        {temperature.slice(0, 1).toUpperCase() +
                            temperature.slice(1)}
                    </Tag>

                    <Tag>
                        <Icon as={IoLocationSharp} />
                        {distance.slice(0, 1).toUpperCase() + distance.slice(1)}
                    </Tag>
                </Flex>
            </Stack>
        </Box>
    );
};

export default PlaceCard;
