import http from 'http';
import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 
console.log(__dirname);

// Definiere den Pfad zum statischen Ordner mit der index.html und allen anderen benötigten Dateien
const staticPath = path.join(__dirname, 'src');

// Middleware-Funktion, die die MIME-Typen überprüft und richtig zuordnet
const getMimeType = (filePath) => {
  const ext = path.extname(filePath);
  console.log(filePath);
  console.log(ext);
  switch (ext) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    case '.png':
      return 'image/png';
    case '.jpg':
      return 'image/jpg';
    case '.gif':
      return 'image/gif';
    case '.wav':
      return 'audio/wav';
    case '.mp3':
      return 'audio/mpeg';
    case '.svg':
      return 'image/svg+xml';
    case '.pdf':
      return 'application/pdf';
    case '.doc':
      return 'application/msword';
    default:
      return 'application/octet-stream';
  }
};

// Stelle sicher, dass die statischen Dateien im Ordner "public" verfügbar sind
app.use(express.static(staticPath, {
  setHeaders: (res, filePath) => {
    const mimeType = getMimeType(filePath);
    console.log(mimeType);
    res.setHeader('Content-Type', mimeType);
  }
}));

// Falls der Benutzer eine andere Route aufruft, gebe ihm die index.html-Datei
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, 'node_modules/web-ifc-three/IFCLoader.js')
  const mimeType = 'text/javascript';
  res.setHeader('Content-Type', mimeType);
  res.sendFile(filePath);
});

// Starte den Server auf dem Port 3000
app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
