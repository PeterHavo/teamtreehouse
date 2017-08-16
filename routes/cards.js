const express = require('express'),
      router = express.Router(),
      test = require('../data/flashcard.json'),
      { data } = require('../data/flashcard.json'),
      { cards } = data;



router.get('/', (req, res) => {
   const numOfCards = cards.length;
   const randomIdCard = Math.floor(Math.random()*numOfCards);
   res.redirect(`/cards/${randomIdCard}`); 
});


router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id }   = req.params;
    const text     = cards[id][side];
    const { hint } = cards[id];
    
    // console.log(cards[0]["answer"]);
    const templateData = { id,
                           text};

    if (!side){
        //res.redirect(`/cards/${id}?side=question`);
        //Error: Can't set headers after they are sent, 
        //solution:  Just for other users looking, I'll put the fix here. res.redirect() doesn't stop the execution in the router.get() method, since your also calling res.render() at the bottom of the function, you get an error. So it's a simple fix, just use return...
        return res.redirect(`/cards/${id}?side=question`);

    }
    if (side == 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sidetoShowDisplay = 'Answer';
    } else if (side == 'answer'){
         templateData.sideToShow = 'question';
         templateData.sidetoShowDisplay = 'Question';
    }


    res.render('cards', templateData);
}
);


module.exports = router;