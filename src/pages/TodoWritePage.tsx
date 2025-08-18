import TodoWrite from '../components/todos/TodoWrite';
import { NavLink } from 'react-router-dom';

function TodoWritePage() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">할일 작성</h2>
        <NavLink
          to={'/todos/read'}
          className="rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          목록
        </NavLink>
      </div>
      <div className="rounded-xl2 shadow-card space-y-6 bg-white p-6 dark:bg-neutral-800">
        <TodoWrite />
      </div>
    </section>
  );
}

export default TodoWritePage;
