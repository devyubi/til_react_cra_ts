import { TodoType } from './Todotypes';

type TodoItemProps = {
  todos: TodoType[];
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const TodoItem = ({ onToggle, onDelete, onEdit }: TodoItemProps) => {
  return <div>TodoItem</div>;
};

export default TodoItem;
