import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo, TodoFormData } from '../types';
import { COLORS, SPACING, FONT_SIZES, SHADOWS } from '../constants/theme';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { StatsCard } from './StatsCard';
import { FilterBar } from './FilterBar';
import { Button } from './Button';

interface TodoListProps {
  todos: Todo[];
  stats: any;
  filters: any;
  sortBy: any;
  sortDirection: any;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: (data: TodoFormData) => void;
  onUpdate: (id: string, data: Partial<Todo>) => void;
  onFiltersChange: (filters: any) => void;
  onSortChange: (sortBy: any, direction: any) => void;
  onClearCompleted: () => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  stats,
  filters,
  sortBy,
  sortDirection,
  onToggle,
  onDelete,
  onAdd,
  onUpdate,
  onFiltersChange,
  onSortChange,
  onClearCompleted,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleSubmit = (data: TodoFormData) => {
    if (editingTodo) {
      onUpdate(editingTodo.id, data);
      setEditingTodo(null);
    } else {
      onAdd(data);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  const handleClearCompleted = () => {
    Alert.alert(
      'Limpar concluídas',
      'Tem certeza que deseja remover todas as tarefas concluídas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', style: 'destructive', onPress: onClearCompleted },
      ]
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="list-outline" size={64} color={COLORS.textMuted} />
      <Text style={styles.emptyTitle}>Nenhuma tarefa encontrada</Text>
      <Text style={styles.emptySubtitle}>
        {filters.status === 'completed' 
          ? 'Você ainda não concluiu nenhuma tarefa'
          : filters.status === 'pending'
          ? 'Todas as suas tarefas foram concluídas!'
          : 'Comece criando sua primeira tarefa'
        }
      </Text>
      {filters.status === 'all' && (
        <Button
          title="Criar primeira tarefa"
          onPress={() => setShowForm(true)}
          icon={<Ionicons name="add" size={20} color={COLORS.text} />}
          style={styles.emptyButton}
        />
      )}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>Minhas Tarefas</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      
      <StatsCard stats={stats} />
      
      <FilterBar
        filters={filters}
        onFiltersChange={onFiltersChange}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />

      {stats.completed > 0 && (
        <View style={styles.clearCompletedContainer}>
          <Button
            title="Limpar concluídas"
            variant="outline"
            size="small"
            onPress={handleClearCompleted}
            icon={<Ionicons name="trash-outline" size={16} color={COLORS.error} />}
          />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={handleEdit}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TodoForm
        visible={showForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        todo={editingTodo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: '700',
    color: COLORS.text,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.md,
  },
  clearCompletedContainer: {
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  emptyButton: {
    marginTop: SPACING.md,
  },
}); 