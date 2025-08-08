import { TodoType } from './Todotypes';

type TodoListProps = {
  todos: TodoType[];
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

type TodoWriteProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  handleTodoUpdate: () => void;
};

const TodoWrite = ({ setTodos, handleTodoUpdate }: TodoWriteProps) => {
  return <div>TodoWrite</div>;
};

export default TodoWrite;
