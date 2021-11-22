### WEB2 - Ponto-Max

## Instruçõoes para usar com node

- Clone o repositório main
> git clone https://github.com/pedropereira2000/web2.git

- Em um terminal rode a instalação de depêndencias do node
> npm install

- Apos renomeie o arquivo no diretório raiz chamado EXEMPLOEVN para
> .env

- Agora dento do arquivo .env altere o campo CHAVA_JWT assim como na descrição do arquivo
> DIGITE AQUI SUA CHAVE SEGURA PARA SER USADA NO JWT (pode ser uma sequência aleatória com o FSA412!@$fdsnagj)

- Agora podemos executa a aplicação com:
> npm start

- Acesse o link:
> localhost:3000

## Instruções para usar com docker

- Clone o repositório main
> git clone https://github.com/pedropereira2000/web2.git

- Agora execute o docker com o comando
> docker run -p 3000:3000 ponto-max

- Acesse o link:
> localhost:3000

> <img src="./logo.png" alt="Logo"/>

Repositório para o projeto de web 2

## Tasks

- [X] 1° Definir um nome (e um logo) para o sistema.
- [X] 2° Criar um repositório na plataforma GitHub.
- [X] 3° Definir um template e padrão visual para o site (cabeçalho e rodapé).
- [X] 4° Criar um arquivo para conter as configurações da aplicação web como senhas e
os parâmetros necessários para o funcionamento da aplicação web.
- [X] 5° Criar uma página inicial para o site com um breve resumo da proposta e os links
para as demais páginas, a página incial também deve possuir um formulário de login.
- [X] 6° Implementar um sistema de autenticação simples (usuário e senha armazenados no arquivo de configuração) que irão permitir acesso a uma tela de configuração. Exibir em todas as telas da aplicação o nome do usuário autenticado.
- [X] 7° Realizar o logout do usuário.
- [X] 8° Criar uma página com uma descrição mais detalhada sobre o que será desenvolvido.
- [X] 9° Criar uma página para listar as tecnologias e ferramentas que serão utilizadas.
- [X] 10° Criar uma página para descrever as pessoas envolvidas no projeto.
- [X] 11° Criar uma página de contato, no qual será possível enviar uma mensagem (por email) para os desenvolvedores da ferramenta. Os campos obrigatórios são nome, e-mail, assunto e mensagem.
- [X] 12° Criar uma página de configuração que permite o usuário modificar o nome exibido nas páginas.
- [X] 13° Criar um arquivo Dockerfile para a execução automática do projeto pelo professor.