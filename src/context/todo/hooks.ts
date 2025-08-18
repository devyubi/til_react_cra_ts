import { useContext } from 'react';
import { TodoActionContext, TodoStateContext } from './TodoProvider';

export function useTodoState() {
  const state = useContext(TodoStateContext);
  if (!state) {
    throw new Error('State 가 없습니다.');
  }
  return state;
}

// Action 전용 Context 사용
export function useTodoActions() {
  const actions = useContext(TodoActionContext);
  if (!actions) {
    throw new Error('Action 이 없습니다.');
  }
  return actions;
}
