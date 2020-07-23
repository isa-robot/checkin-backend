# Network
Caso a rede isa-net não exista ela deve ser criada.
```
docker network create isa-net
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
docker run \
       --network isa-net \
       -d -p 5432:5432 \
       -e ESTABLISHMENT_NAME=<nome do estabelecimento> \
       -e ESTABLISHMENT_EMAIL=<email do estabelecimento> \
       -e ESTABLISHMENT_CNPJ=<CNPJ do estabelecimento> \
       -e ESTABLISHMENT_PHONE=<Telefone do estabelecimento> \
       -e ESTABLISHMENT_CITY=<cidade do estabelecimento> \
        --name postgres
          postgres
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
docker run \
    --network isa-net -d \
    -p 8080:8080 \
    -e BASE_URL="http://localhost:3333/"
    -e KEYCLOAK_SERVER_URL="http://keycloak:8080/auth" \
    -e KEYCLOAK_REALM="isa-qualis" \
    -e KEYCLOAK_CLIENT="isa-backend" \
    -e KEYCLOAK_ADMIN_USER="admin" \
    -e KEYCLOAK_ADMIN_PASSWORD="admin" \
    --name api \
    isa-api
```

as variáveis KEYCLOAK_ADMIN_USER e KEYCLOAK_ADMIN_PASSWORD são referentes ao usuário descrito nas instruções de
CRIAÇÃO DE USUÁRIO ADMINISTRADOR na sessão KEYCLOAK abaixo:


## KEYCLOAK
Keycloak é o serviço utilizado para autenticação e gestão de usuários. Ele pode ser integrado de forma dedicada, como
é apresentado neste tutorial, ou compartilhado com outros projetos.

### Inicialização do container
Por padrão o container não utiliza configuração previamente estabelecida, porém em anexo são fornecidas
configurações previamente desenvolvidas.

Estão disponiveis dois modelos:
- isa-qualis-realm-container-baseurl.json : Este considera a permissão de acesso do serviço somente entre containers.
- isa-qualis-realm-localhost-baseurl.json : Este considera a permissão de acesso do serviço somente a partir de localhost.

A escolha entre eles é feita importando o respectivo arquivo após a inicialização do container.

```
docker run \
    --network isa-net \
    -d -p 8080:8080 \
    -e JAVA_OPTS="-Dkeycloak.profile.feature.upload_scripts=enabled" \
    -e DB_VENDOR=postgres \
    -e DB_ADDR="postgres" \
    -e DB_PASSWORD="postgres" \
    -e DB_USER="postgres" \
    -e KEYCLOAK_USER=admin \
    -e KEYCLOAK_PASSWORD=admin \
    --name keycloak jboss/keycloak
```

> Ao realizar a primeira construção do container, conforme indicado acima, o usuário padrão será criado e o schema da
> base de dados, portanto portanto indicamos que após a primeira inicialização do container seja destruido e
> inicializado sem as variáveis KEYCLOAK_USER e KEYCLOAK_PASSWORD pois assim ele não irá tentar novamente a criação da
> estrutura o que causaria erro ao subir o container.

## Importação REALM
Acesse o painel do keycloak (http://localhost:8080/) e utilize o login padrão, caso não tenha sido alterado (admin, admin).
Após clique em realm e utilize em seguida criar. Selecione um dos dois arquivos desejado e clique em criar.

## CRIAÇÃO DE USUÁRIO ADMINISTRADOR NO REALM
após a importação do realm, é necessário a criação de um usuário com as permissões de admin, o usuário deve ter os mesmos valores
das variáveis 'KEYCLOAK_ADMIN_USER' e 'KEYCLOAK_ADMIN_PASSWORD' passadas ao subir o container da api isa.

-após a importação do realm, acesse a aba 'users'.
-clique em 'add user'
-digite um nome de usuário no campo 'username'. obs.: caso o container do keycloak for iniciado depois do container da api isa, o nome de usuário deve
-ser o mesmo nome do campo 'KEYCLOAK_ADMIN_USER' da api isa.
-clique em save.
-dentro do usuário criado, va até a aba 'Credentials'.
-digite uma senha. obs.: caso p container do keycloak for iniciado depois do container da api isa, a senha de usuário deve ser a mesma senha
-do campo 'KEYCLOAK_ADMIN_PASSWORD' da api isa
-clique em Set Password para salvar a senha
-va até a aba 'Role Mapping'
-em 'Available roles', escolha admin e clique em 'Add selected'
-va até a aba details, e no campo 'Required User Actions', remova 'Update Password' e clique em 'save' 

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
