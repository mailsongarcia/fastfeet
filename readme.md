
<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png" width="300px" />
</h1>
<h3 align="center">
  Desafio Final: FastFeet Backend - API Rest com NodeJS/Express
</h3>
<h3 align="center">
  :warning: Etapa concluidas 2/4 :warning:
</h3>
<p>Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack. Até o momento eu conclui todo o back-end da aplicação.</p>

## :rocket: Tecnologias
- [**NodeJS**](https://nodejs.org/en/)
- [**Docker**](https://www.docker.com/)
- [**Postgres**](https://www.postgresql.org/)
- [**MongoDB**](https://www.mongodb.com/) —
- [**Redis**](https://redis.io/) —
---


## **Blibiotecass**
- [**Express**](https://expressjs.com/pt-br/)
- [**Yup**](https://github.com/jquense/yup)
- [**Jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken)
- [**Sequelize**](https://sequelize.org/)
- [**Bcryptjs**](https://www.npmjs.com/package/bcryptjs)
- [**Date-fns**](https://date-fns.org/)
- [**Multer**](https://www.npmjs.com/package/multer)
- [**Nodemailer**]
- [**Bee-queue**](https://github.com/bee-queue/bee-queue)
- [**Sentry**](https://sentry.io/)
- [**Date-fns**](https://date-fns.org/)
- [**Youch**](https://www.npmjs.com/package/youch)
- [**Dotenv**](https://www.npmjs.com/package/dotenv)

---

## **Lint**
- [**ESLint**](https://www.npmjs.com/package/eslint) — [**Airbnb style guide (Javascript)**](https://github.com/airbnb/javascript)
- [**Prettier**](https://www.npmjs.com/package/prettier)
- [**EditorConfig**]() — Extension for VSCode.

---
## **Funcionalidades**
<h3>1. Criação e autenticação de usuários Administradores</h3>
Através de seeds do sequelize criei um usuário Administrador com e-mail e senha. A autenticação do usuário é feita com JWT e ele é responsavel por adicionar entregadores, destinários, atribuir e cancelar entregas. 

<h3>2. Destinários</h3>
Os destinários possuem nome e endereço completo. Eles são cadastrados e atualizados por um usuário autenticado na aplicação. 
<h3>3. Entregadores</h3>
Os entregadores são adicionados por um usuário autenticados. Os entregadores não se autenticam no sistema. Os entregadores possuem rotas para retirar encomendas em um horário definido com limite diário, listas encomendas atribuidas  modificar status como entregue ou reletar problemas. 
<h3>4. Encomendas</h3>
As encomendas são criadas e atribuidas por um usuário autenticado. Quando uma encomenda é atribuída a um entregador ele receber um e-mail. Quando a entrega é cancelada devido algum problema o entregador também recebe um e-mail com todos os detalhes.

---
# Istalando Dependências

```

$ git clone https://github.com/mailsongarcia/fastfeet
$ cd fastfeet
$ yarn
$yarn sequelize db:migrate
$yarn sequelize db:seed:all
$yarn dev


```

