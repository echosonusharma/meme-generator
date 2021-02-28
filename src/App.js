import { Box, Grid, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Meme from "./components/Meme";
import MemeList from "./components/MemeList";

const url = 'https://api.imgflip.com/get_memes';

const App = () => {

  const [onPhone] = useMediaQuery("(max-width: 700px)");



  const [memeTemplates, setMemeTemplates] = useState([]);
  const [clickedTemplate, setClickedTemplate] = useState(null);

  const fetchMeme = async () => {
    const x = await fetch(url);
    const res = await x.json();
    setMemeTemplates(res.data.memes);
  }

  useEffect(() => {
    fetchMeme();
  }, [])

  if (onPhone) {
    return (
      <Box bgColor="gray.700" color="whiteAlpha.800" minH="100vh">
        {clickedTemplate && (
          <Box>
            <Meme template={clickedTemplate} />
          </Box>)}
        {
          !clickedTemplate && (
            <Box>
              <Text fontSize="4xl" textAlign="center" pb="4rem" pt="1rem">Meme Generator</Text>
              <VStack spacing={5}>
                {memeTemplates.map(template => {
                  return (
                    <MemeList template={template} onClick={() => {
                      setClickedTemplate(template);
                    }} />
                  )
                })}
              </VStack>
            </Box>
          )}
      </Box>
    )
  };

  return (
    <Box bgColor="gray.700" color="whiteAlpha.800" minH="100vh">
      {clickedTemplate && (
        <Box>
          <Meme template={clickedTemplate} />
        </Box>)}
      {
        !clickedTemplate && (
          <Box ml="21vw" mr="21vw" >
            <Text fontSize="7xl" textAlign="center" pb="4rem">Meme Generator</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={1}>
              {memeTemplates.map(template => {
                return (
                  <MemeList template={template} onClick={() => {
                    setClickedTemplate(template);
                  }} />
                )
              })}
            </Grid>
          </Box>
        )}
    </Box>
  )
}

export default App;
