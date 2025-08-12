import { TodoType } from '@/types/Todotypes';
import { KeyboardEvent, useState } from 'react';

type TodoItemProps = {
  todo: TodoType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
};
const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  // 현재 Edit 상태인지 아닌지 관리
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // Edit 상태라면 입력중인 title 내용 관리
  const [editTitle, setEditTitle] = useState<string>(todo.title);

  // 수정은 별도의 입력창 구성으로 수정 후 값만 업데이트함
  const handleEdit = () => {
    console.log('여기에서 내용을 수정하는 기능 작성 후 완료된 데이터 전송');
    // isEdit 을 true 로 변경
    setIsEdit(true);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditSave();
    }
    if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  // 수정 후 저장 기능
  const handleEditSave = () => {
    console.log('수정 완료 저장');
    // 1. 업데이트 해줌
    if (editTitle.trim()) {
      // 변경 되어야할 ID와 새로운 타이틀을 전달함
      onEdit(todo.id, editTitle);
      // 2. 상태는 isEdit을 false로 변경
      setIsEdit(false);
    }
  };

  // 수정 후 취소 기능
  const handleEditCancel = () => {
    // 1. editTitle을 원래대로 돌림
    setEditTitle(todo.title);
    // 2. isEdit을 false 로 설정
    setIsEdit(false);
  };

  // css 객체 만들기
  const listyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    color: todo.completed ? 'gray' : 'red',
    textDecoration: todo.completed ? 'line-through' : 'none',
  };

  return (
    <li style={listyle}>
      {isEdit ? (
        <>
          <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
          <button onClick={handleEditSave}>저장</button>
          <button onClick={handleEditCancel}>취소</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            onChange={() => onToggle(todo.id)}
            checked={todo.completed}
            onKeyDown={handleKeyDown}
          />
          <span>{todo.title}</span>
          <button onClick={handleEdit}>수정</button>
          <button onClick={() => onDelete(todo.id)}>삭제</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
