import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

type Party = {
  id: number;
  name: string;
  leader: string;
  seats: number;
};

const parties: Party[] = [
  { id: 1, name: "Socialdemokraterna", leader: "Example Name", seats: 107 },
  { id: 2, name: "Moderaterna", leader: "Example Name", seats: 68 },
];

app.get("/parties", (req, res) => {
  res.json(parties);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
