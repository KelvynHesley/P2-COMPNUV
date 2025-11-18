require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise'); 

const app = express();
const PORT = process.env.PORT || 3001; 


app.use(cors()); 
app.use(express.json()); 


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: true },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.post('/alunos', async (req, res) => {

    
    try {
        const { nome_completo, usuario_acesso, senha_plana, email_aluno, observacao } = req.body;

        if (!nome_completo || !usuario_acesso || !senha_plana || !email_aluno) {
            return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
        }

        const saltRounds = 10;
        const senha_hash = await bcrypt.hash(senha_plana, saltRounds);

        const sql = `
            INSERT INTO alunos 
            (nome_completo, usuario_acesso, senha_hash, email_aluno, observacao) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        await pool.query(sql, [
            nome_completo,
            usuario_acesso,
            senha_hash, 
            email_aluno,
            observacao
        ]);

        res.status(201).json({ message: 'Aluno cadastrado com sucesso!' });

    } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Usuário ou e-mail já existe.' }); 
        }

        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor back-end rodando na porta ${PORT}`);
    console.log(`Acesse a API em http://localhost:${PORT}`);
});