const router = require('express').Router()
const db = require('../models')

router.get('/', (req, res) => {
    db.Place.find()
    .then((places) => {
      res.render('places/index', { places })
    })
    .catch(err => {
      console.log(err) 
      res.render('error404')
    })
})



router.post('/', (req, res) => {
  if (!req.body.pic) {
    req.body.pic = 'http://placekitten.com/400/400'
  }
  if (!req.body.city) {
    req.body.city = 'Anytown'
  }
  if (!req.body.state) {
    req.body.state = 'USA'
  }
  if (!req.body.founded) {
    req.body.founded = new Date().getFullYear()
  }

  db.Place.create(req.body)
  .then(() => {
    res.redirect('/places')
  })
  .catch(err => {
    if(err && err.name == 'ValidationError') {
      let message = 'Validation Error: '
      for (var field in err.errors) {
        message += `${field} was ${err.errors[field].value}`
        message =+ `${err.errors[field].message}`
      }
      res.render('places/new', {message})
    }else {
    res.render('error404')
    }
  })
})

// NEW FORM
router.get('/new', (req, res) => {
  res.render('places/new')
})



router.get('/:id', (req, res) => {
  db.Place.findById(req.params.id)
  .populate('comments')
  .then(place => {
      console.log(place.comments)
      res.render('places/show', { place })
  })
  .catch(err => {
      console.log('err', err)
      res.render('error404')
  })
})

//EDIT
router.get('/:id/edit', (req, res) => {
  db.Place.findById(req.params.id)
  .then(place => {
      res.render('places/edit', { place })
  })
  .catch(err => {
      res.render('error404')
  })
})


router.put('/:id', (req, res) => {
  if (!req.body.pic) {
        req.body.pic = 'http://placekitten.com/400/400'
      }
    if (!req.body.city) {
        req.body.city = 'Anytown'
      }
      if (!req.body.state) {
        req.body.state = 'USA'
      }
        if (!req.body.founded) {
          req.body.founded = new Date().getFullYear()
        }
  db.Place.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
  .then(() => {
    res.redirect(`/places/${req.params.id}`)
  })
  .catch(err => {
    console.log('err', err)
    res.render('error404')
  })
})


router.delete('/:id', (req, res) => {
  db.Place.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect('/places')
  })
  .catch(err => {
    console.log('err', err)
    res.render('error404')
  })
})



router.post('/:id/rant', (req, res) => {
  res.send('GET /places/:id/rant stub')
})


// COMMENT
router.post('/:id/comment', (req, res) => {
  console.log(req.body)
  db.Place.findById(req.params.id)
  .then(place => {
      db.Comment.create(req.body)
      .then(comment => {
          place.comments.push(comment.id)
          place.save()
          .then(() => {
              res.redirect(`/places/${req.params.id}`)
          })
      })
      .catch(err => {
          res.render('error404')
      })
  })
  .catch(err => {
      res.render('error404')
  })
})
router.delete('/:id/comment/:commentId', (req, res) => {
  db.Comment.findByIdAndDelete(req.params.commentId)
  .then(() => {
    res.redirect(`/places/${req.params.id}`)
  })
  .catch(err => {
    res.render('error404')
  })
})


module.exports = router
