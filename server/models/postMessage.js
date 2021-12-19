import mongoose from 'mongoose';

const playlistSchema = mongoose.Schema({
    title: String,
    type: String,
    creator:{ type: String, default:''},
    private: {type: Boolean, default: false },
    items: { type: [Object], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PlaylistMessage = mongoose.model('PlaylistMessage', playlistSchema);

export default PlaylistMessage;