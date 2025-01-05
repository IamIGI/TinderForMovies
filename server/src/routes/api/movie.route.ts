import express from 'express';
import movieController from '../../controllers/movie.controller';

const router = express.Router();

router.route('/').get(movieController.getMovies);
router.route('/').patch(movieController.updateMovieStatus);
//user
router.route('/user').get(movieController.getUserMovies);
export = router;
