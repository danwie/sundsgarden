import express, { type Request, type Response } from "express";
import * as z from "zod";

const app = express();
app.use(express.json());
const PORT = 3000;

const apiSchema = z.object({
  results: z
    .array(
      z.object({
        name: z.object({
          first: z.string().min(3, "First name is required."),
          last: z.string().min(3, "Last name is required."),
        }),
        location: z.object({
          country: z.string().min(3, "Country is too short"),
        }),
      }),
    )
    .min(1, "Api did not return a person."),
});

const userSchema = z.object({
  name: z.string().min(3, "Name is required."),
  email: z.string().email("Invalid email."),
  age: z
    .number()
    .int("Age must be an integer.")
    .min(18, "Age is to low")
    .max(100, "Age is to high")
    .default(18),
});

app.get("/ping", (req: Request, res: Response): void => {
  res.json({ message: "pong" });
});

app.get(
  "/random-person",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const api = await fetch("https://randomuser.me/api/");
      const data = await api.json();
      const result = apiSchema.safeParse(data);

      if (!result.success) {
        res.status(500).json({ error: z.prettifyError(result.error) });
        return;
      }

      // ! means that TypeScript should trust me as I have already used min(1)
      const person = result.data.results[0]!;
      res.json({
        name: `${person.name.first} ${person.name.last}`,
        country: person.location.country,
      });
    } catch (error) {
      res.status(500).json({ error: "API is not working" });
    }
  },
);

app.post("/users", (req: Request, res: Response): void => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: z.prettifyError(result.error) });
    return;
  }

  res.status(201).json({
    message: "User created",
    user: result.data,
  });
});

app.listen(PORT, (): void => {
  console.log(`Server running at http://localhost:${PORT}`);
});
