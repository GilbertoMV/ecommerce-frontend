const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();

// Sirve los archivos estáticos de la carpeta dist
app.use(serveStatic(path.join(__dirname, 'dist')));

// Manejar SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 8080; // El puerto predeterminado es 80, pero Railway configurará `PORT` automáticamente
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
