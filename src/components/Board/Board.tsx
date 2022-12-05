import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Link, useParams } from 'react-router-dom';
import { Column } from '../Column/Column';
import { column, initial, task } from '../../models/initial';
import { useGetColumnsQuery } from '../../store/api/columnApi';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useBoardActions } from '../../hooks/actions';
import {
  useGetTaskSetByBoardQuery,
  usePutTaskWithoutRefetchMutation,
} from '../../store/api/taskApi';
import { useGetBoardByIdQuery, usePutBoardMutation } from '../../store/api/boardApi';
import { usePutColumnWithoutRefetchMutation } from '../../store/api/columnApi';
import './Boards.scss';
import { translateDataFromApiToStateObject } from '../../utils/translateDataFromApiToStateObject';
import { onDragEnd } from '../../utils/onDragEnd';
import { Loader } from '../Loader/Loader';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import { useTranslation } from 'react-i18next';
import { CreateColumnModal } from '../CreateColumn/CreateColumnModal';
import Back from '../../assets/images/icons/back.png';
import Tick from '../../assets/images/icons/tick.png';
import Cross from '../../assets/images/icons/cross.png';
import { IBoardRes } from '../../models';
import { toast } from 'react-toastify';

export function Board() {
  const { t } = useTranslation();
  const { id } = useParams();
  const board = useSelector((state: RootState) => state.board.board);
  const { setBoard } = useBoardActions();
  const { data: columns, isLoading } = useGetColumnsQuery(id!);
  const { data: tasks } = useGetTaskSetByBoardQuery(id!);
  const { data } = useGetBoardByIdQuery(id!);
  const [putColumn] = usePutColumnWithoutRefetchMutation();
  const [putTask] = usePutTaskWithoutRefetchMutation();
  const [createColumnModal, setCreateColumnModal] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [boardName, setBoardName] = useState(data?.title);
  const [putBoard] = usePutBoardMutation();
  const { id: userId } = JSON.parse(localStorage.getItem('user') || '');

  function toggleInput() {
    setToggle(false);
  }

  useEffect(() => {
    setBoardName(data?.title);
  }, [data?.title]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setToggle(true);
    if (boardName!.length < 4) {
      toast.error(t('boards.min-length'), {
        autoClose: 2000,
      });
      setBoardName(data?.title);
      return;
    }
    if (boardName === data?.title) {
      return;
    }
    putBoard({
      boardId: id!,
      payload: { title: boardName, owner: userId, users: [userId] } as IBoardRes,
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBoardName(event.target.value);
  }

  useEffect(() => {
    setBoard(translateDataFromApiToStateObject(columns!, tasks!)! as initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, tasks]);

  if (isLoading) return <Loader />;

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, board, setBoard, putColumn, putTask, id!)}
      >
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => {
            return (
              <div className="app-container">
                <div className="board-main">
                  <div
                    style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                    className="py-2"
                  >
                    <Link to="/boards">
                      <Button style={{ display: 'flex', gap: '10px' }} className="action_button">
                        <img src={Back} height="20px" alt="back"></img>
                        {t('board.back')}
                      </Button>
                    </Link>

                    {toggle ? (
                      <div className="h4 m-0" onDoubleClick={toggleInput}>
                        {data?.title}
                      </div>
                    ) : (
                      <Form
                        onSubmit={handleSubmit}
                        style={{
                          display: 'flex',
                          gap: '5px',
                          alignItems: 'center',
                        }}
                      >
                        <Form.Control
                          type="text"
                          placeholder={String(t('board.editName'))}
                          value={boardName}
                          onChange={handleChange}
                        />
                        <Button variant="outline-success" type="submit" className="put_button">
                          <img src={Tick} alt="" />
                        </Button>
                        <Button
                          variant="outline-danger"
                          type="submit"
                          className="put_button"
                          onClick={() => setToggle(true)}
                        >
                          <img src={Cross} alt="" />
                        </Button>
                      </Form>
                    )}
                  </div>
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="container-xxl d-flex gap-4 p-0 h-100 mb-1"
                    style={{ overflowX: 'scroll', height: 'maxContent' }}
                  >
                    <>
                      {board.columnOrder &&
                        board.columnOrder.map((columnId: string, index: number) => {
                          const column = board.columns[columnId];
                          return (
                            <InnerList
                              key={column.id}
                              column={column}
                              taskMap={board.tasks}
                              index={index}
                              boardId={id!}
                            />
                          );
                        })}
                      {provided.placeholder}
                      <Button
                        onClick={() => setCreateColumnModal(true)}
                        style={{ minWidth: '200px', height: '50px' }}
                      >
                        {t('board.columnCreation')}
                      </Button>
                    </>

                    <ModalComponent
                      show={createColumnModal}
                      title={t('columns.modal.creating')}
                      onHide={() => setCreateColumnModal(false)}
                      setModal={setCreateColumnModal}
                    >
                      <CreateColumnModal setCreateColumnModal={setCreateColumnModal} />
                    </ModalComponent>
                  </div>
                </div>
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </>
  );
}

const InnerList = (props: {
  column: column;
  index: number;
  taskMap: Record<string, task>;
  boardId: string;
}) => {
  const { column, taskMap, index, boardId } = props;
  const tasks = column.taskIds.map((taskId) => taskMap[taskId]);
  return <Column column={column} tasks={tasks} index={index} key={index} boardId={boardId} />;
};
