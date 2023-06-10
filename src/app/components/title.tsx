import React from 'react';

interface Props {
  text: string;
} 

const Title = ({ text }: Props) => {
  return (
    <h1 className='text-3xl font-bold'>{text}</h1>
  );
}

export default Title;