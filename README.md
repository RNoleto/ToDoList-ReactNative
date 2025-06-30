# 📝 Todo List App

Uma aplicação moderna de gerenciamento de tarefas desenvolvida com React Native e Expo, com foco em design modular, componentes reutilizáveis e experiência do usuário.

## ✨ Características

### 🎨 Design & UX
- **Tema Dark Mode**: Interface elegante com cores escuras e consistentes
- **Design Modular**: Componentes reutilizáveis e bem estruturados
- **UI/UX Moderna**: Interface intuitiva com animações e feedback visual
- **Responsivo**: Adaptável a diferentes tamanhos de tela

### 🔧 Funcionalidades
- ✅ **CRUD Completo**: Criar, ler, atualizar e deletar tarefas
- 🏷️ **Categorização**: Organizar tarefas por categorias
- ⚡ **Prioridades**: Sistema de prioridades (Alta, Média, Baixa)
- 📅 **Datas**: Suporte a datas de vencimento com alertas de atraso
- 🔍 **Busca e Filtros**: Filtros por status, prioridade e busca por texto
- 📊 **Estatísticas**: Dashboard com progresso e métricas
- 🗂️ **Ordenação**: Ordenar por data, prioridade ou título
- 🗑️ **Limpeza**: Remover tarefas concluídas em lote

### 🏗️ Arquitetura
- **Modular**: Estrutura organizada em pastas por responsabilidade
- **TypeScript**: Tipagem forte para melhor desenvolvimento
- **Hooks Personalizados**: Lógica de negócio reutilizável
- **Componentes Reutilizáveis**: Biblioteca de componentes UI
- **Offline**: Funciona sem conexão com internet

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button.tsx      # Botão customizado
│   ├── Input.tsx       # Campo de entrada
│   ├── Card.tsx        # Container de card
│   ├── TodoItem.tsx    # Item individual de todo
│   ├── TodoForm.tsx    # Formulário de criação/edição
│   ├── StatsCard.tsx   # Card de estatísticas
│   ├── FilterBar.tsx   # Barra de filtros e busca
│   ├── TodoList.tsx    # Lista principal de todos
│   └── index.ts        # Exportações dos componentes
├── constants/          # Constantes e configurações
│   └── theme.ts        # Sistema de design (cores, espaçamentos, etc.)
├── hooks/              # Hooks personalizados
│   └── useTodos.ts     # Hook para gerenciamento de todos
├── types/              # Definições de tipos TypeScript
│   └── index.ts        # Interfaces e tipos
└── utils/              # Utilitários e funções auxiliares
    └── todoUtils.ts    # Funções para manipulação de todos
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd todo-list
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto**
```bash
npm start
```

4. **Abra no dispositivo**
- Use o app Expo Go no seu smartphone
- Escaneie o QR code que aparece no terminal
- Ou pressione `a` para abrir no Android ou `i` para iOS

## 🎯 Componentes Principais

### TodoList
Componente principal que orquestra toda a aplicação, incluindo:
- Lista de tarefas com FlatList otimizada
- Estados vazios personalizados
- Integração com formulários e filtros

### TodoForm
Modal para criação e edição de tarefas com:
- Validação de formulário
- Seleção de prioridade
- Campos opcionais (descrição, categoria)

### FilterBar
Sistema de filtros avançado com:
- Busca por texto
- Filtros por status e prioridade
- Ordenação personalizada
- Interface colapsável

### StatsCard
Dashboard de estatísticas mostrando:
- Progresso geral
- Contadores por status
- Barra de progresso visual

## 🎨 Sistema de Design

### Cores
- **Primária**: Indigo (#6366f1)
- **Fundo**: Azul escuro (#0f0f23)
- **Superfície**: Azul acinzentado (#16213e)
- **Texto**: Branco (#ffffff)
- **Status**: Verde (sucesso), Amarelo (aviso), Vermelho (erro)

### Tipografia
- **Títulos**: 32px, peso 700
- **Subtítulos**: 24px, peso 600
- **Corpo**: 16px, peso 400
- **Legendas**: 14px, peso 400

### Espaçamentos
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **XXL**: 48px

## 🔧 Tecnologias Utilizadas

- **React Native**: Framework principal
- **Expo**: Plataforma de desenvolvimento
- **TypeScript**: Tipagem estática
- **React Hooks**: Gerenciamento de estado
- **Expo Vector Icons**: Ícones da aplicação

## 📱 Funcionalidades por Tela

### Tela Principal
- Visualização de todas as tarefas
- Estatísticas em tempo real
- Filtros e busca
- Botão de adicionar nova tarefa

### Modal de Formulário
- Criação de novas tarefas
- Edição de tarefas existentes
- Validação de campos obrigatórios
- Seleção de prioridade

### Estados Vazios
- Mensagens contextuais
- Call-to-action para primeira tarefa
- Ícones ilustrativos

## 🎯 Próximas Melhorias

- [ ] Persistência local com AsyncStorage
- [ ] Notificações push para lembretes
- [ ] Sincronização com backend
- [ ] Temas personalizáveis
- [ ] Modo offline avançado
- [ ] Animações mais fluidas
- [ ] Testes automatizados
- [ ] Internacionalização (i18n)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido como projeto de estudo para demonstrar boas práticas em React Native.

---

**Nota**: Este é um projeto de estudo focado em demonstrar arquitetura modular, componentes reutilizáveis e boas práticas de UI/UX em React Native. 