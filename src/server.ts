import { createApp } from "./app";
import { connectDB, closeDB } from "./config/database.config";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    // connect to database
    await connectDB();

    // create app
    const app = createApp();

    // start server
    const server = app.listen(PORT, () => {
      console.log("Server running on port: ", PORT);
    });
    // shutdown
    const shutdown = async (signal: string): Promise<void> => {
      console.log(`\n${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        console.log("✅ HTTP server closed");

        try {
          await closeDB();
          console.log("✅ Graceful shutdown completed");
          process.exit(0);
        } catch (error) {
          console.error("❌ Error during shutdown:", error);
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error("❌ Forcing shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
