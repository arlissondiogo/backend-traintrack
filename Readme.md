# Como usar?

Git clone:

```bash
https://github.com/arlissondiogo/backend-traintrack.git
```

```bash
    npm i
    npm start
```

## CRIE UM ARQUIVO .env E COLOQUE ISSO DENTRO:

MONGO_URI = SUA URI

JWT_SECRET= SUA SENHA (PODE SER UMA EX: DIOGOLINDAO)

PORT=5000

## Qual porta está? e qual rota usa?

A PORTA É A 5000

```bash
1- http://localhost:5000/api/auth/login
2- http://localhost:5000/api/auth/register
3- http://localhost:5000/api/auth/updateUser/ID
4- http://localhost:5000/api/auth/deleteUser/ID
5- http://localhost:5000/api/auth/forgot-password
6- http://localhost:5000/api/auth/add-workout
7- http://localhost:5000/api/auth/list-workouts
8- http://localhost:5000/api/auth/delete-workout/:id
9- http://localhost:5000/api/auth/update-workout/:id
```

## 🔐 IMPORTANTE: Para as rotas de treino (6 a 9), você precisa enviar o token JWT no cabeçalho da requisição:

```
Authorization: Bearer SEU_TOKEN_AQUI

```

Você recebe esse token ao fazer login ou registrar.

## EXEMPLOS DE REQUISIÇÃO PARA AS ROTAS:

1- login

```
{
  "email": "joao@exemplo.com",
  "senha": "eef1cebceadc"
}
```

2- register

```
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "peso": 75,
  "altura": 1.80,
  "idade": 28
}

```

3- updateUser

```
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "peso": 75,
  "altura": 1.80,
  "idade": 28
}

```

5-forgot-password

```
{
    "email":"joao@exemplo.com"
    }
```

6- addWorkout

```
POST /api/auth/add-workout

Headers:
Authorization: Bearer SEU_TOKEN

{
  "nomeExercicio": "Supino Reto",
  "series": 4,
  "repeticoes": 10,
  "carga": 80,
  "tempoDescanso": 90,
  "tempoExecucao": 60
}

```

7 - Listar Treinos

```
GET /api/auth/list-workouts

Headers:
Authorization: Bearer SEU_TOKEN
```

8- Deletar Treino

```
DELETE /api/auth/delete-workout/:id

Headers:
Authorization: Bearer SEU_TOKEN

```

9- updateWorkout

```
PUT /api/auth/update-workout/:id

Headers:
Authorization: Bearer SEU_TOKEN

{
  "nomeExercicio": "Supino Inclinado",
  "series": 5,
  "repeticoes": 8,
  "carga": 85,
  "tempoDescanso": 90,
  "tempoExecucao": 70
}

```

| Nº  | Funcionalidade                 | Status |
| --- | ------------------------------ | ------ |
| 1   | 🔐 Login                       | Pronto |
| 2   | 🧾 Registro com senha gerada   | Pronto |
| 3   | 🔁 Recuperar senha             | Pronto |
| 4   | 🛠️ Modificar perfil            | Pronto |
| 5   | 🏋️ Adicionar treino            | Pronto |
| 6   | 👀 Visualizar todos os treinos | Pronto |
| 7   | 🗑️ Deletar treino específico   | Pronto |
| 8   | 🗑️ Deletar conta               | Pronto |
