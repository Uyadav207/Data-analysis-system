// Import necessary modules
const express = require('express');
const multer = require('multer');
// const csvParser = require('csv-parser');
const fastcsv = require('fast-csv');
const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');
var cors = require('cors');

// Create Express app
const app = express();
app.use(cors());
const PORT = process.env.PORT

// Middleware for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize('mydatabase', user, password, {
  host: 'localhost',
  dialect: 'postgres',
});

// Define File model
const File = sequelize.define('File', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

// Sync model with database
sequelize.sync();

const CHUNK_SIZE = 2 * 1024 * 1024;

// Endpoint for uploading CSV files
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = file.path;
  const data = [];

  try {
    const fileStream = fs.createReadStream(filePath, { highWaterMark: CHUNK_SIZE });
    fastcsv.parseStream(fileStream, {headers: true, encoding: 'utf8'})
      .on('data', (row) => {
        console.log(row);
        data.push(row);
      })
      .on('end', async () => {
        try {
          const newFile = await File.create({ filename: file.originalname, data: JSON.stringify(data), filePath: file.path });
          res.json(newFile);
        } catch (error) {
          console.error('Error saving file to database:', error);
          res.status(500).send('Error saving file to database');
        }
      });
  } catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).send('Error reading CSV file');
  }
});

app.get('/files', async (req, res) => {
  try {
    const files = await File.findAll();
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).send('Error fetching files');
  }
});

// Endpoint to get file data by ID
app.get('/files/:id', async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await File.findByPk(fileId);
    if (!file) {
      return res.status(404).send('File not found.');
    }
    res.json(file);
  } catch (error) {
    console.error('Error fetching file data:', error);
    res.status(500).send('Error fetching file data.');
  }
});


app.get('/files', async (req, res) => {
  try {
    const files = await File.findAll();
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).send('Error fetching files.');
  }
});


// Endpoint to delete file by ID
app.delete('/files/:id', async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await File.findByPk(fileId);
    if (!file) {
      return res.status(404).send('File not found.');
    }

    const filePath = file.filePath;
    fs.unlinkSync(filePath);
    console.log(`File deleted from filesystem: ${filePath}`);

    // Delete file from the database
    await file.destroy();
    console.log(`File deleted from database: ${file.filename}`);

    res.send('File deleted successfully.');
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).send('Error deleting file.');
  }
});

// Endpoint to delete all files from the database
app.delete('/files', async (req, res) => {
  try {
    await File.destroy({ where: {} });
    console.log('All files deleted from the database.');

    // Check if uploads folder is empty
    const filesInUploads = fs.readdirSync('uploads');
    if (filesInUploads.length === 0) {
      fs.rmdirSync('uploads');
      console.log('Uploads folder deleted as it became empty.');
    }

    res.send('All files deleted successfully.');
  } catch (error) {
    console.error('Error deleting files:', error);
    res.status(500).send('Error deleting files.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
