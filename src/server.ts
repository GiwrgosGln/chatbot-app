import dotenv from "dotenv";
import { createApp } from "./app";
import { connectDB } from "./config/database.config";

dotenv.config();

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Create Express app
    const app = createApp();
    const port = process.env.PORT || 3000;

    // Start server
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
