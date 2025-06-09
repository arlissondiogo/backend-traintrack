# 🏋️‍♂️ TrainTrack API

> API REST moderna para gerenciamento de treinos e acompanhamento de progresso físico

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)](https://jwt.io/)

## 📋 Sobre o Projeto

TrainTrack é uma API REST desenvolvida em Node.js que permite aos usuários gerenciar seus treinos, acompanhar progressos e analisar dados de performance física. A aplicação oferece autenticação segura, recuperação de senha por email e relatórios detalhados de progresso.

🎨 Frontend: O frontend desta aplicação está disponível em [TrainTrack Frontend](https://github.com/arlissondiogo/frontend-traintrack.git)

### ✨ Principais Funcionalidades

- 🔐 **Autenticação JWT** - Sistema seguro de login e registro
- 📧 **Recuperação de Senha** - Reset por email com tokens seguros
- 💪 **Gestão de Treinos** - CRUD completo para exercícios
- 📊 **Análise de Progresso** - Relatórios de carga, volume e evolução
- 👤 **Perfil de Usuário** - Gerenciamento de dados pessoais
- 🔍 **Filtros Avançados** - Busca por exercício, mês e período

## 🚀 Tecnologias Utilizadas

| Tecnologia     | Versão | Descrição               |
| -------------- | ------ | ----------------------- |
| **Node.js**    | 18+    | Runtime JavaScript      |
| **Express**    | 5.1.0  | Framework web           |
| **MongoDB**    | 6.15.0 | Banco de dados NoSQL    |
| **Mongoose**   | 8.13.2 | ODM para MongoDB        |
| **JWT**        | 9.0.2  | Autenticação por tokens |
| **bcrypt**     | 5.1.1  | Criptografia de senhas  |
| **Nodemailer** | 7.0.3  | Envio de emails         |
| **CORS**       | 2.8.5  | Controle de acesso      |

## 📦 Instalação e Configuração

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- MongoDB Atlas ou instância local
- Conta Gmail (para envio de emails)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/traintrack-api.git
cd traintrack-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/traintrack?retryWrites=true&w=majority

# Autenticação
JWT_SECRET=sua_chave_jwt_super_secreta_aqui

# Servidor
PORT=5000

# Email (Gmail)
EMAIL_USER=seu.email@gmail.com
EMAIL_PASS=sua_senha_de_aplicativo_gmail
```

### 4. Execute a aplicação

```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

A API estará disponível em `http://localhost:5000`

## 🔌 Endpoints da API

### 🔐 Autenticação

| Método   | Endpoint                     | Descrição         | Auth |
| -------- | ---------------------------- | ----------------- | ---- |
| `POST`   | `/api/users/register`        | Cadastrar usuário | ❌   |
| `POST`   | `/api/users/login`           | Fazer login       | ❌   |
| `GET`    | `/api/users/me`              | Buscar perfil     | ✅   |
| `PUT`    | `/api/users/update`          | Atualizar perfil  | ✅   |
| `DELETE` | `/api/users/delete`          | Deletar conta     | ✅   |
| `POST`   | `/api/users/forgot-password` | Solicitar reset   | ❌   |
| `POST`   | `/api/users/reset-password`  | Redefinir senha   | ❌   |

### 💪 Treinos

| Método   | Endpoint                           | Descrição         | Auth |
| -------- | ---------------------------------- | ----------------- | ---- |
| `POST`   | `/api/workouts/add-workout`        | Adicionar treino  | ✅   |
| `GET`    | `/api/workouts/list-workout`       | Listar treinos    | ✅   |
| `PUT`    | `/api/workouts/update-workout/:id` | Atualizar treino  | ✅   |
| `DELETE` | `/api/workouts/delete-workout/:id` | Deletar treino    | ✅   |
| `GET`    | `/api/workouts/exercicios`         | Exercícios únicos | ✅   |

### 📊 Progresso

| Método | Endpoint                            | Descrição           | Auth |
| ------ | ----------------------------------- | ------------------- | ---- |
| `GET`  | `/api/progressao/volume-total`      | Volume de treino    | ✅   |
| `GET`  | `/api/progressao/progresso-carga`   | Progresso de carga  | ✅   |
| `GET`  | `/api/progressao/exercicios-unicos` | Lista de exercícios | ✅   |

## 📝 Exemplos de Uso

### Registro de Usuário

```javascript
POST /api/users/register
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "senha": "minhasenha123"
}
```

### Adicionar Treino

```javascript
POST /api/workouts/add-workout
Authorization: Bearer seu_jwt_token
Content-Type: application/json

{
  "nomeExercicio": "Supino Reto",
  "series": 4,
  "repeticoes": 12,
  "carga": 80,
  "tempoDescanso": 90,
  "tempoExecucao": 45
}
```

### Consultar Progresso

```javascript
GET /api/progressao/progresso-carga?exercicio=Supino Reto&mes=6
Authorization: Bearer seu_jwt_token
```

## 🏗️ Estrutura do Projeto

```
traintrack-api/
├── 📁 config/
│   └── db.js                 # Configuração MongoDB
├── 📁 controllers/
│   ├── progressaoController.js   # Lógica de progresso
│   ├── userController.js         # Lógica de usuários
│   └── workoutController.js      # Lógica de treinos
├── 📁 middleware/
│   └── authMiddleware.js     # Middleware de autenticação
├── 📁 models/
│   ├── User.js              # Schema do usuário
│   └── Workout.js           # Schema do treino
├── 📁 routes/
│   ├── progressaoRoutes.js  # Rotas de progresso
│   ├── userRoutes.js        # Rotas de usuário
│   └── workoutRoutes.js     # Rotas de treino
├── 📁 utils/
│   └── sendEmail.js         # Utilitário de email
├── node_modules/
├── .env                     # Variáveis de ambiente
├── .gitignore              # Arquivos ignorados
├── package-look.json       # Lock de dependências
├── package.json            # Dependências
├── README.md               # Esta documentação
└── server.js               # Arquivo principal
```

## 🔒 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação. Após o login, inclua o token no header:

```
Authorization: Bearer seu_jwt_token_aqui
```

Os tokens expiram em **24 horas** por segurança.

## 📊 Modelos de Dados

### Usuário (User)

```javascript
{
  "_id": "ObjectId",
  "nome": "String (obrigatório)",
  "email": "String (único, obrigatório)",
  "peso": "Number (padrão: 0)",
  "altura": "Number (padrão: 0)",
  "idade": "Number (padrão: 0)",
  "senha": "String (criptografado)",
  "resetToken": "String (opcional)",
  "tokenExpiration": "Date (opcional)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Treino (Workout)

```javascript
{
  "_id": "ObjectId",
  "user": "ObjectId (referência ao User)",
  "nomeExercicio": "String (obrigatório)",
  "series": "Number (opcional)",
  "repeticoes": "Number (opcional)",
  "carga": "Number (opcional)",
  "tempoDescanso": "Number (opcional)",
  "tempoExecucao": "Number (opcional)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## 🚀 Deploy

### Variáveis de Ambiente para Produção

```env
MONGO_URI=sua_uri_de_producao
JWT_SECRET=chave_jwt_ainda_mais_forte
PORT=5000
EMAIL_USER=email_producao@gmail.com
EMAIL_PASS=senha_app_producao
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**TrainTrack** - Transformando a forma como você acompanha seus treinos! 💪🏃‍♂️
