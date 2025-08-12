import { ChangeEvent, useState } from 'react';
import { TodoType } from '../../types/Todotypes';

type TodoWriteProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  handleTodoUpdate: (newTodo: TodoType) => void;
};

const TodoWrite = ({ setTodos, handleTodoUpdate }: TodoWriteProps) => {
  // js 자리
  // 할일 제목 값 관리
  const [title, setTitle] = useState<string>('');

  // 새 할일 등록하기
  const handleAdd = () => {
    // 공백 입력 금지하기
    if (title.trim()) {
      // {id: "", title: "", completed:false}
      const newTodo: TodoType = {
        id: Date.now().toString(),
        title: title,
        completed: false,
      };
      // 1. 만약 setTodo 등의 useState 를 활용한다면 ?
      // 아래는 prev : 현재 최신 state 를 나타냄
      // setTodos(prev => [newTodo, ...prev]);
      handleTodoUpdate(newTodo);
    }
  };
  // title 변경시 onChange 이벤트 처리해보기
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 엔터키 등록
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  // jsx 자리
  return (
    <div>
      <input type="text" value={title} onKeyDown={handleKeyDown} onChange={handleChange} />
      <button onClick={handleAdd}>등록</button>
    </div>
  );
};

export default TodoWrite;
