import request from 'supertest';

import { app } from '../../app';

import { CreateCourseDTO, ResponseCourseDTO, UpdateCourseDTO } from '../../dto/courses';

describe('/courses', () => {
  let createdCourse1: ResponseCourseDTO;
  let createdCourse2: ResponseCourseDTO;

  it('should return 200 and empty array', async () => {
    await request(app)
      .get('/courses')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([]);
      });
  });

  it('should return 404 for not existing course', async () => {
    await request(app).get('/courses/999999999').expect(404);
  });

  it('should return 200 and create course with correct data', async () => {
    const data: CreateCourseDTO = { title: 'New Course', description: 'Course Description' };
    const response = await request(app).post('/courses').expect(201).send(data);

    createdCourse1 = response.body as ResponseCourseDTO;

    expect(createdCourse1).toEqual({
      id: expect.any(Number),
      title: data.title,
      description: data.description,
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
    });

    await request(app)
      .get(`/courses/${createdCourse1.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(createdCourse1);
      });
  });

  it('should return 200 and create one more course with correct data', async () => {
    const data: CreateCourseDTO = { title: 'New Course 2' };
    const response = await request(app).post('/courses').expect(201).send(data);

    createdCourse2 = response.body as ResponseCourseDTO;

    expect(createdCourse2).toEqual({
      id: expect.any(Number),
      title: data.title,
      description: null,
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
    });

    await request(app)
      .get(`/courses/${createdCourse2.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(createdCourse2);
      });
  });

  it(`should return 400 and shouldn't create course with invalid data`, async () => {
    const data: CreateCourseDTO = { title: '' };

    await request(app).post('/courses').expect(400).send(data);
  });

  it('should return 200 and existing course', async () => {
    await request(app)
      .get(`/courses/${createdCourse1.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(createdCourse1);
      });
  });

  it('should return 200 and update an existing course', async () => {
    const data: UpdateCourseDTO = { title: 'Updated Course', description: 'Updated Description' };
    await request(app).put(`/courses/${createdCourse1.id}`).expect(200).send(data);

    await request(app)
      .get(`/courses/${createdCourse1.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          ...createdCourse1,
          title: data.title,
          description: data.description,
        });
      });

    await request(app)
      .get(`/courses/${createdCourse2.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(createdCourse2);
      });
  });

  it('should return 404 for updating non-existing course', async () => {
    const data: UpdateCourseDTO = { title: 'Updated Course' };
    await request(app).put('/courses/999999999').expect(404).send(data);
  });

  it(`should return 400 and shouldn't update course with invalid data`, async () => {
    const data: UpdateCourseDTO = { title: '' };
    await request(app).put(`/courses/${createdCourse1.id}`).expect(400).send(data);
  });

  it('should return 204 and delete an existing course', async () => {
    await request(app).delete(`/courses/${createdCourse1.id}`).expect(204);
  });

  it(`should return 404 and shouldn't delete non-existing course`, async () => {
    await request(app).delete('/courses/999999999').expect(404);
  });
});
