import express from 'express';
import movieController from '../../controllers/movie.controller';

const router = express.Router();

router.route('/').get(movieController.getMovies);
router.route('/').patch(movieController.updateMovieStatus);
router.route('/reset').post(movieController.resetMovies);
//user
router.route('/user').get(movieController.getUserMovies);
export = router;
