const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const { sequelize } = require('./models');
require('./models'); // Carrega relacionamentos

// Importação das rotas
const saborRoutes = require('./routes/saborRoutes');
const bebidaRoutes = require('./routes/bebidaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const cardapioRoutes = require('./routes/cardapioRoutes');

const app = express();

// Sessão
app.use(session({
  secret: 'chave-secreta-pizzaria',
  resave: false,
  saveUninitialized: true
}));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware global
app.use((req, res, next) => {
  res.locals.isAdmin = req.session.isAdmin || false;
  next();
});

// Rotas
app.use('/sabores', saborRoutes);
app.use('/bebidas', bebidaRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/cardapio', cardapioRoutes);

// Home
app.get('/', (req, res) => res.render('home'));

// Admin Login
app.post('/login-admin', (req, res) => {
  const { senha } = req.body;
  if (senha === '123') {
    req.session.isAdmin = true;
    res.redirect('/pedidos');
  } else {
    res.send('❌ Senha incorreta! <a href="/">Voltar</a>');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

// 🚨 SINCRONIZAR BANCO 🚨
// Primeira vez rode assim para recriar o banco:
// sequelize.sync({ force: true })

// Depois que rodar UMA VEZ com force:true, volte pra normal:
sequelize.sync({})
  .then(() => {
    console.log('✅ Banco recriado');
    app.listen(3000, () => console.log('🚀 Servidor rodando na porta 3000'));
  });
