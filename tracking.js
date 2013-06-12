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

    $.ajax({
      url: 'https://medium-time-tracking.herokuapp.com/track/' + type,
      type: "POST",
      data: payload,
      dateType: 'json',
      async: false
    })
  }

  var currentState = null

  post.title = $('h1.post-title').html()
  post.id    = $('article').attr('data-post-id')

  // set initial edit / not editing state
  if (window.location.href.match(/edit$/)) {
    currentState = 'editing'
    track('in')
  } else {
    currentState = 'not editing'
  }

  var checkStateChange = function() {
    if (window.location.href.match(/edit$/)) {
      if (currentState == 'not editing') {
        currentState = 'editing'
        track('in')
      }
    } else {
      if (currentState == 'editing') {
        currentState = 'not editing'
        track('out')
      }
    }
  }

  // check if the user started editing every second
  window.setInterval(checkStateChange, 1000)

  $(window).unload(function(e) {
    track("out")
  })
})