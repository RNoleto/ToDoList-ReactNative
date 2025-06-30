export const COLORS = {
  // Cores principais
  primary: '#6366f1', // Indigo
  primaryDark: '#4f46e5',
  primaryLight: '#818cf8',
  
  // Cores de fundo
  background: '#0f0f23', // Azul escuro
  surface: '#1a1a2e', // Azul mais claro
  card: '#16213e', // Azul acinzentado
  
  // Cores de texto
  text: '#ffffff',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',
  
  // Cores de status
  success: '#10b981', // Verde
  warning: '#f59e0b', // Amarelo
  error: '#ef4444', // Vermelho
  info: '#3b82f6', // Azul
  
  // Cores de borda
  border: '#27272a',
  borderLight: '#3f3f46',
  
  // Cores de overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Cores de gradiente
  gradientStart: '#6366f1',
  gradientEnd: '#8b5cf6',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
} as const; 