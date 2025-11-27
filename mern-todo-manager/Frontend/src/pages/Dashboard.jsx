import { useState, useEffect } from 'react';
import api from '../utils/api';
import TodoItem from '../components/TodoItem';
import { FaPlus, FaCreditCard, FaSave, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);

    const fetchTodos = async () => {
        try {
            const { data } = await api.get('/todos');
            setTodos(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;

        try {
            if (editingTodo) {
                const { data } = await api.put(`/todos/${editingTodo._id}`, { title, description });
                setTodos(todos.map((t) => (t._id === editingTodo._id ? data : t)));
                setEditingTodo(null);
            } else {
                const { data } = await api.post('/todos', { title, description });
                setTodos([...todos, data]);
            }
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (todo) => {
        setEditingTodo(todo);
        setTitle(todo.title);
        setDescription(todo.description);
    };

    const handleCancelEdit = () => {
        setEditingTodo(null);
        setTitle('');
        setDescription('');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/todos/${id}`);
                setTodos(todos.filter((t) => t._id !== id));
                if (editingTodo && editingTodo._id === id) {
                    handleCancelEdit();
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleUpdateStatus = async (id, updatedTodo) => {
        try {
            const { data } = await api.put(`/todos/${id}`, updatedTodo);
            setTodos(todos.map((t) => (t._id === id ? data : t)));
        } catch (error) {
            console.error(error);
        }
    };

    const handlePayment = async () => {
        try {
            setPaymentStatus('Processing...');
            const { data } = await api.post('/payment', { amount: 100 });
            setPaymentStatus(`Success: ${data.message}`);
            setTimeout(() => setPaymentStatus(''), 3000);
        } catch (error) {
            setPaymentStatus('Payment Failed');
            setTimeout(() => setPaymentStatus(''), 3000);
        }
    };

    return (
        <div className="container">
            <div className="flex justify-between items-center mb-4">
                <h1>My Tasks</h1>
                <button onClick={handlePayment} className="btn" style={{ background: 'var(--success)', color: 'white' }}>
                    <FaCreditCard style={{ marginRight: '0.5rem' }} /> Simulate Payment
                </button>
            </div>

            {paymentStatus && (
                <div className="card mb-4" style={{ borderColor: 'var(--success)', color: 'var(--success)' }}>
                    {paymentStatus}
                </div>
            )}

            <div className="card mb-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Description (Optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ flex: 2 }}
                    />
                    <button type="submit" className="btn" style={{ background: editingTodo ? 'var(--warning)' : 'var(--primary)', color: 'white' }}>
                        {editingTodo ? <FaSave /> : <FaPlus />}
                    </button>
                    {editingTodo && (
                        <button type="button" onClick={handleCancelEdit} className="btn btn-danger">
                            <FaTimes />
                        </button>
                    )}
                </form>
            </div>

            {loading ? (
                <p className="text-center">Loading tasks...</p>
            ) : todos.length > 0 ? (
                todos.map((todo) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onDelete={handleDelete}
                        onUpdate={handleUpdateStatus}
                        onEdit={handleEdit}
                    />
                ))
            ) : (
                <p className="text-center" style={{ color: 'var(--text-muted)' }}>No tasks found. Start by adding one!</p>
            )}
        </div>
    );
};

export default Dashboard;
