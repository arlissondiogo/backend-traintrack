# Como usar?

```bash
    npm i
    npm start
```

## Qual porta está? e qual rota usa?

```bash
http://localhost:5000/api/auth/login
http://localhost:5000/api/auth/register
```

# ✅ Funcionalidades + Back-end (API)

## 🔐 1. Login – Pronto!

## 🧾 2. Registro com senha gerada automaticamente

- Mudar o sistema para gerar uma senha aleatória e enviar ela por e-mail, em vez de receber do usuário.
  - Gere uma senha aleatória.
  - Crie o usuário com essa senha (ela já vai ser criptografada pelo `userSchema`).
  - Envie essa senha por e-mail para o usuário com `nodemailer`.

## 🔁 3. Recuperar senha (Esqueceu a senha)

- Gerar um token temporário e enviar por e-mail.
- Criar uma rota `POST /recuperar-senha` que envia o e-mail com link.
- Criar rota `POST /resetar-senha` que recebe nova senha e o token.

## 📬 4. Suporte

- Rota `POST /suporte` com nome, email e mensagem.
- Enviar isso por e-mail para o administrador (usando `nodemailer` também).

## 🛠️ 5. Modificar perfil

- Rota protegida com JWT, `PUT /perfil`.
- Campos possíveis: `nome`, `avatar`, `idade`, `email`, `peso`, `altura`.
- Verificar se o novo email já existe antes de salvar.

## 🏋️ 6. Adicionar treino

- Rota `POST /treinos`.
  - `nome do exercício`
  - `séries e repetições` ou `tempo de execução`
  - `carga utilizada`
  - `tempo de descanso`
  - `dia da semana`
  - `tipo de treino` (checkbox: peito, perna, etc...)
- 💡 O melhor aqui é salvar o treino em um model separado, e vincular ele ao usuário com `userId`.

## 🗑️ 7. Deletar conta

- Rota `DELETE /perfil`.
- Deleta o usuário e os treinos associados (você pode usar `User.findByIdAndDelete` e depois `Treino.deleteMany({ usuario: id })`).

## 👀 8. Visualizar todos os treinos cadastrados

- Rota `GET /treinos` protegida por JWT.

## 🗑️ 9. Deletar treino específico

- Rota `DELETE /treinos/:id` protegida.
