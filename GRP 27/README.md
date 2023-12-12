# Autores

- Carlos Vinicius Barbosa de Santana do Monte 01530125
- Eduardo Henrique Bezerra dos santos 01530700
- Ewerton Alexandre de Oliveira Cabral  01531026
- Henry Thierry - 01531883
- João Gabriel Candido de melo 01542139
- João Henrique Leal Ferreira Xavier  01531035

## 2023-11-29

* Presentes: Eduardo Henrique, João Gabriel, João Henrique
* Desenvolvido até a lista 7
* Ficou lindo!

## Projeto Mobile

Este é um aplicativo de gerenciamento de senhas desenvolvido com Expo Go e React Native. Ele permiete que o usuario possa criar senhas e que elas sejam gerenciadas pelo sistema de guiche.

## Aviso

PARA QUE O PROJETO FUNCIONE CORRETAMENTE, EM CLIENT/NODE_MODULES/EXPO/AppEntry.js precisa está nesse formato (POR PADRAO AO INSTALAR VIRA EM OUTRO FORMATO)

```js
import registerRootComponent from 'expo/build/launch/registerRootComponent';

import App from '../../src/app';

registerRootComponent(App);
```

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- npm (gerenciador de pacotes do Node.js) ou Yarn: [https://www.npmjs.com/](https://www.npmjs.com/) ou [https://classic.yarnpkg.com/](https://classic.yarnpkg.com/)
- Expo CLI: Você pode instalá-lo globalmente com o seguinte comando:

```bash
npm install -g expo-cli
```

## Instalação

Siga estas etapas para configurar o projeto em sua máquina:

1. Clone o repositório do GitHub para o seu sistema local:

2. Navegue até o diretório do projeto:

```bash
cd client
```

3. Instale as dependências do projeto usando npm ou yarn:

```bash
npm install
# ou
yarn install
```

## Execução

Certifique-se de que você possui o Expo Go instalado em seu dispositivo móvel para testar o aplicativo.

Siga estas etapas para iniciar o servidor e executar o aplicativo:

1. Inicie o servidor de desenvolvimento Expo:

```bash
expo start ou npm start
```

2. O Expo abrirá uma página no seu navegador. Você pode usar um leitor de código QR no aplicativo Expo Go em seu dispositivo móvel para escanear o código QR exibido na página ou pressionar a tecla "i" para iniciar no emulador iOS ou "a" para iniciar no emulador Android.

3. O aplicativo será carregado em seu dispositivo ou emulador e você poderá começar a usá-lo.

## API RESTful

Este aplicativo utiliza uma API RESTful para armazenar e recuperar senhas. Certifique-se de que o servidor da API esteja em execução e configurado corretamente. Consulte a documentação da API para obter detalhes sobre como configurar e usar a API. Se quiser usar um banco seu você deverá mudar nas configurações do projeto o link (no client), caso venha a usar o default poderá demorar mais que o esperado para rodar a API do banco de dados! (Em torno de 5 a 7 minutos)
