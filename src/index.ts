import express from 'express';
import { AppDataSource } from './database/db';

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connection established");
    
    const app = express();
    app.use(express.json());

    app.get('/', (req, res) => {
      return res.json('Established connection!');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err);
});