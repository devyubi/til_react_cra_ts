# useState

- 리액트용 변수이다. (수업편의)
- set으로 값을 변화시키면 리랜더링을 한다.

## 0. `@`으로 절대경로 설정하기

- tsconfig.json

```json
"baseUrl": "src", // 프로젝트의 기본 경로
"paths": {
  "@/*": ["*"], // @/ 로 src 폴더 전체를 참조
  "@types/*": ["types/*"] // @types 로 src/types 참조
},
```

## 1. 기본예제

- /src/components 폴더 생성
- Counter.tsx 파일 생성

```tsx
import { useState } from 'react';

// 2번이상 반복되고, 가독성이 떨어집니다.
// 1. type 으로 정의해 보자.
type VoidFunction = () => void;
type JSXElement = () => JSX.Element;

// 2. interface 로 정의해 보자
interface IVoidFunction {
  (): void;
}
interface IJSXElement {
  (): JSX.Element;
}

const Counter: IJSXElement | JSXElement = () => {
  // ts 자리
  const [count, setCount] = useState<number>(0);

  const handleAdd: IVoidFunction | VoidFunction = () => {
    setCount(count + 1);
  };
  const handleMinus: IVoidFunction | VoidFunction = () => {
    setCount(count - 1);
  };
  const handleReset: IVoidFunction | VoidFunction = () => {
    setCount(0);
  };
  // tsx 자리
  return (
    <div>
      <h2>Counte : {count} </h2>
      <button onClick={handleAdd}>증가</button>
      <button onClick={handleMinus}>감소</button>
      <button onClick={handleReset}>초기화</button>
    </div>
  );
};

export default Counter;
```

## 2. 실습 예제 1.

- /src/components/NameEditor.tsx

```tsx
import { ChangeEvent, MouseEvent, useState } from 'react';

// 1. type 으로 함수 리턴형을 생성해보자.
type JSXElement = () => JSX.Element;
type ChangeEventInput = (e: ChangeEvent<HTMLInputElement>) => void;
type ClickEventButton = (e: MouseEvent<HTMLButtonElement>) => void;
type NameType = string;

// 2. interface 로 정의하기
interface IJSXElement {
  (): JSX.Element;
}
interface IChangeEventInput {
  (e: ChangeEvent<HTMLInputElement>): void;
}
interface IClickEventButton {
  (e: MouseEvent<HTMLButtonElement>): void;
}

const NameEditor: JSXElement | IJSXElement = () => {
  // ts 자리
  const [name, setName] = useState<NameType>('');
  const handleName: ChangeEventInput | IChangeEventInput = (e): void => {
    setName(e.target.value);
  };
  const handleClick: ClickEventButton | IClickEventButton = (e): void => {
    console.log('클릭');
    setName('');
  };
  // tsx 자리
  return (
    <div>
      <h2>NameEditor : {name} </h2>
      <div>
        <input type="text" value={name} onChange={e => handleName(e)} />
        <button onClick={e => handleClick(e)}>확인</button>
      </div>
    </div>
  );
};

export default NameEditor;
```

## 3. 실습 예제 2.

- /src/components/ToggleSwitch.tsx

```tsx
import { useState } from 'react';

// 1. type
type ClickType = () => void;
type JSXElement = () => JSX.Element;
// 2. interface
interface IClickType {
  (): void;
}
interface IJSXElement {
  (): JSX.Element;
}

const ToggleSwitch: IJSXElement | JSXElement = () => {
  // ts 자리
  const [isOn, setIsOn] = useState<boolean>(false);
  const handleClick: ClickType | IClickType = () => {
    setIsOn(!isOn);
  };
  // tsx 자리
  return (
    <div>
      <h2>ToggleSwitch : {isOn ? '밝아요' : '어두워요'}</h2>
      <div>
        <button onClick={handleClick}>토글</button>
      </div>
    </div>
  );
};

export default ToggleSwitch;
```

## 4. 실습 예제 3.

- /src/components/User.tsx

```tsx
import { useState } from 'react';
// 1. type 정의
type UserType = { age: number; name: string };
type ClickType = () => void;

// 2. interface 정의
interface IUser {
  age: number;
  name: string;
}
interface IClick {
  (): void;
}
const User = (): JSX.Element => {
  // ts 자리
  const [user, setUser] = useState<UserType | IUser>({ name: '아이유', age: 20 });
  const handleClick: ClickType | IClick = () => {
    setUser({ ...user, age: user.age + 1 });
  };
  // tsx 자리
  return (
    <div>
      <h2>
        User : {user.name}님 나이는 {user.age} 입니다.
      </h2>
      <div>
        <button onClick={handleClick}>나이 증가</button>
      </div>
    </div>
  );
};

export default User;
```

## 5. 실습 예제 4. (useState 버전 Todo)

- 타입정의를 위한 폴더 : /src/todos/Todotypes.ts 폴더 생성

- 글쓰기 : /src/todos/TodoWrite.tsx
  - 입력창, 등록버튼

- 글목록 : /src/todos/TodoList.tsx

- 글한개의 아이템 : /src/todos/TodoItem.tsx
  - 아이디, 제목, 완료여부, 수정버튼, 삭제버튼
  - 상태 2가지 : 목록상태, 편집상태

- App.tsx

```tsx
import { useState } from 'react';
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';
// 공통으로 사용하는 type 정의 및 interface는 별도의 폴더에 보관하자!
import { ITodoType, TodoType } from './types/Todotypes';

// 테스트를 위한 목업 데이터 (/src/api/dummy.ts 추천)
import { initialTodos } from './components/api/dummy';
import { title } from 'process';
// const initialTodos: TodoType[] = [];

function App(): JSX.Element {
  // ts 자리
  // {id: "", title: "", completed:false}
  const [todos, setTodos] = useState<(ITodoType | TodoType)[]>(initialTodos);

  // todos 를 업데이트 하는 함수
  const handleTodoUpdate = (newTodo: TodoType): void => {
    setTodos(prev => [newTodo, ...prev]);
    // const arr: TodoType[] = [newTodo, ...todos];
    // setTodos(arr);
  };
  // todo 목록에서 실행할 함수들
  const onToggle = (id: string): void => {
    console.log('onToggle:', id);
    // 전달 받은 ID를 이용해서 map으로 찾아서 id가 같으면 completed 변경
    const arr: TodoType[] = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(arr);
  };
  const onDelete = (id: string): void => {
    console.log('onDelete:', id);
    // 전달 받은 ID를 제외한 나머지만 모아서 목록 변경
    const arr: TodoType[] = todos.filter(todo => todo.id !== id);
    setTodos(arr);
  };
  const onEdit = (id: string, newTitle: string): void => {
    // console.log('onEdit', id);
    // console.log('onEdit newTitle', newTitle);
    // ID 와 새로운 타이틀을 알 수 있다
    // ID를 이용해서 해당 타이틀을 수정하고 업데이트 해보자
    const arr: TodoType[] = todos.map(item =>
      item.id === id ? { ...item, title: newTitle } : item,
    );
    setTodos(arr);
  };
  // tsx 자리
  return (
    <div>
      <h1>할일 앱서비스</h1>
      <div>
        <TodoWrite setTodos={setTodos} handleTodoUpdate={handleTodoUpdate} />
        <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  );
}

export default App;
```

- /src/components/todos/TodoWrite.tsx

- /src/components/todos/TodoList.tsx

```tsx
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
```

- /src/components/todos/TodoItem.tsx

```tsx
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
```

- /src/components/types/Todotypes.tsx

```tsx
// 1.  type 으로 하겠다.
export type TodoType = { id: string; title: string; completed: boolean };
// 2. interface 으로 하겠다.
export interface ITodoType {
  id: string;
  title: string;
  completed: boolean;
}
```
