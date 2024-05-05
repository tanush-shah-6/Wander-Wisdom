const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8800;
const MONGODB_URI = 'mongodb://localhost:27017/Database';

app.use(cors({
    origin: 'http://127.0.0.1:3000'
  }));
// Connect to MongoDB
(async () => {
  try {
    const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    const db = client.db('Database'); // Specify the name of your database

    // Define route to handle filtered places request
    app.get('/api/places', async (req, res) => {
      try {
        // Extract filter parameters from query string
        const { purpose, location, duration, budget } = req.query;

        // Construct MongoDB query based on filter parameters
        const query = {
          purpose: purpose,
          location: location,
          duration: { $lte: parseInt(duration) }, // Less than or equal to duration
          budget: { $lte: parseInt(budget) } // Less than or equal to budget
        };

        // Query the database with constructed query
        const result = await db.collection('Filter').find(query).toArray();
        
        console.log("Search results:", result);
        
        // Return filtered places data as JSON response
        res.json(result);
      } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
})();
