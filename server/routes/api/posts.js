const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async  (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

 
async function loadPostsCollection(){
    const  client = await mongodb.MongoClient.connect ( 'mongodb+srv://amber:Password1!@cluster0-r49za.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
});

    return client.db('Cluster0').collection('posts');
}


router.post('/', async (req, res) =>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date(),
        });
            res.status(201).send();
});

router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});



module.exports = router;