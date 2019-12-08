var express = require("express");
var router = express.Router();

const { multerUploads, dataUri } = require("./config/multer");
const { uploader, cloudinaryConfig } = require("./config/cloudinary");

router.post("/", cloudinaryConfig, multerUploads, (req, res, next) => {
  if (req.file) {
    console.log("starting uploading");
    const file = dataUri(req).content;
    return uploader
      .upload(file)
      .then(result => {
        const image = result.url;
        return res.status(200).json({
          image
        });
      })
      .catch(err =>
        res.status(400).json({
          messge: "someting went wrong while processing your request",
          data: {
            err
          }
        })
      );
  } else {
    console.log("no file found");
  }
});

module.exports = router;
