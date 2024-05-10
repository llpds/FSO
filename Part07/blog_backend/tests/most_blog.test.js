const listHelper = require ('../utils/list_helper')
const listWithBlogs = require ('../data/for_tests').listWithBlogs

describe('most blog', () => {
  test('amount of blogs', () => {
    const result = listHelper.mostBlog(listWithBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})