import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TodoFilters, SortOption, SortDirection } from '../types';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { Card } from './Card';

interface FilterBarProps {
  filters: TodoFilters;
  onFiltersChange: (filters: TodoFilters) => void;
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSortChange: (sortBy: SortOption, direction: SortDirection) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  sortBy,
  sortDirection,
  onSortChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const updateFilters = (updates: Partial<TodoFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const FilterChip: React.FC<{
    label: string;
    active: boolean;
    onPress: () => void;
  }> = ({ label, active, onPress }) => (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const SortButton: React.FC<{
    option: SortOption;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
  }> = ({ option, label, icon }) => (
    <TouchableOpacity
      style={[
        styles.sortButton,
        sortBy === option && styles.sortButtonActive
      ]}
      onPress={() => {
        const newDirection = sortBy === option && sortDirection === 'asc' ? 'desc' : 'asc';
        onSortChange(option, newDirection);
      }}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon}
        size={16}
        color={sortBy === option ? COLORS.primary : COLORS.textSecondary}
      />
      <Text style={[
        styles.sortButtonText,
        sortBy === option && styles.sortButtonTextActive
      ]}>
        {label}
      </Text>
      {sortBy === option && (
        <Ionicons
          name={sortDirection === 'asc' ? 'chevron-up' : 'chevron-down'}
          size={12}
          color={COLORS.primary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <Card variant="default" style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar tarefas..."
            placeholderTextColor={COLORS.textMuted}
            value={filters.search}
            onChangeText={(text) => updateFilters({ search: text })}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showFilters ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={COLORS.text}
          />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <View style={styles.filtersContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Status</Text>
            <View style={styles.chipContainer}>
              <FilterChip
                label="Todas"
                active={filters.status === 'all'}
                onPress={() => updateFilters({ status: 'all' })}
              />
              <FilterChip
                label="Pendentes"
                active={filters.status === 'pending'}
                onPress={() => updateFilters({ status: 'pending' })}
              />
              <FilterChip
                label="Concluídas"
                active={filters.status === 'completed'}
                onPress={() => updateFilters({ status: 'completed' })}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prioridade</Text>
            <View style={styles.chipContainer}>
              <FilterChip
                label="Todas"
                active={filters.priority === 'all'}
                onPress={() => updateFilters({ priority: 'all' })}
              />
              <FilterChip
                label="Alta"
                active={filters.priority === 'high'}
                onPress={() => updateFilters({ priority: 'high' })}
              />
              <FilterChip
                label="Média"
                active={filters.priority === 'medium'}
                onPress={() => updateFilters({ priority: 'medium' })}
              />
              <FilterChip
                label="Baixa"
                active={filters.priority === 'low'}
                onPress={() => updateFilters({ priority: 'low' })}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ordenar por</Text>
            <View style={styles.sortContainer}>
              <SortButton
                option="createdAt"
                label="Data de criação"
                icon="time-outline"
              />
              <SortButton
                option="priority"
                label="Prioridade"
                icon="flag-outline"
              />
              <SortButton
                option="title"
                label="Título"
                icon="text-outline"
              />
            </View>
          </View>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  filterButton: {
    padding: SPACING.sm,
  },
  filtersContent: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  chipTextActive: {
    color: COLORS.text,
    fontWeight: '600',
  },
  sortContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.xs,
  },
  sortButtonActive: {
    backgroundColor: COLORS.primary + '20',
    borderColor: COLORS.primary,
  },
  sortButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  sortButtonTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
}); 