const express = require('express'),
      router = express.Router();

      let test =  require('./../sandbox/friends');
      console.log( test);

router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
         res.render('index',  {name});  
    } else {
        res.redirect('/hello');
    }
}
);



router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if(name){
        res.redirect('/');    
    } else {
        res.render('hello');
    }
}
);
router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    // res.render('hello',{name: req.body.username});
    res.redirect('/');
}
);
router.post('/goodbye', (req, res) => {

    res.clearCookie('username');
    res.redirect('/hello');
}
);
router.get('/sandbox', (req, res) => {
    res.render('sandbox', {test});
}
);

module.exports = router;