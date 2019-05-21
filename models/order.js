var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  type: { type: String, enum: ['donut-holes', 'glazed', 'chocolate', 'strawberry', 'filled donut', 'coffee'], required: true },
  request: { type: String, required: true },
  category: { type: String, enum: ['donuts', 'breakfast-sandwiches', 'drinks'], required: true },
  upvotes: {type: Number, default: 0},
  downvotes: {type: Number, default: 0},
  date: { type: Date, default: Date.now }
});

var Post = mongoose.model('Post', postSchema)
module.exports = Post;
