const express = require('express');
const router = express.Router();
const Tree = require('../models/tree');

// tree CRUD 만들어야징

// get a list of trees from the db
router.get('/trees', function(req, res, next){
    if(!req.query.lng || !req.query.lat){
        Tree.find({}).then(function(forest){
            res.send(forest);
        });
    }else{
    
        Tree.geoNear({
            type:'Point', 
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        {
            maxDistance:100000, // 미터
            spherical: true
        }).then(function(trees){
            res.send(trees);
        });
    }
});

// 1. add a new tree to the db
router.post('/trees', function(req, res, next){
    Tree.create(req.body).then(function(tree){ 
        // create는 take second.. 그래서 끝마친 후에 할일은 then
        res.send(tree);
    }).catch(next); // Error handling

    
});

// 3. update a tree in the db
router.put('/trees/:id', function(req, res, next){
    Tree.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(outdated){
        // res.send(tree); 
        // update전 outdated tree를 return하넹
        
        Tree.findOne({_id:req.params.id}).then(function(tree){
            res.send({
                'old': outdated,
                'new': tree
            }); // new tree
        });
    }).catch(next);;
});

// 2. delete a tree from the db
router.delete('/trees/:id', function(req, res, next){
    Tree.findByIdAndRemove({_id: req.params.id}).then(function(tree){
        // 삭제된 tree를 return
        res.send(tree);
    }).catch(next);
});

module.exports = router;



/*
using jQeury
$ajax({
    method: "GET",
    url: "",
})

$ajax({
    method: "POST",
    url: "",
    data: {name: "ChristmasTree", rank: "0"}
})
*/