import path from 'path';
import express, { Request, Response } from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors(corsOptions));
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/movies', require('./routes/api/movie.route'));
app.get('/ping', (req: Request, res: Response) => {
  res.send('Server is running!');
});

// handle UNKNOWN URL REQUESTS
app.all('*', (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ error: '404: not found' });
  } else if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else {
    res.type('txt').send('404: not found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
