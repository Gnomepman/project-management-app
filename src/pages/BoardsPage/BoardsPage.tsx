import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { useGetBoardByIdQuery } from '../../store/api/boardApi';
import { ErrorComponent } from '../../components/Error/ErrorComponent';

export function BoardsPage() {
  const boarderId = '63763bacc02777e984c57e3a';
  const { isLoading, isError, error, data } = useGetBoardByIdQuery(boarderId);

  //const { boards, setBoards } = useState([]);
  const temp = 123;
  console.log(error);

  useEffect(() => {
    //fetch boards and setBoards()
  });
  return (
    <>
      <div>Here will be boards</div>
      {/* {boards.map((elem) => { */}
      <Link to={`/boards/${temp}`}>testing board</Link>

      {/* })} */}
      {isLoading && <Loader />}
      {isError && <ErrorComponent />}
      {data && <p className="fw-bold">Fetched mockBorder title: {data.title}</p>}
    </>
  );
}
