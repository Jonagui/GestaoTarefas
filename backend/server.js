import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestao_tarefas' 
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados');
});

let tarefas = [];

// Rota para obter todas as tarefas
app.get('/tarefas', (req, res) => {
    db.query('SELECT * FROM tarefas', (err, results) => {
        if (err) {
            console.error('Erro ao buscar tarefas:', err);
            res.status(500).send('Erro ao buscar tarefas');
            return;
        }
        res.json(results);
    });
});

// Rota para adicionar uma nova tarefa
app.post('/tarefas', (req, res) => {
    const { descricao, tipo, data } = req.body;
    const novaTarefa = { descricao, tipo, data, status: 'Pendente' };
    db.query('INSERT INTO tarefas SET ?', novaTarefa, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar tarefa:', err);
            res.status(500).send('Erro ao adicionar tarefa');
            return;
        }
        res.json({ id: result.insertId, ...novaTarefa });
    });
});

// Rota para editar uma tarefa existente
app.put('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const { descricao, tipo, data } = req.body;
    db.query('UPDATE tarefas SET descricao = ?, tipo = ?, data = ? WHERE id = ?', [descricao, tipo, data, id], (err) => {
        if (err) {
            console.error('Erro ao editar tarefa:', err);
            res.status(500).send('Erro ao editar tarefa');
            return;
        }
        res.send('Tarefa atualizada com sucesso');
    });
});

// Rota para concluir uma tarefa
app.put('/tarefas/:id/concluir', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE tarefas SET status = ? WHERE id = ?', ['Concluída', id], (err) => {
        if (err) {
            console.error('Erro ao concluir tarefa:', err);
            res.status(500).send('Erro ao concluir tarefa');
            return;
        }
        res.send('Tarefa concluída com sucesso');
    });
});

// Rota para excluir uma tarefa
app.delete('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tarefas WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Erro ao excluir tarefa:', err);
            res.status(500).send('Erro ao excluir tarefa');
            return;
        }
        res.send('Tarefa excluída com sucesso');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});