import React from 'react';

const MemeList = ({ template, onClick }) => {
    return (
        <>
            <h1>{template.name}</h1>
            <img style={{ width: '500px', padding: '5rem' }}
                alt={template.name}
                key={template.id}
                src={template.url}
                onClick={onClick}
            />
        </>
    )

}

export default MemeList;
