'use strict'

var express = require('express');
var router = express.Router();
const multer = require('multer');
// Luu vo o cung
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads') 
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) 
      cb(null, filename + '-' + file.originalname )
    }
  })
// Luu vo ram
var memory = multer.memoryStorage();
const upload = multer({ storage: memory });

const libre = require('libreoffice-convert');
const path = require('path');
libre.convertAsync = require('util').promisify(libre.convert);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/',  upload.single('document'), async function(req, res, next) {
    const file = req.file;
    if (!file) {
        const error = new Error('Upload file again!');
        error.httpStatusCode = 400;
        return next(error);
      }
    const originalExt = path.extname(file.originalname);
    const destinationExt = '.pdf';
    let originalName = file.originalname.substring(0, file.originalname.length - originalExt.length);
    let pdfBuf = await libre.convertAsync(file.buffer, destinationExt, undefined);
    res.setHeader('status', 200);
    res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-disposition', 'inline; filename="' + originalName + destinationExt + '"');
    res.send(pdfBuf);
});


router.post('/option1',  upload.single('document'), async function(req, res, next) {
    const file = req.file;
    if (!file) {
        const error = new Error('Upload file again!');
        error.httpStatusCode = 400;
        return next(error);
      }
    const originalExt = path.extname(file.originalname);
    const destinationExt = '.pdf';
    let originalName = file.originalname.substring(0, file.originalname.length - originalExt.length);
    
    let pdfBuf = await libre.convertAsync(file.buffer, destinationExt, undefined);
    res.setHeader('status', 200);
    res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-disposition', 'inline; filename="' + originalName + destinationExt + '"');
    res.send(pdfBuf);
});


router.post('/option2',  upload.single('document'), async function(req, res, next) {
    const file = req.file;
    if (!file) {
        const error = new Error('Upload file again!');
        error.httpStatusCode = 400;
        return next(error);
      }
    const originalExt = path.extname(file.originalname);
    const destinationExt = '.pdf';
    let originalName = file.originalname.substring(0, file.originalname.length - originalExt.length);
    
    let pdfBuf = await libre.convertAsync(file.buffer, destinationExt, undefined);
    res.setHeader('status', 200);
    // res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-disposition', 'inline; filename="' + originalName + destinationExt + '"');
    res.send(pdfBuf);
});

module.exports = router;
