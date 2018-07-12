import { Blog } from '.'

let blog

beforeEach(async () => {
  blog = await Blog.create({ user: 'test', entry: 'test', createdAt: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = blog.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(blog.id)
    expect(view.user).toBe(blog.user)
    expect(view.entry).toBe(blog.entry)
    expect(view.createdAt).toBe(blog.createdAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = blog.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(blog.id)
    expect(view.user).toBe(blog.user)
    expect(view.entry).toBe(blog.entry)
    expect(view.createdAt).toBe(blog.createdAt)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
