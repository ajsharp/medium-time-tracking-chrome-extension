jQuery(document).ready(function($) {
  var post = {}
  track = function(type) {
    payload = {
      "ts"            : (new Date()).toJSON(),
      "post_title"    : post.title,
      "post_id"       : post.id,
      "tracking_type" : type,
      "origin"        : window.location.href
    }

    if(window.location.href.match(/edit$/)) {
      $.ajax({
        url: 'https://medium-time-tracking.herokuapp.com/track',
        type: "POST",
        data: payload,
        dateType: 'json',
        async: false
      })
    }
  }

  post.title = $('h1.post-title').html()
  post.id = $('article').attr('data-post-id')
  track('in')

  $(window).unload(function(e) {
    track("out")
  })
})