import { Box, Center, Container, Text } from '@chakra-ui/react';
import React from 'react';

const MemeList = ({ template, onClick }) => {
    return (
        <Container maxW="xl" centerContent >
            <Box
                key={template.id}
                border="2px"
                borderColor="whiteAlpha.400"
                p="1rem"
                borderRadius="0.5rem">
                <Text fontSize="1.3rem" pb="10px" >{template.name}</Text>
                <Center>
                    <img style={{ width: '300px' }}
                        alt={template.name}
                        key={template.id}
                        src={template.url}
                        onClick={onClick}
                    />
                </Center>
            </Box>
        </Container>
    )

}

export default MemeList;
