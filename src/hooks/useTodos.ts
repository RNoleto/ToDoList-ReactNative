import { useState, useEffect, useCallback, useMemo } from 'react';
import { Todo, TodoFormData, TodoFilters, SortOption, SortDirection } from '../types';
import { createTodo, updateTodo, filterTodos, sortTodos, getTodoStats } from '../utils/todoUtils';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<TodoFilters>({
    status: 'all',
    priority: 'all',
  });
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [loading, setLoading] = useState(false);

  // Adicionar novo todo
  const addTodo = useCallback((todoData: TodoFormData) => {
    const newTodo = createTodo({
      ...todoData,
      completed: false,
    });
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  // Atualizar todo
  const updateTodoById = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? updateTodo(todo, updates) : todo
    ));
  }, []);

  // Deletar todo
  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // Alternar status do todo
  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date() } : todo
    ));
  }, []);

  // Deletar todos completados
  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  // Obter todos filtrados e ordenados
  const filteredAndSortedTodos = useMemo(() => {
    const filtered = filterTodos(todos, filters);
    return sortTodos(filtered, sortBy, sortDirection);
  }, [todos, filters, sortBy, sortDirection]);

  // Obter estatísticas
  const stats = useMemo(() => getTodoStats(todos), [todos]);

  return {
    todos: filteredAndSortedTodos,
    allTodos: todos,
    stats,
    filters,
    sortBy,
    sortDirection,
    loading,
    addTodo,
    updateTodo: updateTodoById,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    setFilters,
    setSortBy,
    setSortDirection,
  };
}; 