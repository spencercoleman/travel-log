import { Box, Container, Text, Stack, theme, Heading } from '@chakra-ui/react';

const Hero = (): JSX.Element => {
    return (
        <Box
            py={4}
            backgroundColor={theme.colors.cyan[700]}
            borderBottomWidth="6px"
            borderColor={theme.colors.cyan[800]}
        >
            <Container maxW="container.xl">
                <Stack width={['100%', null, null, '65%']}>
                    <Text color={theme.colors.cyan[100]} fontWeight="semibold">
                        Twenty years from now you will be more disappointed by
                        the things you didn’t do than by the ones you did do. So
                        throw off the bowlines, sail away from the safe harbor.
                        Catch the trade winds in your sails.
                    </Text>
                    <Heading py={2} color={theme.colors.white}>
                        Explore. Dream. Discover.
                    </Heading>
                    <Text as="i" color={theme.colors.cyan[100]}>
                        – Mark Twain
                    </Text>
                </Stack>
            </Container>
        </Box>
    );
};

export default Hero;
