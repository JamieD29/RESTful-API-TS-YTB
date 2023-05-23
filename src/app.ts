import { json, urlencoded } from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import connection from "./db/config";
import videoRoute from './routes/videos.route';
import cors from 'cors';
const app = express();

const port = 3002;

app.use(json());

app.use(
  cors({
    credentials: true,
  })
);

app.use(urlencoded({ extended: true }));

app.use("/videos", videoRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

connection.sync()
.then(()=>{
    console.log("Database synced successfully");
})
.catch(err => console.log(err));

app.listen(port, () => console.log(`localhost:${port}`));
