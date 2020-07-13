# Network
Caso a rede isa-net não exista ela deve ser criada.
```
docker network create isa-net
```

# Using available container

## mongodb
```
docker run --network isa-net -d -p 27017:27017 --name mongodb drferreira/isa-mongodb
```
## POSTGRESQL
```
docker run --network isa-net -d -p 5432:5432 --name postgres drferreira/isa-postgres
```
## API
```
UNDER CONSTRUCTION
```
## KEYCLOAK
```
docker run --network isa-net -d -p 8080:8080 -e DB_VENDOR=postgres -e DB_ADDR="postgres" -e DB_PASSWORD="postgres" -e DB_USER="postgres" -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin --name keycloak jboss/keycloak
```
## FRONTEND
```
UNDER CONSTRUCTION
```

# Building and running containers
A inicialização do projeto pode ser feita de dois modos, utilizando containers prontos e disponibilizados pelo projeto
ou realizando a sua construção localmente, portanto os dois modos serão apresentados para todos os recursos.

## mongodb
O banco de dados mongodb é utilizado para armazenamento de logs e gestão da fila de processos.

### Construção local da imagem
```
docker build --target mongodb -t mongodb .
```
### Uso de imagem disponibilizada
UNDER CONSTRUCTION

### Inicialização do container
```
docker run --network isa-net -d -p 27017:27017 --name mongodb mongodb
```

## postgres
O armazenamento principal dos dados é feito nesta base, também é utilizada pelo serviço keycloak para gerenciamento de
usuários.

### construção local da imagem
```
docker build --target postgres -t postgres .
```
### uso de imagem disponibilizada
UNDER CONSTRUCTION

### Inicialização do container
```
docker run --network isa-net -d -p 5432:5432 --name postgres postgres
```

## API
O serviço de api é responsavel pela implementação da regras de negócios e entrega de dados ao frontend.

### Construção local da imagem
```
docker build --target api -t api .
```
### Uso de imagem disponibilizada
UNDER CONSTRUCTION

### Inicialização do container
```
docker run --network isa-net -d -p 8080:8080 --name api isa-api
```

## KEYCLOAK
Keycloak é o serviço utilizado para autenticação e gestão de usuários. Ele pode ser integrado de forma dedicada, como
é apresentado neste tutorial, ou compartilhado com outros projetos.

### Inicialização do container
```
docker run --network isa-net -d -p 8080:8080 -e DB_VENDOR=postgres -e DB_ADDR="postgres" -e DB_PASSWORD="postgres" -e DB_USER="postgres" -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin --name keycloak jboss/keycloak
```
> Ao realizar a primeira construção do container, conforme indicado acima, o usuário padrão será criado e o schema da
> base de dados, portanto portanto indicamos que após a primeira inicialização do container seja destruido e
> inicializado sem as variáveis KEYCLOAK_USER e KEYCLOAK_PASSWORD pois assim ele não irá tentar novamente a criação da
> estrutura o que causaria erro ao subir o container.

## Importação REALM
- Criar realm (isa-qualis)
- Criar clientes (front-end e backend)
- Configurar permissões para cliente backend
- Criar roles para realm (administrator, responsible, infectologist, assisted)
- Criar usuário admin (forçar update de senha)

### Teste de acesso
Gerar token para cliente frontend:
```
 http://localhost:8080/auth/realms/isa-qualis/protocol/openid-connect/token
 username : XXXXX
 password : XXXXX
 cliente_id : isa-frontend
 grant_type:password
```

Gerar token para cliente backend:
```
http://localhost:8080/auth/realms/isa-qualis/protocol/openid-connect/token
client_secret : XXXX
client_id : isa-backend
grant_type:client_credentials
```

Consultar API keycloak utilizando cliente backend:
```
URL http://localhost:8080/auth/admin/realms/isa-qualis/users
Headers: Authorization Bearer <TOKEN>
```

## FRONTEND
```
UNDER CONSTRUCTION
```
