import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TodoStats } from '../types';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { Card } from './Card';

interface StatsCardProps {
  stats: TodoStats;
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const progressPercentage = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  const StatItem: React.FC<{
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: number;
    color: string;
  }> = ({ icon, label, value, color }) => (
    <View style={styles.statItem}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </View>
  );

  return (
    <Card variant="elevated" style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progresso</Text>
        <Text style={styles.percentage}>{Math.round(progressPercentage)}%</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {stats.completed} de {stats.total} tarefas concluídas
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatItem
          icon="checkmark-circle"
          label="Concluídas"
          value={stats.completed}
          color={COLORS.success}
        />
        <StatItem
          icon="time"
          label="Pendentes"
          value={stats.pending}
          color={COLORS.warning}
        />
        <StatItem
          icon="alert-circle"
          label="Atrasadas"
          value={stats.overdue}
          color={COLORS.error}
        />
        <StatItem
          icon="list"
          label="Total"
          value={stats.total}
          color={COLORS.info}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  percentage: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  progressContainer: {
    marginBottom: SPACING.lg,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
}); 