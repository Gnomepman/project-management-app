import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function Board() {
  const { id } = useParams();

  useEffect(() => {
    //fetch columns using id
  });
  return (
    <>
      <div>Board {id}</div>
    </>
  );
}
