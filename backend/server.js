import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Usuário do MySQL
    password: '', // Senha do MySQL
    database: 'gestao_tarefas', // Nome do banco de dados
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL.');
    }
});

// Rota para adicionar uma nova tarefa
app.post('/tarefas', (req, res) => {
    const { descricao, tipo, data } = req.body;
    const query = 'INSERT INTO tarefas (descricao, tipo, data, status) VALUES (?, ?, ?, "Pendente")';
    db.query(query, [descricao, tipo, data], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Tarefa adicionada com sucesso.');
        }
    });
});

// Rota para buscar todas as tarefas
app.get('/tarefas', (req, res) => {
    const query = 'SELECT * FROM tarefas';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// Rota para concluir uma tarefa
app.put('/tarefas/:id/concluir', (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE tarefas SET status = "Concluída" WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Tarefa concluída com sucesso.');
        }
    });
});

// Rota para excluir uma tarefa
app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tarefas WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Tarefa excluída com sucesso.');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

