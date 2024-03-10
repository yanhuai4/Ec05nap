// index.js

// Import necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const barcodeScanner = require('barcode-scanner'); // Hypothetical barcode scanning library
const ecoDataFetcher = require('./ecoDataFetcher'); // A module to fetch eco data

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

// Endpoint to receive a photo and return product eco data
app.post('/scan', async (req, res) => {
  try {
    // Assume that the image is sent in the request body as a base64 encoded string
    const { imageBase64 } = req.body;

    // Scan the barcode from the image
    const barcode = await barcodeScanner.scan(imageBase64);

    // Fetch the eco data using the barcode
    const ecoData = await ecoDataFetcher.getEcoData(barcode);

    // Respond with the eco data
    res.status(200).json({
      success: true,
      data: ecoData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while scanning the product.',
      error: error.message
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`EcoSnap server running on port ${PORT}`);
});

module.exports = app;