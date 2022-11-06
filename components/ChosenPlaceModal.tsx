import { TypePlace } from '../types';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Flex,
    Icon,
    chakra,
    Stack,
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
import { IoLocationSharp } from 'react-icons/io5';
import Image from 'next/image';
import Tag from './Tag';

const PlaceImage = chakra(Image, {
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

interface ChosenPlaceModalProps {
    isOpen: boolean;
    onClose: () => void;
    chosenPlace: TypePlace;
}

const ChosenPlaceModal = ({
    isOpen,
    onClose,
    chosenPlace,
}: ChosenPlaceModalProps): JSX.Element => {
    const { name, image, type, distance, temperature } = chosenPlace.fields;

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
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent borderRadius="xl" pb={3}>
                    <ModalHeader>{name}</ModalHeader>

                    <ModalCloseButton />

                    <ModalBody pt={0}>
                        <Stack spacing={4}>
                            <PlaceImage
                                src={`https:${image.fields.file.url}`}
                                alt={name}
                                width={image.fields.file.details.image?.width}
                                height={image.fields.file.details.image?.height}
                                pos="relative"
                                objectFit="cover"
                                priority={true}
                                borderRadius="lg"
                            />

                            <Flex wrap="wrap" gap={3}>
                                <Tag>
                                    <Icon as={getPlaceIcon(type)} />
                                    {type.slice(0, 1).toUpperCase() +
                                        type.slice(1)}
                                </Tag>
                                <Tag>
                                    <Icon
                                        as={getTemperatureIcon(temperature)}
                                    />
                                    {temperature.slice(0, 1).toUpperCase() +
                                        temperature.slice(1)}
                                </Tag>
                                <Tag>
                                    <Icon as={IoLocationSharp} />
                                    {distance.slice(0, 1).toUpperCase() +
                                        distance.slice(1)}
                                </Tag>
                            </Flex>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ChosenPlaceModal;
