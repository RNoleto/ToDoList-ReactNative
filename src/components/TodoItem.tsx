import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo } from '../types';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { getPriorityColor, getPriorityLabel, formatDate, isOverdue } from '../utils/todoUtils';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const handleDelete = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => onDelete(todo.id) },
      ]
    );
  };

  const priorityColor = getPriorityColor(todo.priority);
  const isOverdueTodo = isOverdue(todo);

  return (
    <View style={[styles.container, todo.completed && styles.completed]}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggle(todo.id)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={todo.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={todo.completed ? COLORS.success : COLORS.textSecondary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.content}
        onPress={() => onEdit(todo)}
        activeOpacity={0.7}
      >
        <View style={styles.header}>
          <Text style={[styles.title, todo.completed && styles.titleCompleted]}>
            {todo.title}
          </Text>
          <View style={[styles.priorityBadge, { backgroundColor: priorityColor }]}>
            <Text style={styles.priorityText}>
              {getPriorityLabel(todo.priority)}
            </Text>
          </View>
        </View>

        {todo.description && (
          <Text style={[styles.description, todo.completed && styles.descriptionCompleted]}>
            {todo.description}
          </Text>
        )}

        <View style={styles.footer}>
          {todo.dueDate && (
            <View style={styles.dateContainer}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color={isOverdueTodo ? COLORS.error : COLORS.textSecondary}
              />
              <Text style={[
                styles.dateText,
                isOverdueTodo && styles.overdueText
              ]}>
                {formatDate(todo.dueDate)}
                {isOverdueTodo && ' (Atrasado)'}
              </Text>
            </View>
          )}

          {todo.category && (
            <View style={styles.categoryContainer}>
              <Ionicons name="pricetag-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.categoryText}>{todo.category}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        activeOpacity={0.7}
      >
        <Ionicons name="trash-outline" size={20} color={COLORS.error} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  completed: {
    opacity: 0.6,
    backgroundColor: COLORS.surface,
  },
  checkbox: {
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.sm,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  priorityBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.text,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    lineHeight: 20,
  },
  descriptionCompleted: {
    color: COLORS.textMuted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
    marginBottom: SPACING.xs,
  },
  dateText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  overdueText: {
    color: COLORS.error,
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  categoryText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  deleteButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.sm,
  },
}); 