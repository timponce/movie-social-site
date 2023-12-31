import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import colors from "colors";
import "dotenv/config";
import errorHandler from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import interactionRoutes from "./routes/interactionRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const port = process.env.PORT || 5001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/interactions", interactionRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/users", userRoutes);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("*", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
