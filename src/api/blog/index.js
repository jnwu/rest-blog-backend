import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, destroy } from './controller'
import { schema } from './model'
export Blog, { schema } from './model'

const router = new Router()
const { user, entry, createdAt } = schema.tree

/**
 * @api {post} /blogs Create blog
 * @apiName CreateBlog
 * @apiGroup Blog
 * @apiParam user Blog's user.
 * @apiParam entry Blog's entry.
 * @apiParam createdAt Blog's createdAt.
 * @apiSuccess {Object} blog Blog's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Blog not found.
 */
router.post('/',
  body({ user, entry, createdAt }),
  create)

/**
 * @api {get} /blogs Retrieve blogs
 * @apiName RetrieveBlogs
 * @apiGroup Blog
 * @apiUse listParams
 * @apiSuccess {Object[]} blogs List of blogs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /blogs/:id Retrieve blog
 * @apiName RetrieveBlog
 * @apiGroup Blog
 * @apiSuccess {Object} blog Blog's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Blog not found.
 */
router.get('/:id',
  show)

/**
 * @api {delete} /blogs/:id Delete blog
 * @apiName DeleteBlog
 * @apiGroup Blog
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Blog not found.
 */
router.delete('/:id',
  destroy)

export default router
