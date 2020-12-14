import React, {useState} from 'react';




const Chapter = () => {
  
  const { ref: chapterName, text: chapterText } = this.props.chapter;
  return (
    <>
      <h1>{chapterName}</h1>
      {chapterText.map((text, index) => (
        <span key={index}>{text}</span>
      ))}
    </>
  );
};

export default Chapter;
