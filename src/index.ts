import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './configs/db.config';
import { userRoutes } from './routes/auth.route';
import { updateUsers } from './scripts/user.script';

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

connectDb();

app.get('/v1/status', (_, res) => res.status(200).json({ ok: true }));

app.use('/v1/auth', userRoutes);

app.listen(port, async () => {
  console.log(`
    =================================================
                                                   
          [express]: http://localhost:${port}         
                                                          
    =================================================
  `);
});
