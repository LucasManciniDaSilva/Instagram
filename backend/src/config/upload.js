const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        //Inform the path that the images will be saved
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, cb ){
            //Save the image on the path.
            cb(null, file.originalname);
        }

    })
}