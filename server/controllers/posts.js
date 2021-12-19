import express from 'express';
import mongoose from 'mongoose';

import PlaylistMessage from '../models/postMessage.js';

const router = express.Router();

export const getPlaylistsByCreator = async (req, res) => {
    const { name } = req.query;
    // var user = mongoose.Types.ObjectId(creator);
//    console.log(creator);
    try {
        const playlists = await PlaylistMessage.find({ creator: name });
        res.json({ data: playlists });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPlaylist = async (req, res) => { 
    const { id } = req.params;

    try {
        const playlist = await PlaylistMessage.findById(id);
        
        res.status(200).json(playlist);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPlaylist = async (req, res) => {
    const playlist = req.body;

    const newPlaylistMessage = new PlaylistMessage({ ...playlist, creator: `${req.userId.toString()}User`, createdAt: new Date().toISOString() })

    try {
        await newPlaylistMessage.save();

        res.status(201).json(newPlaylistMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const deletePlaylist = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No playlists with id: ${id}`);

    await PlaylistMessage.findByIdAndRemove(id);

    res.json({ message: "Playlist deleted successfully." });
}


export const addToPlaylist = async (req, res) => {
    const { id } = req.params;
    const movie = req.body;

    const playlist = await PlaylistMessage.findById(id);

    playlist.items.push(movie);

    const updatedPlaylist = await PlaylistMessage.findByIdAndUpdate(id, playlist, { new: true });

    res.json(updatedPlaylist);
};

export const removeFromPlaylist = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    let playlist = await PlaylistMessage.findById(id);

    playlist = playlist.items.filter((val) => val.imdbID !== value);

    const updatedPlaylist = await PlaylistMessage.findByIdAndUpdate(id, playlist, { new: true });

    res.json(updatedPlaylist);
};


export default router;

// export const likePost = async (req, res) => {
//     const { id } = req.params;

//     if (!req.userId) {
//         return res.json({ message: "Unauthenticated" });
//       }

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
//     const post = await PlaylistMessage.findById(id);

//     const index = post.likes.findIndex((id) => id ===String(req.userId));

//     if (index === -1) {
//       post.likes.push(req.userId);
//     } else {
//       post.likes = post.likes.filter((id) => id !== String(req.userId));
//     }

//     const updatedPost = await PlaylistMessage.findByIdAndUpdate(id, post, { new: true });

//     res.status(200).json(updatedPost);
// }

// export const getPosts = async (req, res) => {
//     const { page } = req.query;
    
//     try {
//         const LIMIT = 8;
//         const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
//         const total = await PlaylistMessage.countDocuments({});
//         const posts = await PlaylistMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

//         res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
//     } catch (error) {    
//         res.status(404).json({ message: error.message });
//     }
// }
