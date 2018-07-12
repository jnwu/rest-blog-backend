import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Blog } from '.'

const app = () => express(apiRoot, routes)

let blog

beforeEach(async () => {
  blog = await Blog.create({})
})

test('POST /blogs 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ user: 'test', entry: 'test', createdAt: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.user).toEqual('test')
  expect(body.entry).toEqual('test')
  expect(body.createdAt).toEqual('test')
})

test('GET /blogs 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /blogs/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${blog.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(blog.id)
})

test('GET /blogs/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('DELETE /blogs/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${blog.id}`)
  expect(status).toBe(204)
})

test('DELETE /blogs/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
