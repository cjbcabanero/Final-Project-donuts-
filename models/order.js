var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['text', 'url', 'image', 'audio', 'video'], required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  upvotes: {type: Number, default: 0},
  downvotes: {type: Number, default: 0},
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now }
});

var Post = mongoose.model('Post', postSchema)
module.exports = Post;
