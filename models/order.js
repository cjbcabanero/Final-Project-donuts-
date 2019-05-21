var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  type: { type: String, enum: ['donut holes', 'glazed', 'chocolate', 'strawberry', 'jelly filled', 'chocolate filled', 'custard filled', 'bacon egg ham cheese croissant', 'sausage ccmuffin w/ egg', 'ccs filipino special', 'ccs creamy warm milk', 'coffee', 'soft drinks'], required: true },
  request: { type: String, required: true },
  category: { type: String, enum: ['donuts', 'breakfast sandwiches', 'ccs specials', 'drinks'], required: true },
  upvotes: {type: Number, default: 0},
  downvotes: {type: Number, default: 0},
  date: { type: Date, default: Date.now }
});

var Post = mongoose.model('Post', postSchema)
module.exports = Post;
