import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure base upload directories exist
const uploadDirs = [
  path.join(__dirname, '..', 'uploads'),
  path.join(__dirname, '..', 'uploads', 'profiles'),
  path.join(__dirname, '..', 'uploads', 'projects'),
  path.join(__dirname, '..', 'uploads', 'documents'),
  path.join(__dirname, '..', 'uploads', 'resumes'),
];

uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'photo' || file.fieldname === 'profilePhoto') {
      if (req.baseUrl.includes('projects')) {
        cb(null, path.join(__dirname, '..', 'uploads', 'projects'));
      } else {
        cb(null, path.join(__dirname, '..', 'uploads', 'profiles'));
      }
    } else if (file.fieldname === 'resume') {
      cb(null, path.join(__dirname, '..', 'uploads', 'resumes'));
    } else if (file.fieldname === 'documents' || file.fieldname === 'document') {
      cb(null, path.join(__dirname, '..', 'uploads', 'documents'));
    } else {
      cb(null, path.join(__dirname, '..', 'uploads'));
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9]/g, '_')
      .slice(0, 30);
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e6)}`;
    cb(null, `${cleanName}_${uniqueSuffix}${ext}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (file.fieldname === 'resume' || file.fieldname === 'documents' || file.fieldname === 'document') {
    if (ext === '.pdf') {
      return cb(null, true);
    }
    return cb(new Error('Only PDF documents are allowed for this upload'));
  }

  if (file.fieldname === 'photo' || file.fieldname === 'profilePhoto') {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
    if (allowed.includes(ext)) {
      return cb(null, true);
    }
    return cb(new Error('Only JPG, JPEG, PNG, and WEBP image formats are supported'));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter,
});

export const uploadProfilePhoto = upload.single('photo');
export const uploadResume = upload.single('resume');
export const uploadProjectFiles = upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'documents', maxCount: 5 },
]);

export default upload;
