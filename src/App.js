import React, { useState, useEffect } from 'react';
import MemeList from './components/MemeList';

const url = 'https://api.imgflip.com/get_memes';

const App = () => {
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

  return (
    <div>
      {clickedTemplate && (
        <>
          <MemeList template={clickedTemplate} />
        </>)}
      {
        !clickedTemplate && (
          <>
            <h1> choose a meme template </h1>
            {memeTemplates.map(template => {
              return (
                <MemeList template={template} onClick={() => {
                  setClickedTemplate(template);
                }} />
              )
            })
            }
          </>)
      }
    </div>
  )
}

export default App;
