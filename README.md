[x] Criar um novo todo
[x] Listar todos os todos
[x] Alterar o title e deadline de um todo existente
[x] Marcar um todo como feito
[x] Excluir um todo

obs: Tudo isso para cada usuário em específico (o `username` será passado pelo header). A seguir veremos com mais detalhes o que e como precisa ser feito 🚀

POST /users
[x] a rota deve receber name e username dentro do corpo da requisição
[x] ao receber um usuário, ele deve ser armazenado em um objeto no seguinte formato:
{id: 'uuid', name: 'Daniele Vieira', username: 'dani', todos: []}
[x] O objeto do usuário deve ser retornado na resposta da requisição

GET /todos
[x] A rota deve receber, pelo header da requisição, uma propriedade username contendo o username do usuário
[x] Uma lista com todas as tarefas desse usuário deve ser retornada na resposta da requisição.

POST /todos
[x] A rota deve receber title e deadline dentro do corpo da requisição e. uma propriedade username contendo o username do usuário dentro do header da requisição.
[x] Ao criar um novo todo, ele deve ser armazenado dentro da lista todos do usuário que está criando esta tarefa
[x] Certifique-se que o id seja um uuid,
[x] Cada tarefa deverá estar no seguinte formato: 
{id: 'uuid', title: 'Nome da tarefa', done: false, deadline: '2021-02-27T00:00:00.000Z', created_at: '2021-02-24T00:00:00.000Z'}

observação: Lembre-se de iniciar a propriedade done sempre como false ao criar um todo.
Dica: Ao fazer a requisição com o Insomnia ou Postman, preencha a data de deadline com o formato ANO-MÊS-DIA e ao salvar a tarefa pela rota, faça da seguinte forma: 
{ id: 'uuid', // precisa ser um uuid ,title: 'Nome da tarefa', done: false, 
deadline: new Date(deadline), created_at: new Date()}
Usar new Date(deadline) irá realizar a transformação da string "ANO-MÊS-DIA" (por exemplo "2021-02-25") para uma data válida do JavaScript.
[x] O objeto do todo deve ser retornado na resposta da requisição.

PUT /todos/:id
[x] A rota deve receber, pelo header da requisição, uma propriedade username contendo o username do usuário e receber as propriedades title e deadline dentro do corpo da requisição.
[x] É preciso alterar apenas o title e o deadline da tarefa que possua o id igual ao id presente nos parâmetros da rota

PATH /todos/:id/done
[x] A rota deve receber, pelo header da requisição, uma propriedade username contendo o username do usuário
[x] Alterar a propriedade done para true no todo que possuir um id igual ao id presente nos parâmetros da rota.

DELETE /todos/:id
[x] A rota deve receber, pelo header da requisição, uma propriedade username contendo o username do usuário
[x] Excluir o todo que possuir um id igual ao id presente nos parâmetros da rota.