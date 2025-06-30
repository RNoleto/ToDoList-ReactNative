import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo, TodoFormData } from '../types';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';

interface TodoFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: TodoFormData) => void;
  todo?: Todo | null;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  visible,
  onClose,
  onSubmit,
  todo,
}) => {
  const [formData, setFormData] = useState<TodoFormData>({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
  });
  const [errors, setErrors] = useState<Partial<TodoFormData>>({});

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description || '',
        priority: todo.priority,
        category: todo.category || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: '',
      });
    }
    setErrors({});
  }, [todo, visible]);

  const validateForm = (): boolean => {
    const newErrors: Partial<TodoFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleClose = () => {
    if (formData.title.trim() || (formData.description && formData.description.trim())) {
      Alert.alert(
        'Descartar alterações',
        'Tem certeza que deseja descartar as alterações?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Descartar', style: 'destructive', onPress: onClose },
        ]
      );
    } else {
      onClose();
    }
  };

  const PriorityButton: React.FC<{
    priority: TodoFormData['priority'];
    label: string;
    color: string;
  }> = ({ priority, label, color }) => (
    <Button
      title={label}
      variant={formData.priority === priority ? 'primary' : 'outline'}
      size="small"
      style={[styles.priorityButton, { borderColor: color }] as any}
      textStyle={{ color: formData.priority === priority ? COLORS.text : color }}
      onPress={() => setFormData(prev => ({ ...prev, priority }))}
    />
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.title}>
            {todo ? 'Editar Tarefa' : 'Nova Tarefa'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Card variant="elevated">
            <Input
              label="Título *"
              placeholder="Digite o título da tarefa"
              value={formData.title}
              onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
              error={errors.title}
              leftIcon={<Ionicons name="create-outline" size={20} color={COLORS.textSecondary} />}
            />

            <Input
              label="Descrição"
              placeholder="Digite uma descrição (opcional)"
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              leftIcon={<Ionicons name="document-text-outline" size={20} color={COLORS.textSecondary} />}
            />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prioridade</Text>
              <View style={styles.priorityContainer}>
                <PriorityButton priority="low" label="Baixa" color={COLORS.success} />
                <PriorityButton priority="medium" label="Média" color={COLORS.warning} />
                <PriorityButton priority="high" label="Alta" color={COLORS.error} />
              </View>
            </View>

            <Input
              label="Categoria"
              placeholder="Digite uma categoria (opcional)"
              value={formData.category}
              onChangeText={(text) => setFormData(prev => ({ ...prev, category: text }))}
              leftIcon={<Ionicons name="pricetag-outline" size={20} color={COLORS.textSecondary} />}
            />
          </Card>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Cancelar"
            variant="secondary"
            onPress={handleClose}
            style={styles.footerButton}
          />
          <Button
            title={todo ? 'Salvar' : 'Adicionar'}
            onPress={handleSubmit}
            style={styles.footerButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  closeButton: {
    padding: SPACING.xs,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
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
  priorityContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  priorityButton: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    padding: SPACING.lg,
    gap: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerButton: {
    flex: 1,
  },
}); 