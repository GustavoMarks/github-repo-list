![version](https://img.shields.io/badge/release-v1.0-blue)

# Github Repo List
#### API Rest + Client Web para listagem de repositórios de usuário do GitHub :octocat:
Desafio rápido proposto em processo seletivo para bolsa de desenvolvedor no Laboratório de Raio X da UFC

* Backend construído com Express Js
* Frontend construído com React Js

### Instruções para execução da API em ambiente de desenvolvimento

Para instalar todas as dependências, execute em _./api_:

```sh

npm install

```

Para rodar o servidor localmente, use:

```sh

npm run dev

```

A aplicação irá rodar com nodemon, que irá observar as alterações no código para restart do servidor, e a variável de ambiente de desenvolvimento será configurada com _'development'_ .


### Instruções para execução da API em ambiente de produção

Para rotar a aplicação localmente em modo de produção, em _./api_, use:

```sh

npm start

```

As dependências de produção serão pré-instaladas. Caso queira pular o passo de instalação, use:

```sh

node server.js

```

### Instruções para execução de testes automatizados na API

Após instalar todas as depedências, em _./api_ use:

```sh

npm test

```

Os scripts contidos na pasta de testes serão executados pelas bibliotecas jest e supertest


#### Observações
- As requisições à API do GitHub possuem uma taxa de 60 requisições por hora, passado desse limite a API responderá com _403_
- As requisições podem ser extendidas à 5000 requisições por hora com um token de autenticação que pode ser gerado na plataforma
- O token pode ser setado na variável ambient _GITHUB_TOKEN_
- Use _./api/env.example_ para o ambiente de desenvolvimento e _./api/.env_ (não versionado) para ambiente de produção
- Por default, o servidor irá rodar na em http://localhost:3333, outra porta poderá ser configurada pela variável ambiente _PORT_
- A rota para requisições à API do GitHub será _GET http://localhost:3333/github-repos/{username}_
- A rota aceitará um parêmetro 'page' para controle da paginação


### Instruções para execução do cliente React em ambiente de desenvolvimento

Em _./client_ instale todas as dependências com:

```sh

npm install

```

Execute o servidor de desenvolvimento React localmente com:

```sh

npm run dev

```

O servidor irá rodar em http://localhost:3000 caso a porta não esteja ocupada. 


### Instruções para execução do cliente React em ambiente de produção

Para rodar o servidor de produção com a build (versionada) gerada em React js localmente, em _./client_ use:

```sh

npm start

```

As dependências de produção serão pré-instaladas. Caso queira pular o passo de instalação, use:

```sh

node server.js

```

#### Observações
- Por default, o servidor de produção irá rodar em http://localhost:3000, outra porta poderá ser configurada pela variável ambiente _PORT_
- Para testes de requisição locais, a API deve estar rodando em http://localhost:3333

