# Projeto de Backend, Frontend e MySQL com Containers

Este projeto é dividido em três partes principais: **Backend**, **Frontend** e **MySQL**, todos rodando em containers Docker.

## Pré-requisitos

- **MySQL local**: Caso tenha o MySQL rodando na sua máquina local, pare-o para evitar conflitos com o container. Utilize o seguinte comando: `sudo systemctl stop mysql`.
- **Node.js**: É necessário ter a versão `18.18.0` do Node.js. Você pode verificar a versão instalada com `node -v`.
- **Yarn**: O projeto utiliza o Yarn como gerenciador de pacotes. Se ainda não o tem instalado, use o comando: `npm install -g yarn`.

## Instalação

Clone este repositório para a sua máquina local:  
`git clone https://github.com/seu-usuario/seu-repositorio.git`  
`cd seu-repositorio`

Para instalar as dependências do projeto, execute o comando abaixo:  
`bash install.sh`

## Build do Projeto

Após a instalação das dependências, você pode construir e iniciar os containers com o seguinte comando:  
`docker-compose up --build`

O projeto será iniciado no `localhost:3000`.

## Acesso ao Projeto

Caso você seja direcionado para a página inicial sem fazer login, por favor, acesse a página de login diretamente em:  
`http://localhost:3000/login/Login`

## Acesso Inicial

É necessário criar um novo usuário para realizar o login pela primeira vez. O primeiro usuário é definido como **admin**:  


## Definições do Projeto

- **Admin**: Pode visualizar todos os serviços, cadastrar músicos, instrumentos e eventos.
- **Músico**: Pode visualizar os eventos aos quais está vinculado, além de editar seu perfil.
