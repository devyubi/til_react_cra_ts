import TodoItem from './TodoItem';
import { TodoType } from '../../types/Todotypes';

interface TodoListProps {
  todos: TodoType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoListProps): JSX.Element => {
  //ts

  //tsx
  return (
    <div>
      <h2>할일 목록</h2>
      {todos.length === 0 ? (
        <p>목록이 없습니다.</p>
      ) : (
        <ul>
          {todos.map(item => (
            <TodoItem
              key={item.id}
              todo={item}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
      {/* 할일 즉, todos 는 여러개의 item으로 구성된 배열임. map으로 출력함 */}
    </div>
  );
};

export default TodoList;
