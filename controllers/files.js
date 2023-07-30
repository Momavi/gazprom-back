const { readFile, readdir, statSync } = require('fs');
const path = require('path');

const HomeFolder = async (req, res) => {
  const directoryPath = path.join(__dirname, '/files');
  readdir(directoryPath, (err, files) => {
    if ( err ) {
      return res.status(400).json({ message: 'Failed to read directory' });
    }

    let filesWithType = files.map((file) => {
      const stat = statSync(path.join(directoryPath, file));
      return {
        name: file,
        type: stat.isDirectory() ? 'directory' : 'file',
      };
    });

    filesWithType = filesWithType.sort((a, b) => {
      if ( a.type === 'directory' && b.type !== 'directory' ) {
        return -1;
      } else if ( b.type === 'directory' && a.type !== 'directory' ) {
        return 1;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    res.send(filesWithType);
  });
};

const getFolder = async (req, res) => {
  console.log(req.params.folder);
  const directoryPath = path.join(__dirname, `/files/${ req.params.folder }`);
  readdir(directoryPath, (err, files) => {
    if ( err ) {
      return res.status(400).json({ message: 'Failed to read directory' });
    }

    const filesWithType = files.map((file) => {
      const stat = statSync(path.join(directoryPath, file));
      return {
        name: file,
        type: stat.isDirectory() ? 'directory' : 'file',
      };
    });

    res.send(filesWithType);
  });
};

const getFile = async (req, res) => {
  const filePath = path.join(__dirname, '/files', req.params.name);
  readFile(filePath, 'utf8', (err, data) => {
    if ( err ) {
      console.log(err);
      return res.status(500).send('An error occurred while reading the file');
    }
    let dataToSend = data.split('\n');
    res.send(dataToSend);
  });
};

const getFileInFolder = async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.body.pathToFile);
    readFile(filePath, 'utf8', (err, data) => {
      if ( err ) {
        console.log(err);
        return res.status(500).send(err);
      }
      let dataToSend = data.split('\n');
      res.send(dataToSend);
    });
  } catch ( error ) {
    if ( req.body.pathToFile ) res.status(500).send('Не указан путь');

    res.status(500).send(`Внутренняя ошибка: ${ error }`);
  }
};

module.exports = {
  HomeFolder,
  getFolder,
  getFile,
  getFileInFolder,
};