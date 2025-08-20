import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

export const app = express();
app.use(express.json());
app.use(cors());

export const db = {
  courses: [
    { id: 1, title: 'Front-end' },
    { id: 2, title: 'Back-end' },
    { id: 3, title: 'DevOps' },
    { id: 4, title: 'Automation Q/A' },
  ],
};

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is alive!!' });
});

app.get('/courses', (req: Request, res: Response) => {
  let foundCourses = db.courses;

  if (req.query.title) {
    foundCourses = foundCourses.filter((c) =>
      c.title.toLowerCase().includes((req.query.title as string).toLowerCase())
    );
  }
  res.json(foundCourses);
});

app.get('/courses/:id', (req: Request, res: Response) => {
  const foundCourse = db.courses.find((course) => course.id === +req.params.id);

  if (!foundCourse) {
    res.sendStatus(404);
    return;
  }

  res.json(foundCourse);
});

app.post('/courses', (req: Request, res: Response) => {
  if (!req.body.title) {
    res.sendStatus(400);
    return;
  }

  const newCourse = {
    id: +new Date(),
    title: req.body.title,
  };
  db.courses.push(newCourse);
  res.status(201).json(newCourse);
});

app.delete('/courses/:id', (req: Request, res: Response) => {
  const courseIndex = db.courses.findIndex(
    (course) => course.id === +req.params.id
  );

  if (courseIndex === -1) {
    res.sendStatus(404);
    return;
  }

  db.courses.splice(courseIndex, 1);
  res.sendStatus(204);
});

app.put('/courses/:id', (req: Request, res: Response) => {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }

  const courseIndex = db.courses.findIndex(
    (course) => course.id === +req.params.id
  );

  if (courseIndex === -1) {
    res.sendStatus(404);
    return;
  }

  if (!req.body.title) {
    res.sendStatus(400);
    return;
  }

  db.courses[courseIndex].title = req.body.title;
  res.sendStatus(204);
});

app.delete('/__test__/data', (req: Request, res: Response) => {
  db.courses = [];
  res.sendStatus(204);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
