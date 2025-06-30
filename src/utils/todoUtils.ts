import { Todo, TodoFilters, TodoStats, SortOption, SortDirection } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createTodo = (data: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Todo => {
  const now = new Date();
  return {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
};

export const updateTodo = (todo: Todo, updates: Partial<Todo>): Todo => {
  return {
    ...todo,
    ...updates,
    updatedAt: new Date(),
  };
};

export const filterTodos = (todos: Todo[], filters: TodoFilters): Todo[] => {
  return todos.filter(todo => {
    // Filtro por status
    if (filters.status === 'completed' && !todo.completed) return false;
    if (filters.status === 'pending' && todo.completed) return false;
    
    // Filtro por prioridade
    if (filters.priority !== 'all' && todo.priority !== filters.priority) return false;
    
    // Filtro por categoria
    if (filters.category && todo.category !== filters.category) return false;
    
    // Filtro por busca
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const titleMatch = todo.title.toLowerCase().includes(searchLower);
      const descriptionMatch = todo.description?.toLowerCase().includes(searchLower) || false;
      if (!titleMatch && !descriptionMatch) return false;
    }
    
    return true;
  });
};

export const sortTodos = (todos: Todo[], sortBy: SortOption, direction: SortDirection): Todo[] => {
  return [...todos].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'createdAt':
        comparison = a.createdAt.getTime() - b.createdAt.getTime();
        break;
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) comparison = 0;
        else if (!a.dueDate) comparison = 1;
        else if (!b.dueDate) comparison = -1;
        else comparison = a.dueDate.getTime() - b.dueDate.getTime();
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
    }
    
    return direction === 'asc' ? comparison : -comparison;
  });
};

export const getTodoStats = (todos: Todo[]): TodoStats => {
  const now = new Date();
  
  return {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
    overdue: todos.filter(todo => 
      !todo.completed && 
      todo.dueDate && 
      todo.dueDate < now
    ).length,
  };
};

export const getPriorityColor = (priority: Todo['priority']) => {
  switch (priority) {
    case 'high':
      return '#ef4444'; // Vermelho
    case 'medium':
      return '#f59e0b'; // Amarelo
    case 'low':
      return '#10b981'; // Verde
    default:
      return '#6b7280'; // Cinza
  }
};

export const getPriorityLabel = (priority: Todo['priority']) => {
  switch (priority) {
    case 'high':
      return 'Alta';
    case 'medium':
      return 'Média';
    case 'low':
      return 'Baixa';
    default:
      return 'N/A';
  }
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatDateTime = (date: Date): string => {
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const isOverdue = (todo: Todo): boolean => {
  if (!todo.dueDate || todo.completed) return false;
  return todo.dueDate < new Date();
}; 