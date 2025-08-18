import { TodoType } from '../../types/Todotypes';

// 상태 (state) 타입
export type TodoState = {
  todos: TodoType[];
};

// action 타입
export type AddAction = { type: 'ADD'; payload: TodoType };
export type toggleAction = { type: 'TOGGLE'; payload: { id: string } };
export type deleteAction = { type: 'DELETE'; payload: { id: string } };
export type editAction = { type: 'EDIT'; payload: { id: string; title: string } };
export type todoAction = AddAction | toggleAction | deleteAction | editAction;

// 초기 상태값
export const initialState: TodoState = {
  todos: [],
};
