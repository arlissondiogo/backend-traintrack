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
  "email": "joao@exemplo.com"
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
DELETE /api/auth/delete-workout/id

Headers:
Authorization: Bearer SEU_TOKEN

```

9- updateWorkout

```
PUT /api/auth/update-workout/id

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

| Nº  | Funcionalidade                      | Status |
| --- | ----------------------------------- | ------ |
| 1   | 🔐 Login                            | Pronto |
| 2   | 🧾 Registro com senha gerada        | Pronto |
| 3   | 🔁 Recuperar senha + envio de email | Pronto |
| 4   | 🛠️ Modificar perfil                 | Pronto |
| 5   | 🏋️ Adicionar treino                 | Pronto |
| 6   | 👀 Visualizar todos os treinos      | Pronto |
| 7   | 🗑️ Deletar treino específico        | Pronto |
| 8   | 🗑️ Deletar conta                    | Pronto |

| Nº  | Funcionalidade de manipulação de dados               | Status |
| --- | ---------------------------------------------------- | ------ |
| 1   | 📊 Gerar dados de progressão de carga                | Pronto |
| 2   | 📦 Calcular volume do treino (séries x reps x carga) | Pronto |
| 3   | 📈 Retornar histórico ordenado por data              | Pronto |

| **Nome da Funcionalidade**  | **Descrição**                                                            | **Manipulação de Dados**                              | **Valor para o Usuário**                      | **Prioridade** |
| --------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------- | --------------------------------------------- | -------------- |
| Histórico de Volume Total   | Mostrar o volume total por treino ao longo do tempo                      | `volume = séries * repetições * carga`                | Ajuda a visualizar o esforço total por dia    | Alta           |
| Carga Máxima por Treino     | Mostrar a maior carga usada em cada treino                               | Agrupar por data, pegar `Math.max(carga)`             | Medir evolução de força                       | Alta           |
| Média de Carga por Semana   | Agrupar os treinos por semana e calcular média de carga                  | Agrupar por semana (usando `createdAt`), `avg(carga)` | Ver consistência de treino                    | Média          |
| Volume Acumulado por Semana | Soma do volume semanal                                                   | Agrupar por semana, `sum(volume)`                     | Planejamento de carga e recuperação           | Média          |
| PR (Personal Record)        | Mostrar a maior carga já registrada por exercício                        | `Math.max(carga)` para o exercício                    | Reconhecimento de progresso                   | Alta           |
| Detecção de Platôs          | Identificar quando carga/volume não aumenta em X semanas                 | Ver se `max(carga)` estagnou em intervalo fixo        | Diagnóstico de estagnação                     | Baixa          |
| Frequência Semanal          | Quantas vezes o exercício foi feito por semana                           | Contar sessões por semana (`count`)                   | Ajuda no controle de rotina                   | Média          |
| Progressão Linear Visual    | Prepara dados para gráfico com linha de tendência (ex. regressão linear) | Calcular média móvel ou regressão linear no front     | Ver tendência de progresso mesmo com variação | Baixa          |
| Diferença Percentual        | Diferença de carga entre treinos consecutivos (evolução %)               | `(carga atual - anterior) / anterior * 100`           | Feedback direto sobre progresso               | Média          |
| Análise de Consistência     | Medir variação da carga e volume nos últimos X treinos                   | Desvio padrão, variação percentual, etc.              | Detectar irregularidade no treino             | Baixa          |

Sugestões de manipulação com bibliotecas:

- date-fns ou moment para agrupar por semana/mês.
- lodash para agrupar e reduzir dados.
- mathjs ou cálculos manuais para médias, desvios, etc.
