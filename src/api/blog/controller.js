import { success, notFound } from '../../services/response/'
import { Blog } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Blog.create(body)
    .then((blog) => blog.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Blog.find(query, select, cursor)
    .then((blogs) => blogs.map((blog) => blog.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Blog.findById(params.id)
    .then(notFound(res))
    .then((blog) => blog ? blog.view() : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Blog.findById(params.id)
    .then(notFound(res))
    .then((blog) => blog ? blog.remove() : null)
    .then(success(res, 204))
    .catch(next)
