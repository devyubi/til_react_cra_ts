# useState

- React 용 변수임 (실제론 리엑트용 변수란건 없지만, 수업 편의성으로 그렇게 부르고있음)
- set 으로 값을 변화시키면 rerendering 을 함

## 1. 기본 예제

- /src/components 폴더
- /src/components/Counter.tsx 파일 생성

- 기존 배웠던 문법 실습

```tsx
import { useState } from 'react';

// 2번 이상 반복되고, 가독성이 떨어짐
// 1. type 으로 정의 해보기
type VoidFunction = () => void;
type JSXElement = () => JSX.Element;

// 2. interface 로 정의해보기
interface IVoidFunction {
  (): void;
}
interface IJSXElement {
  (): JSX.Element;
}

const Counter: IJSXElement | JSXElement = (): JSX.Element => {
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

## 2. 실습 예제 1

- /src/components/NameEditor.tsx 파일 추가

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

## 3. 실습 예제 2

- /src/components/ToggleSwitch.tsx 파일 생성

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
      <h2>ToggleSwitch : {isOn ? 'ON' : 'OFF'}</h2>
      <div>
        <button onClick={handleClick}>토글</button>
      </div>
    </div>
  );
};

export default ToggleSwitch;
```

## 4. 실습 예제 3

- /src/components/User.tsx 파일 생성

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
  const handleClick: ClickType | IClick = (): void => {
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
