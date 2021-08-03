WaHospital Api Base
==================

Utilize o VSCode, instale o Rest Client https://marketplace.visualstudio.com/items?itemName=humao.rest-client e utilize a pasta .request para testar (opcional).

### Tecnologias

* Node/Typescript
* NestJs (Framework)
* Docker
* Typeorm (Query builder e migrations)
* Sentry.io (log de erros)

### Iniciando um novo projeto

```bash
# install docker https://docs.docker.com/install

git clone git@bitbucket.org:waprojectbase/waproject-base-api.git
yarn install # ou npm install

node ./init.js

[sudo] docker-componse up
# levantará o docker com o banco de dados e a aplicação.
# Ele aplicará as migrations/seeds do banco e depois dará watch nos arquivos
# e iniciará o node com a api
```

### Para mais informações veja a pasta ./docs