# **QSCC-UEM**

## QualSeuCursoComputacao-UEM | Game Vocacional: Engenharia de Software vs. Ciência da Computação - UEM
Um mini-jogo interativo no estilo teste vocacional, desenvolvido para ajudar estudantes a identificar qual curso da área de computação da Universidade Estadual de Maringá (UEM) — Engenharia de Software ou Ciência da Computação — tem mais a ver com seu perfil.

Este é um projeto de extensão acadêmico, criado no âmbito da disciplina Informática e Sociedade (11919) do Departamento de Informática da UEM.

## Sobre o Projeto
A escolha de um curso superior é um grande desafio, especialmente em áreas com disciplinas e atuações tão próximas. A proposta deste jogo é oferecer uma ferramenta lúdica, rápida e informativa para que vestibulandos e curiosos possam:

* Entender as principais diferenças e focos de cada curso.

* Refletir sobre seus próprios interesses e aptidões.

* Receber uma recomendação personalizada com base em suas respostas.

* O projeto será apresentado na Feira de Profissões da UEM nos dias 13 e 14 de novembro para toda a comunidade.

## Funcionalidades
- Quiz Interativo: Uma série de perguntas rápidas sobre preferências, lógica e cenários de trabalho.

- Análise de Perfil: As respostas são ponderadas para traçar um perfil de afinidade com as características de cada curso.

- Resultados Detalhados: Ao final, o jogo apresenta o curso mais indicado e uma breve descrição sobre ele.

Design Responsivo: Acessível em desktops e dispositivos móveis.

---

## Como Executar o Projeto

Este guia irá ajudá-lo a configurar e executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)

### 1. Configuração do Ambiente

**Clone o repositório:**
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd qscc-uem
```

**Instale as dependências:**
```bash
npm install
```

### 2. Configuração do Google Sheets

O projeto salva os resultados do quiz em uma planilha do Google Sheets. Para isso, você precisará configurar a autenticação.

**a. Crie um Projeto no Google Cloud:**
   - Acesse o [Google Cloud Console](https://console.cloud.google.com/).
   - Crie um novo projeto.
   - No menu de busca, procure por "Google Sheets API" e ative-a para o seu projeto.

**b. Crie uma Conta de Serviço (Service Account):**
   - No menu, vá para `APIs & Services > Credentials`.
   - Clique em `Create Credentials > Service account`.
   - Dê um nome para a conta (ex: `database-qscc`), clique em `Create and Continue` e depois em `Done`.
   - Na lista de contas de serviço, clique na que você acabou de criar.
   - Vá para a aba `KEYS`, clique em `Add Key > Create new key`.
   - Escolha `JSON` como o tipo e clique em `Create`. Um arquivo `.json` será baixado. **Este arquivo é secreto.**

**c. Compartilhe a Planilha:**
   - Crie uma nova planilha no [Google Sheets](https://sheets.google.com/).
   - Renomeie a primeira aba/página para `Respostas`.
   - Clique no botão "Share" (Compartilhar).
   - Pegue o email da sua conta de serviço (o campo `client_email` no arquivo JSON que você baixou) e compartilhe a planilha com este email, dando a ele permissão de **Editor**.

### 3. Variáveis de Ambiente

As chaves e IDs do projeto são gerenciados por variáveis de ambiente.

- Crie um arquivo chamado `.env.local` na raiz do projeto.
- Use o arquivo `.env.local.demo` como um modelo.

**Preencha o `.env.local`:**

1.  `SPREADSHEET_ID`: Pegue o ID da URL da sua planilha.
    - Ex: `https://docs.google.com/spreadsheets/d/ESTE_EH_O_ID/edit`

2.  `GOOGLE_CREDENTIALS`: Abra o arquivo JSON que você baixou do Google Cloud, copie **todo o conteúdo** e cole como o valor desta variável, dentro de aspas simples.

### 4. Execute o Projeto

Com tudo configurado, inicie o servidor de desenvolvimento:
```bash
npm run dev
```
O terminal mostrará os servidores do Vite e da API rodando. Abra o endereço `http://localhost:8080` no seu navegador.

## Deploy na Vercel

Para publicar o jogo online, recomendamos a Vercel por sua integração nativa com projetos Vite e funções serverless.

### 1. Crie uma Conta e um Projeto
   - Crie uma conta na [Vercel](https://vercel.com/) (pode usar sua conta do GitHub).
   - No seu dashboard, clique em `Add New... > Project`.
   - Importe o seu repositório do GitHub.

### 2. Configure o Projeto
   - A Vercel deve detectar automaticamente que é um projeto Vite. Nenhuma configuração de build é necessária.
   - Antes de fazer o deploy, vá para a aba `Settings > Environment Variables`.

### 3. Configure as Variáveis de Ambiente na Vercel
   - Crie uma variável chamada `SPREADSHEET_ID` e coloque o ID da sua planilha como valor.
   - Crie outra variável chamada `GOOGLE_CREDENTIALS`. **Importante:** Para o valor, copie e cole o conteúdo do seu arquivo JSON de credenciais diretamente (sem aspas simples que usamos no `.env.local`). Marque esta variável como `Secret`.

### 4. Deploy
   - Volte para a aba `Deployments` e acione um novo deploy.
   - Após alguns instantes, seu projeto estará no ar em uma URL pública fornecida pela Vercel.