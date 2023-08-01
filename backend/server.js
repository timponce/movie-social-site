import express from "express";
import "dotenv/config";
import errorHandler from "./middleware/errorMiddleware.js";
import filmRoutes from "./routes/filmRoutes.js";
const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", filmRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
