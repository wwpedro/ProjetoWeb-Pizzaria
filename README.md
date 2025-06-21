---

# 🍕 Pizzaria do Pedro - ProjetoWeb-Pizzaria

Sistema web para gestão de pedidos de pizzaria, com CRUD de sabores e bebidas, tela de cliente e área administrativa.

---

## ✅ Tecnologias usadas:

* Node.js
* Express.js
* EJS (com uso de Partials)
* Sequelize ORM
* Banco de dados: **MySQL** ou **SQLite**
* HTML + CSS (estilo básico)

---

## ✅ Pré-requisitos para rodar o projeto:

1. **Node.js** (versão 16 ou superior)
2. **NPM**
3. **MySQL** (se optar por esse banco) ou use o SQLite (já configurado por padrão)

---

## ✅ Passo a passo para rodar:

### 📥 1. Clonar o repositório:

```bash
git clone https://github.com/wwpedro/ProjetoWeb-Pizzaria.git
cd pizzaria-n1
```

---

### 📦 2. Instalar dependências:

```bash
npm install
```

---

### ⚙️ 3. Configurar o banco:

O banco é gerado no proprio projeto ao iniciar,
tambem é possivel inicar a seed após inicar o projeto para ela povoar o banco

```
src/database/db.js
```

---

### 🗃️ 4. Popular o banco com dados iniciais:

Rode o arquivo de seed (opcional):

```bash
node src/seed.js
```

Este comando vai criar alguns sabores e bebidas iniciais.

---

### 🚀 5. Rodar o projeto:

```bash
node src/server.js
```

O servidor irá iniciar em:

```
http://localhost:3000
```

---

## 📋 Senha Login ADM: 123

---

## ✅ Funcionalidades:

* 📋 Tela inicial com escolha entre **Cliente** ou **Administrador**
* ✅ CRUD de Sabores
* ✅ CRUD de Bebidas
* ✅ Formulário de Pedido (Cliente)
* ✅ Listagem de pedidos com status (Cliente e Admin)
* ✅ Atualização de status (Admin)

---

## ✅ Acesso administrador:

* **Senha padrão:** `123`

---

## ✅ Estrutura de pastas:

```
src/
├── controllers/
├── models/
├── routes/
├── views/
├── database/
├── public/
└── server.js
```

---

## ✅ Contato

Projeto feito por **Pedro Augusto Santos da Silva**
Disciplina: **Programação Web - IFAL Maceió - 2025**

---

Se quiser posso te gerar o arquivo pronto para download. Quer?
