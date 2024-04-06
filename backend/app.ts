import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

const app = express();
const port = "8000";
dotenv.config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MONGODBUSERNAME}:${process.env.MONGODBSECRET}@cluster0.4dfgnks.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from server!" });
});

app.get("/characters", async (req: Request, res: Response) => {
  try {
    const database = client.db("dnd_character_sheet");
    const charactersCollection = database.collection("characters");
    const charactersQuery = await charactersCollection.find({}).toArray();

    if (charactersQuery.length) {
      res.send(charactersQuery);
    } else {
      res.send({ data: "No characters found" });
    }
  } catch (error: any) {
    console.error(`Error: ${error}`);
    res.send({ error: error.message });
  }
});

interface CharacterRequest extends Request {
  body: {
    name: string;
    playerName: string;
  };
}

app.post("/character", async (req: CharacterRequest, res: Response) => {
  try {
    const database = client.db("dnd_character_sheet");
    const charactersCollection = database.collection("characters");

    const character = {
      name: req.body.name,
      playerName: req.body.playerName,
    };
    const insertResult = await charactersCollection.insertOne(character);

    console.log(
      `A character was inserted with the _id: ${insertResult.insertedId}`
    );
    res.statusCode = 200;
    res.end();
  } catch (error: any) {
    console.error(`Error: ${error}`);
    res.send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
