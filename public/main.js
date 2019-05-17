$( document ).ready(function() {
    console.log( "ready!" );

    $('.upvote-post').on('click', function (e) {
      console.log('upvote')
      // AJAX
      const postId = $(e.target)[0].dataset.id
      console.log(postId)
      $.ajax({
        method: "GET",
        url:`/upvote-post/${postId}`,
      })
      .done(function( response ) {
        console.log(response)
        $(`center#${postId} > .card.text-white.bg-info.mb-3.text-center > .card-body > p.upvotes-count`)[0].innerText = "Likes: " + response.upvotes
      });

      })

    $('.downvote-post').on('click', function (e) {
      console.log('downvote')
      // AJAX
      const postId = $(e.target)[0].dataset.id
      console.log(postId)
      $.ajax({
        method: "GET",
        url:`/downvote-post/${postId}`,
      })
      .done(function( response ) {
        console.log(response)
        $(`center#${postId} > .card.text-white.bg-info.mb-3.text-center > .card-body > p.downvotes-count`)[0].innerText = "Dislikes: " + response.downvotes
      });

    });

      // query div with id post-content and chage its html
      // so that we display the right form label and field for the user
      //e.target.value is what was selected

    // $('#post-type').on('change', function (e) {
    //   if (e.target.value == 'url') {
    //     $('#post-content').html(`
    //       <label class='text-blue' for="content">Url</label>
    //       <input class="form-control" type="text" placeholder="url">
    //     `)
    //   } else if (e.target.value == 'audio' || e.target.value == 'image' || e.target.value == 'video') {
    //     $('#post-content').html(`
    //
    //       <label class='text-blue' for="custom-file">Choose file</label>
    //       <input class="form-control" type="file" name="custom-file" style='color:red'/>
    //
    //     `)
    //   } else if (e.target.value == 'text') {
    //     $('#post-content').html(`
    //       <label class='text-blue' for="content">Content</label>
    //       <textarea id='content' class='form-control' name="content"></textarea>
    //     `)
    //   }
    // })
    //
  });
