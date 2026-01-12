import React, { useState, useEffect } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '2rem',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              ✓ My Tasks
            </h1>
            <p style={{ color: '#6c757d' }}>Stay organized and productive</p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                fontSize: '1.1rem',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                outline: 'none'
              }}
            />
            <button
              onClick={addTodo}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1.1rem',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              + Add
            </button>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#667eea' }}>{activeCount}</div>
              <small style={{ color: '#6c757d' }}>Active</small>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#28a745' }}>{completedCount}</div>
              <small style={{ color: '#6c757d' }}>Completed</small>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#212529' }}>{todos.length}</div>
              <small style={{ color: '#6c757d' }}>Total</small>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: '500',
              background: filter === 'all' ? '#667eea' : 'white',
              color: filter === 'all' ? 'white' : '#212529',
              border: filter === 'all' ? 'none' : '1px solid #dee2e6',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: '500',
              background: filter === 'active' ? '#667eea' : 'white',
              color: filter === 'active' ? 'white' : '#212529',
              border: filter === 'active' ? 'none' : '1px solid #dee2e6',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            style={{
              flex: 1,
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: '500',
              background: filter === 'completed' ? '#667eea' : 'white',
              color: filter === 'completed' ? 'white' : '#212529',
              border: filter === 'completed' ? 'none' : '1px solid #dee2e6',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Completed
          </button>
        </div>

        <div>
          {filteredTodos.length === 0 ? (
            <div style={{
              background: 'white',
              borderRadius: '10px',
              padding: '3rem',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '3rem', color: '#dee2e6' }}>📋</div>
              <p style={{ color: '#6c757d', marginTop: '1rem' }}>
                {filter === 'all' && 'No tasks yet. Add one above!'}
                {filter === 'active' && 'No active tasks. Great job!'}
                {filter === 'completed' && 'No completed tasks yet.'}
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div
                  onClick={() => toggleTodo(todo.id)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: todo.completed ? 'none' : '2px solid #dee2e6',
                    background: todo.completed ? '#28a745' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  {todo.completed && <span style={{ color: 'white', fontSize: '14px' }}>✓</span>}
                </div>
                <div
                  onClick={() => toggleTodo(todo.id)}
                  style={{
                    flex: 1,
                    cursor: 'pointer',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#6c757d' : '#212529'
                  }}
                >
                  {todo.text}
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: 'transparent',
                    color: '#dc3545',
                    border: '1px solid #dc3545',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {completedCount > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={clearCompleted}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'white',
                color: '#dc3545',
                border: '1px solid #dc3545',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              🗑️ Clear Completed ({completedCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}