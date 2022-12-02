import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Link, useParams } from 'react-router-dom';
import { Column } from '../Column/Column';
import { column, initial, task } from '../../models/initial';
import { useGetColumnsQuery } from '../../store/api/columnApi';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useBoardActions } from '../../hooks/actions';
import { useGetTaskSetByBoardQuery, usePutTaskMutation } from '../../store/api/taskApi';
import { useGetBoardByIdQuery } from '../../store/api/boardApi';
import { usePutColumnMutation } from '../../store/api/columnApi';
import './Boards.scss';
import { translateDataFromApiToStateObject } from '../../utils/translateDataFromApiToStateObject';
import { onDragEnd } from '../../utils/onDragEnd';
import { Loader } from '../Loader/Loader';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import { useTranslation } from 'react-i18next';
import { CreateColumnModal } from '../CreateColumn/CreateColumnModal';

export function Board() {
  const { t } = useTranslation();

  const { id } = useParams();
  const board = useSelector((state: RootState) => state.board.board);
  const { setBoard } = useBoardActions();
  const { data: columns, isLoading } = useGetColumnsQuery(id!);
  const { data: tasks } = useGetTaskSetByBoardQuery(id!);
  const { data } = useGetBoardByIdQuery(id!);
  const [putColumn] = usePutColumnMutation();
  const [putTask] = usePutTaskMutation();

  const [createColumnModal, setCreateColumnModal] = useState(false);

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
            if (!board) {
              return <p>Loading</p>;
            }
            return (
              <div className="app-container">
                <div className="board-main">
                  <div
                    style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                    className="py-2"
                  >
                    <Link to="/boards">
                      <Button>Back</Button>
                    </Link>
                    <div className="h4 m-0">{data?.title}</div>
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
                        Create column
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
