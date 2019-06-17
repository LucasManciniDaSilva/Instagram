const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
      async index(req, res){
           //Return all the post ordered by the time was created
           const post = await Post.find().sort('-createdAt');

          //return in the json format
           return res.json(post);

      },

      async store(req, res){
         //receiving all the datas of the archive and the others datas of the post
         const{ author, place, description, hashtags } = req.body;
         const{ filename: image} = req.file;
        
         //Change the format of the image to jpg
         const [name] = image.split('.')
         const fileName = `${name}.jpg`
       
         //Resize the image
         await sharp (req.file.path)
         .resize(500)
         .jpeg({quality: 70})
         .toFile(
              path.resolve(req.file.destination, 'resized', fileName)
         )

         //delete the old image.
          fs.unlinkSync(req.file.path)

         //Save all the informations on DB
         const post = await Post.create({
              author,
              place,
              description,
              hashtags,
              image: fileName,
         });

         //Send an information in real time
         req.io.emit('post', post);
   
          //return in the json format
          return res.json({post});
     }
}