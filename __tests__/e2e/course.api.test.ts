import request from 'supertest';

import { app } from '../../src/index';

describe('/courses', () => {
  beforeAll(async () => {
    await request(app).delete('/__test__/data');
  });

  let createdCourse1: any = null;
  let createdCourse2: any = null;

  it('should return 200 and empty array', async () => {
    await request(app)
      .get('/courses')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([]);
      });
  });

  it('shoud return 404 for not existing course', async () => {
    await request(app).get('/courses/-1').expect(404);
  });

  it('should create course with correct data', async () => {
    const response = await request(app)
      .post('/courses')
      .send({ title: 'New Course' })
      .expect(201);

    createdCourse1 = response.body;

    expect(createdCourse1).toEqual({
      id: expect.any(Number),
      title: 'New Course',
    });

    await request(app)
      .get(`/courses/${createdCourse1.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(createdCourse1);
      });
  });

  it('should create one more course with correct data', async () => {
    const response = await request(app)
      .post('/courses')
      .send({ title: 'New Course 2' })
      .expect(201);

    createdCourse2 = response.body;

    expect(createdCourse2).toEqual({
      id: expect.any(Number),
      title: 'New Course 2',
    });

    await request(app)
      .get(`/courses/${createdCourse2.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(createdCourse2);
      });
  });

  it(`shouldn't create course with invalid data`, async () => {
    await request(app).post('/courses').send({ title: '' }).expect(400);
  });

  it('should return 200 and existing course', async () => {
    await request(app)
      .get(`/courses/${createdCourse1.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(createdCourse1);
      });
  });

  it('should update an existing course', async () => {
    await request(app)
      .put(`/courses/${createdCourse1.id}`)
      .send({ title: 'Updated Course' })
      .expect(204);

    await request(app)
      .get(`/courses/${createdCourse1.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          ...createdCourse1,
          title: 'Updated Course',
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
    await request(app)
      .put('/courses/-1')
      .send({ title: 'Updated Course' })
      .expect(404);
  });

  it(`shouldn't update course with invalid data`, async () => {
    await request(app)
      .put(`/courses/${createdCourse1.id}`)
      .send({ title: '' })
      .expect(400);
  });

  it('should delete an existing course', async () => {
    await request(app).delete(`/courses/${createdCourse1.id}`).expect(204);
  });

  it(`shouldn't delete non-existing course`, async () => {
    await request(app).delete('/courses/-1').expect(404);
  });
});
