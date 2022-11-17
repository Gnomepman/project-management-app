import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function BoardsPage() {
  //const { boards, setBoards } = useState([]);
  const temp = 123;

  useEffect(() => {
    //fetch boards and setBoards()
  });
  return (
    <>
      <div>Here will be boards</div>
      {/* {boards.map((elem) => { */}
      <Link to={`/boards/${temp}`}>testing board</Link>

      {/* })} */}
    </>
  );
}
