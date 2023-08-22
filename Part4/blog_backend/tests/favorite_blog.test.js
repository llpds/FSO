const listHelper = require ('../utils/list_helper')
const listWithBlogs = require ('../data/for_tests').listWithBlogs

describe('favorite blog', () => {

  test('favorite blog by likes', () => {
    const result = listHelper.favoriteBlog(listWithBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})