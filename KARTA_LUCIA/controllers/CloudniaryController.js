const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dv2w3pig9",
  api_key: "735269986953769",
  api_secret: "vBoLf-XGl0S74bRuR_Ab6kLpADA"
});

const uploadImageCloud = (req, res, next) => {
  console.log("hello")
  if (!req.files || !req.files.photo || req.files.photo.length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const files = req.files.photo; 
  const uploadPromises = [];
  const imagesToUpload = files.length > 12 ? files.slice(0, 12) : files;
  imagesToUpload.forEach(file => {
    const uploadPromise = new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file.tempFilePath, { format: 'jpg' }, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.url);
      });
    });
    uploadPromises.push(uploadPromise);
  });
  Promise.all(uploadPromises)
    .then(urls => {
      res.send(urls); 
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = { uploadImageCloud };
