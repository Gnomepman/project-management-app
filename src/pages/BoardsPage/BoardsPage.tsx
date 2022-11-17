import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../store/api/signIn.api';

export function BoardsPage() {
  //const { boards, setBoards } = useState([]);
  const temp = 123;

  // Todo refactor
  const { isLoading, isError, data } = useGetUserByIdQuery('636d6464c02777e984c57dc1');

  useEffect(() => {
    //fetch boards and setBoards()
  });

  console.log(data);
  return (
    <>
      <div>Here will be boards </div>
      <p className="text-bg-danger">{data?.name}</p>
      {/* {boards.map((elem) => { */}
      <Link to={`/boards/${temp}`}>testing board</Link>

      {/* })} */}
    </>
  );
}
