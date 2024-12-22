const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');

cloudinary.config({
  cloud_name: "dv2w3pig9",
  api_key: "735269986953769",
  api_secret: "vBoLf-XGl0S74bRuR_Ab6kLpADA"
});

// Configure multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmp/uploads/'); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

// Initialize multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 12 // Maximum 12 files at once
  }
});

// Upload handler function
// Helper function to handle single file upload with retries
async function uploadFileWithRetry(file, maxRetries = 3, retryDelay = 1000) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} of ${maxRetries} for uploading ${file.originalname}`);

      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: 'auto',
        folder: 'portfolio',
        public_id: path.parse(file.originalname).name,
        overwrite: true
      });

      console.log(`Successfully uploaded ${file.originalname} to Cloudinary on attempt ${attempt}`);
      return result.secure_url;

    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt} failed for ${file.originalname}:`, error.message);

      if (attempt < maxRetries) {
        // Wait before retrying
        console.log(`Waiting ${retryDelay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        // Increase delay for next attempt (exponential backoff)
        retryDelay *= 2;
      }
    }
  }

  // If we get here, all attempts failed
  throw new Error(`Failed to upload ${file.originalname} after ${maxRetries} attempts. Last error: ${lastError.message}`);
}

const uploadImageCloud = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadPromises = req.files.map(async (file) => {
      try {
        // Try to upload with retry logic
        const url = await uploadFileWithRetry(file);

        // Clean up local file after successful upload
        await fs.unlink(file.path);
        return url;

      } catch (error) {
        console.error(`Final error uploading ${file.originalname}:`, error);
        // Clean up local file on error
        await fs.unlink(file.path).catch(console.error);
        throw error;
      }
    });

    const results = await Promise.allSettled(uploadPromises);

    // Filter successful uploads and collect errors
    const urls = [];
    const errors = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        urls.push(result.value);
      } else {
        errors.push({
          file: req.files[index].originalname,
          error: result.reason
        });
      }
    });

    console.log('Upload process completed.');
    console.log('Successful uploads:', urls);
    if (errors.length > 0) {
      console.log('Failed uploads:', errors);
    }

    // Return both successful and failed uploads
    return res.json({
      successful: urls,
      failed: errors,
      total: req.files.length,
      successful_count: urls.length,
      failed_count: errors.length
    });

  } catch (error) {
    console.error('Upload process failed:', error);
    return res.status(500).json({
      error: 'Upload failed',
      message: error.message
    });
  }
};
module.exports = { upload, uploadImageCloud };

