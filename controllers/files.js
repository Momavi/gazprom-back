const fs = require('fs');
const path = require('path');

const getFiles = async (req, res) => {
  const directoryPath = path.join(__dirname, '/files');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    res.send(files);
  });
}

const getFile = async (req, res) => {
  const filePath = path.join(__dirname, req.params.folder, req.params.name);
  fs.readFile(filePath, 'utf8' , (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('An error occurred while reading the file');
    }
    res.send(data);
  });
}

module.exports = {
  getFiles,
  getFile
};