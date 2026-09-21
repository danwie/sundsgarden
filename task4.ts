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

app.put("/parties/:id", (req, res) => {
  const pId: number = parseInt(req.params.id);
  const p = parties.find((p) => p.id === pId);
  if (!p) {
    res.status(404).json({ message: "party not found" });
    return;
  }
  p.name = req.body.name || p.name;
  p.leader = req.body.leader || p.leader;
  p.seats = req.body.seats || p.seats;
  res.json({ message: "Party updated successfully", p });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
