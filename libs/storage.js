const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        fs.mkdir('./uploads', function (err) {
            callback(null, './uploads');
        })
    },
    filename: (req, file, callback) => {
        const { fieldname, mimetype } = file
        callback(null, `${fieldname}-${Date.now()}.${mimetype.split("/")[1]}`);
    }
});

const upload = multer({ storage })

module.exports = upload