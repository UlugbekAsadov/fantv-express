import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './configs/db.config';
import { authRoutes } from './routes/auth.route';
import { userRoutes } from './routes/user.route';

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

connectDb();

app.get('/api/v1/status', (_, res) => res.status(200).json({ ok: true }));

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1', userRoutes);

app.listen(port, async () => {
  console.log(`
    =================================================
                                                   
          [express]: http://localhost:${port}         
                                                          
    =================================================
  `);
});
