import { Request, Response } from 'express';
import movieService from '../services/movie.service';
import { MovieStatus } from '../interfaces/movie.interface';

function getMovies(req: Request, res: Response) {
  try {
    const space = req.query.space
      ? parseInt(req.query.space as string, 10) //radix- interpreted as decimal number
      : undefined;
    const amount = req.query.amount
      ? parseInt(req.query.amount as string, 10) //radix- interpreted as decimal number
      : undefined;

    const movies = movieService.getMoviesWithingRange(space, amount);

    res.status(200).json(movies);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

function getUserMovies(req: Request, res: Response) {
  try {
    const movies = movieService.getUserMovies();
    res.status(200).json(movies);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

function updateMovieStatus(req: Request, res: Response) {
  try {
    const id = req.query.id ? (req.query.id as string) : undefined;
    const status = req.query.status
      ? (req.query.status as MovieStatus)
      : undefined;

    if (!id || !status) {
      res.status(400).json({
        error: `Missing required parameters: ${id && 'id, '} ${
          status && 'status'
        }`,
      });
      return;
    }

    if (!status || !Object.values(MovieStatus).includes(status)) {
      res.status(400).json({
        error: `Wrong status: ${status}\nAvailable status values: ${Object.values(
          MovieStatus
        )}`,
      });
      return;
    }

    const updateMovieList = movieService.updateMovieStatus(id!, status!);

    res.status(200).json({ listType: status, list: updateMovieList });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

function resetMovies(req: Request, res: Response) {
  try {
    movieService.resetDB();
    res.status(200).json({ status: 'success' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export default { getMovies, getUserMovies, updateMovieStatus, resetMovies };
