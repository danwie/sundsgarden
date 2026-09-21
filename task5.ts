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

let parties: Party[] = [
  { id: 1, name: "Socialdemokraterna", leader: "Example Name", seats: 107 },
  { id: 2, name: "Moderaterna", leader: "Example Name", seats: 68 },
];

app.delete("/parties/:id", (req, res) => {
  const pId: number = parseInt(req.params.id);
  parties = parties.filter((p) => p.id !== pId);
  res.json({ message: "Party deleted successfully" });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
