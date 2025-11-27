import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const TodoItem = ({ todo, onDelete, onUpdate, onEdit }) => {
    return (
        <div className="card mb-4 flex justify-between items-center" style={{
            borderLeft: todo.isCompleted ? '4px solid var(--success)' : '4px solid var(--primary)',
            opacity: todo.isCompleted ? 0.7 : 1
        }}>
            <div>
                <h3 style={{
                    textDecoration: todo.isCompleted ? 'line-through' : 'none',
                    color: todo.isCompleted ? 'var(--text-muted)' : 'var(--text-main)',
                    fontSize: '1.25rem',
                    marginBottom: '0.5rem'
                }}>
                    {todo.title}
                </h3>
                <p style={{ color: 'var(--text-muted)' }}>{todo.description}</p>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onUpdate(todo._id, { ...todo, isCompleted: !todo.isCompleted })}
                    className="btn"
                    style={{ background: todo.isCompleted ? 'var(--text-muted)' : 'var(--success)', color: 'white', padding: '0.5rem' }}
                    title={todo.isCompleted ? "Mark Incomplete" : "Mark Complete"}
                >
                    {todo.isCompleted ? <FaTimes /> : <FaCheck />}
                </button>
                <button
                    onClick={() => onEdit(todo)}
                    className="btn"
                    style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem' }}
                    title="Edit"
                >
                    <FaEdit />
                </button>
                <button
                    onClick={() => onDelete(todo._id)}
                    className="btn btn-danger"
                    style={{ padding: '0.5rem' }}
                    title="Delete"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
