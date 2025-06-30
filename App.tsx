import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import { COLORS } from './src/constants/theme';
import { TodoList } from './src/components/TodoList';
import { useTodos } from './src/hooks/useTodos';

export default function App() {
  const {
    todos,
    stats,
    filters,
    sortBy,
    sortDirection,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    setFilters,
    setSortBy,
    setSortDirection,
  } = useTodos();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={COLORS.background} />
      <TodoList
        todos={todos}
        stats={stats}
        filters={filters}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onAdd={addTodo}
        onUpdate={updateTodo}
        onFiltersChange={setFilters}
        onSortChange={(sortBy, direction) => {
          setSortBy(sortBy);
          setSortDirection(direction);
        }}
        onClearCompleted={clearCompleted}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
