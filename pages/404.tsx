import { useRouter } from 'next/router';
import {
    Button,
    Center,
    Container,
    Heading,
    Stack,
    Text,
    theme,
} from '@chakra-ui/react';

const NotFound = (): JSX.Element => {
    const router = useRouter();

    return (
        <Container maxW="container.xl">
            <Center py={4}>
                <Stack spacing={4}>
                    <Stack>
                        <Heading size="lg">Oops!</Heading>
                        <Text fontWeight="semibold">
                            This page could not be not found. 😞
                        </Text>
                    </Stack>

                    <Button
                        backgroundColor={theme.colors.cyan[700]}
                        color={theme.colors.white}
                        onClick={() => router.push('/')}
                        sx={{
                            '&:hover, &:focus': {
                                backgroundColor: theme.colors.cyan[800],
                            },
                        }}
                    >
                        Go back
                    </Button>
                </Stack>
            </Center>
        </Container>
    );
};

export default NotFound;
