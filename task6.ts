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

app.post("/parties", (req, res) => {
  if (!req.body.name || !req.body.leader) {
    res.status(400).json({ message: "name and leader must be included" });
    return;
  }

  const p: Party = {
    id: parties.length + 1,
    name: req.body.name,
    leader: req.body.leader,
    seats: req.body.seats,
  };
  parties.push(p);
  res.json({ message: "Party added successfully", parties: p });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
