## Projeto para acampanhar o curso API Rest na Alura

Basta rodar o `npm install`, criar o bando de dados e alterar o arquivo `./config/default.json` (caso necessário). Em seguida rodar `node ./api/banco-de-dados/criarTabelas.js` (para criar as tabelas) e então iniciar a aplicação com `node ./api/index.js`.

## Endpoints

headers: 
chave:Accept
valor: application/json or application/xml (caso não passar nenhum dos dois, por padrão aceitará como JSON e este será o formato de retorno).


*POST: http://base_url/api/fornecedores => Cria fornecedor

body: JSON
{
	"empresa":"bla",
	"email":"pet@pet.com.br",
	"categoria":"brinquedos"
}


*GET: http://base_url/api/fornecedores => Lista fornecedores

*GET: http://base_url/api/fornecedores/:id => Busca fornecedor específico com base no ID

*PUT: http://base_url/api/fornecedores/:id => Edita fornecedor com base no ID

body: JSON  obs: não é necessário passar todos os parâmetros do corpo da requisição.
{
	"empresa":"petshopshopaaaaaa",
	"email":"pet@pet.com.br",
	"categoria":"brinquedos"
}

*DELETE: http://localhost:3000/api/fornecedores/:id => Exclui fornecedor com base no ID
