const listHelper = require ('../utils/list_helper')
const listWithBlogs = require ('../data/for_tests').listWithBlogs

describe('most likes', () => {
  test('favorite author by likes', () => {
    const result = listHelper.mostLikes(listWithBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})