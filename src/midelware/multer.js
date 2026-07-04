import multer from "multer"; 
 
export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png',  "image/webp"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Будь ласка, завантажте зображення у форматі JPEG, JPG, PNG або WEBP.'), false)
        }
    },
});