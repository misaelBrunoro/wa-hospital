WaHospital Api Base
==================

Utilize o VSCode, instale o Rest Client https://marketplace.visualstudio.com/items?itemName=humao.rest-client e utilize a pasta .request para testar (opcional).

### Tecnologias Utiizadas

* Node/Typescript
* NestJs (Framework)
* Docker
* Typeorm (Query builder e migrations)
* Sentry.io (log de erros)
* DB PostgreSQL

### Iniciando um novo projeto

```bash
# install docker https://docs.docker.com/install

git clone https://github.com/misaelBrunoro/wa-hospital.git
yarn install # ou npm install

[sudo] docker-componse up
# levantará o docker com o banco de dados e a aplicação.
# Ele aplicará as migrations do banco e depois dará watch nos arquivos
# e iniciará o node com a api
```

### Documentação

http://localhost:3000/swagger/