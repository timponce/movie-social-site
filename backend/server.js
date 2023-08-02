import express from "express";
import colors from "colors";
import "dotenv/config";
import errorHandler from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import interactionRoutes from "./routes/interactionRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import userRoutes from "./routes/userRoutes.js";
const port = process.env.PORT || 5001;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/interactions", interactionRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
