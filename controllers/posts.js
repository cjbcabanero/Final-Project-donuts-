var Post = require('../models/order.js')

exports.allPosts = function (req, res) {
  //Retrieve data from db (array of obj)
  Post.find({}, function(err, data) {
    console.log('Posts Retrieved')
    console.log(data)
    res.render('posts', { posts: data })
  })
}

exports.newPost = function(req, res) {
  console.log('Received new post.')
  console.log(req.body)

  var post = new Post({
    title: req.body.title,
    address: req.body.address,
    category: req.body.category,
    type: re.body.type,
    request: req.body.request,
  })

  post.save(function (err) {
    if (err) {
      console.log(err)
      res.send('<h1> Please make sure you fill out all form fields! </h1>')
      return
    }

    res.redirect('/posts')
  })
}

exports.upvote = function(req, res) {
  console.log('Someone upvoted the post with id = ', req.params.id)

  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log(err)
    }

    if (post === null) {
      console.log('Couldn\'t find a post with this id')
      return
    }

    post.upvotes += 1 // post.upvotes = post.upvotes + 1
    post.save(function(error, postAfterSave) {
      if(error) {
        console.log(error)
        res.json({error: "We couldn't save the upvote at this time"})
        return
      }
      res.json({ success: "Post upvoted successfully.", upvotes: postAfterSave.upvotes })
    })
  })
}

exports.downvote = function(req, res) {
  console.log('Someone downvoted the post with id = ', req.params.id)

  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log(err)
    }

    if (post === null) {
      console.log('Couldn\'t find a post with this id')
      return
    }

    post.downvotes += 1 // post.downvotes = post.downvotes + 1
    post.save(function(error, postAfterSave) {
      if(error) {
        console.log(error)
        res.json({error: "We couldn't save the downvote at this time"})
        return
      }
      res.json({ success: "Post downvoted successfully.", downvotes: postAfterSave.downvotes })
    })
  })
}
