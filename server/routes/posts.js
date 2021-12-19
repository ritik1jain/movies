import express from 'express';

import { getPlaylistsByCreator, getPlaylist, createPlaylist, addToPlaylist, removeFromPlaylist, deletePlaylist } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getPlaylistsByCreator);
router.get('/:id', getPlaylist);

router.post('/', auth,  createPlaylist);
router.delete('/:id', auth, deletePlaylist);
router.post('/add/:id', addToPlaylist);
router.patch('/add/:id', auth, removeFromPlaylist);

export default router;

