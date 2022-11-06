import { ReactNode } from 'react';
import { Badge } from '@chakra-ui/react';

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

export default Tag;
