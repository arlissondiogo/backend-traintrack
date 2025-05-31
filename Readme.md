# Esse Readme é apenas para desenvolvimento, posteriormente vamos ajustar para ser a documentação do projeto

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

EMAIL_USER=seuemail@gmail.com

EMAIL_PASS=sua senha do nodemailer

## Qual porta está? e qual rota usa?

A PORTA É A 5000

```bash
1- http://localhost:5000/api/user/login
2- http://localhost:5000/api/user/register
3- http://localhost:5000/api/user/updateUser/ID
4- http://localhost:5000/api/user/deleteUser/ID
5- http://localhost:5000/api/user/forgot-password
6- http://localhost:5000/api/workout/add-workout
7- http://localhost:5000/api/workout/list-workouts
8- http://localhost:5000/api/workout/delete-workout/:id
9- http://localhost:5000/api/workout/update-workout/:id
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

2- register (faz pelo frontend apenas.)

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
POST /api/workout/add-workout

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
GET /api/workout/list-workouts

Headers:
Authorization: Bearer SEU_TOKEN
```

8- Deletar Treino

```
DELETE /api/workout/delete-workout/id

Headers:
Authorization: Bearer SEU_TOKEN

```

9- updateWorkout

```
PUT /api/workout/update-workout/id

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
