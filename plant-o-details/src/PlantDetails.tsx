import React from 'react';

interface Props{
  name: string;
  beschreibung: string;
}
const PlantDetails = (props: Props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.beschreibung}</p>
    </div>
  )
}