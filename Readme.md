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
3- http://localhost:5000/api/auth/update/ID
4- http://localhost:5000/api/auth/delete/ID
5- http://localhost:5000/api/auth/forgot-password
```

## EXEMPLOS DE REQUISIÇÃO PARA AS ROTAS: 

1-
```
{
  "email": "joao@exemplo.com",
  "senha": "eef1cebceadc"
}
```

2-
```
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "sexo": "masculino",
  "peso": 75,
  "altura": 1.80,
  "idade": 28
}

```
3-
```
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "sexo": "masculino",
  "peso": 75,
  "altura": 1.80,
  "idade": 28
}

```

5-
```
{
    "email":"joao@exemplo.com"
    }
```

# ✅ Funcionalidades + Back-end (API)

## 🔐 1. Login – Pronto!

## 🧾 2. Registro com senha gerada automaticamente – Pronto!

## 🔁 3. Recuperar senha (Esqueceu a senha) – Pronto!

## 📬 4. Suporte

- Rota `POST /suporte` com nome, email e mensagem.
- Enviar isso por e-mail para o administrador (usando `nodemailer` também).

## 🛠️ 5. Modificar perfil – Pronto!

## 🏋️ 6. Adicionar treino

- Rota `POST /treinos`.
  - `nome do exercício`
  - `séries e repetições` ou `tempo de execução`
  - `carga utilizada`
  - `tempo de descanso`
  - `dia da semana`
  - `tipo de treino` (checkbox: peito, perna, etc...)
- 💡 O melhor aqui é salvar o treino em um model separado, e vincular ele ao usuário com `userId`.

## 🗑️ 7. Deletar conta – Pronto!

## 👀 8. Visualizar todos os treinos cadastrados

- Rota `GET /treinos` protegida por JWT.

## 🗑️ 9. Deletar treino específico

- Rota `DELETE /treinos/:id` protegida.
