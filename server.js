
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiHandler from './api/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.all('/api/chat', async (req, res) => {
    await apiHandler(req, res);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
