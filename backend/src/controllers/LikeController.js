const Post = require('../models/Post');

module.exports = {
    async store(req, res){
      
        //Inform the image by your id.
        const post = await Post.findById(req.params.id);
  
        //Sum +1
        post.likes += 1;

        //Save the "like"
        await post.save();

        //Send an information in real time
        req.io.emit('like', post);

          return res.json({post});
     }
}