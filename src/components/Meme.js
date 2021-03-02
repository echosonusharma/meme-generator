import { Box, Button, Center, FormControl, FormLabel, HStack, Input, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import FileSaver from 'file-saver';
import React, { useState } from 'react';

const objectToQueryParma = (obj) => {
    const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`)
    return '?' + params.join('&')
}

const MemeList = ({ template }) => {
    const [onPhone] = useMediaQuery("(max-width: 700px)");

    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [meme, setMeme] = useState(null);

    const onSubmit = async () => {
        const params = {
            template_id: template.id,
            text0: topText,
            text1: bottomText,
            username: process.env.REACT_APP_IMGFLIP_USERNAME,
            password: process.env.REACT_APP_IMGFLIP_PASSWORD
        }
        const x = await fetch(`https://api.imgflip.com/caption_image${objectToQueryParma(params)}`)
        const res = await x.json();
        setMeme(res.data.url);
    }

    if (onPhone) {
        return (
            <VStack >
                <Box pb="3rem" pt="1rem">
                    <Button
                        bgColor="burlywood"
                        color="gray.600"
                        size="sm"
                        onClick={() => window.location.reload()}>Reload memes</Button>
                </Box>
                <Box p="1rem">
                    <Text fontSize="1.3rem" pb="10px" >{template.name}</Text>
                    <Center>
                        <img style={{ width: '500px' }}
                            alt={template.name}
                            key={template.id}
                            src={template.url}
                        />
                    </Center>
                </Box>
                <Box color="whiteAlpha.700">
                    <FormControl id="Top-Text" pb="2rem">
                        <FormLabel>Enter Top-Text</FormLabel>
                        <Input
                            w="80vw"
                            type="text"
                            onChange={e => setTopText(e.target.value)} />
                    </FormControl>
                    <FormControl id="Bottom-Text" pb="2rem" >
                        <FormLabel>Enter Bottom-Text</FormLabel>
                        <Input
                            w="80vw"
                            type="text"
                            onChange={e => setBottomText(e.target.value)} />
                    </FormControl>
                    <Center pb="1rem">
                        <Button color="blackAlpha.700" onClick={onSubmit}>Generate</Button>
                    </Center>
                </Box>
                {meme &&
                    <VStack p="1rem">
                        <img src={meme} alt="bbs" />
                        <Center pt="1rem" color="blackAlpha.700">
                            <Button onClick={() => FileSaver.saveAs(meme, `meme_${Math.floor((Math.random() * 100000) + 1)}.jpg`)}>Download</Button>
                        </Center>
                    </VStack>}
            </VStack>
        )
    };


    return (
        <Center min-h="100vh" >
            <VStack p="2rem 0">
                <Box pb="3rem" >
                    <Button
                        bgColor="burlywood"
                        color="gray.600"
                        size="lg"
                        onClick={() => window.location.reload()}>Reload memes</Button>
                </Box>
                <HStack>
                    <Box
                        border="2px"
                        borderColor="blackAlpha.600"
                        borderRadius="1rem"
                        p="1rem"
                    >
                        <Text fontSize="1.3rem" pb="10px" >{template.name}</Text>
                        <Center>
                            <img style={{ width: '500px' }}
                                alt={template.name}
                                key={template.id}
                                src={template.url}
                            />
                        </Center>
                    </Box>
                    <Box color="whiteAlpha.700" pl="4rem">
                        <FormControl id="Top-Text" pb="2rem">
                            <FormLabel>Enter Top-Text</FormLabel>
                            <Input
                                type="text"
                                onChange={e => setTopText(e.target.value)} />
                        </FormControl>
                        <FormControl id="Bottom-Text" pb="2rem">
                            <FormLabel>Enter Bottom-Text</FormLabel>
                            <Input
                                type="text"
                                onChange={e => setBottomText(e.target.value)} />
                        </FormControl>
                        <Button color="blackAlpha.700" onClick={onSubmit}>Generate</Button>
                    </Box>
                    {meme &&
                        <Box pl="3rem">
                            <img src={meme} alt="bbs" width="500px" />
                            <Center pt="1rem" color="blackAlpha.700">
                                <Button onClick={() => FileSaver.saveAs(meme, `meme_${Math.floor((Math.random() * 100000) + 1)}.jpg`)}>Download</Button>
                            </Center>
                        </Box>}
                </HStack>
            </VStack>
        </Center >
    )

}

export default MemeList;