const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');



//gestion du storage de multer
const storage = multer.diskStorage({
    destination : path.join( __dirname, 'uploads'),
    filename : (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({
    storage : storage
});

const ObjectID = require('mongoose').Types.ObjectId;
//const upload = multer({dest: 'uploads/'});

const { PostsModel } = require('../models/postsModel');

router.get('/', (req, res) => {
    PostsModel.find((err, docs) => {
        if(!err)res.send(docs);
        else console.log('erreur de recuperation des données:'+err);
    })
    
});


//get on by id
router.get('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu :' + req.params.id)
    
        PostsModel.findById(
            req.params.id,
            (err, docs) => {
                if(!err)res.send(docs);
                else console.log('erreur de suppression des données :' + err);
            }
        )
});



//post one

router.post('/', (req, res) => {
    //console.log(req.body);
    const newRecord = new PostsModel({
        author: req.body.author,
        bid: req.body.bid,
        story: req.body.story,
        imageUrl: req.body.imageUrl,
        videoUrl: req.body.videoUrl,
    });

    newRecord.save((err, docs) => {
        if(!err)res.send(docs);
        else console.log('erreur de creation de données:'+err);
    })
});


//post video maybe -\_o_/- pour reseautage biz
/*
router.post('/video', (req, res) => {
    const newRecord = new PostsModel({
        author: req.body.author,
        story: req.body.story,
        videoUrl: req.body.videoUrl
    });

    newRecord.save((err, docs) => {
        if(!err)res.send(docs);
        else console.log('erreur de creation de données:'+err);
    })
});
*/
//
/*
router.post('/', upload.single('upload'), (req, res) => {
    console.log('son file filename !!!!!!!!!!!:');
    console.log(req.file.filename);
    const newRecord = new PostsModel({
        author: req.body.author,
        bid: req.body.bid,
        story: req.body.story,
        imageUrl: `${req.protocol}://${req.get('host')}/${req.file.filename}`,
        videoUrl: `${req.protocol}://${req.get('host')}/${req.file.filename}`
    });

    newRecord.save((err, docs) => {
        if(!err)res.send(docs);
        else console.log('erreur de creation de données:'+err);
    })
});
*/

//Pour modifier les données
router.put('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu :' + req.params.id)

    const updateRecord = {
        author: req.body.author,
        //bid
        story: req.body.story,
        imageUrl: `${req.protocol}://${req.get('host')}/${req.file.filename}`,
        videoUrl: `${req.protocol}://${req.get('host')}/${req.file.filename}`

    };

    PostsModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord},
        { new: true},
        (err, docs) => {
            if(!err)res.send(docs);
            else console.log('erreur avec notre update :' + err);
        }
    )
});

router.delete('/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnu :' + req.params.id)

    PostsModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if(!err)res.send(docs);
            else console.log('erreur de suppression des données :' + err);
        }
    )
});

module.exports = router;