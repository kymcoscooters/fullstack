const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const likes = blogs.map(blog => blog.likes)
  const amount = likes.reduce((acc, curr) => acc + curr)
  return amount
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return []
  }

  let mostLikes = blogs[0]

  blogs.forEach((blog) => {
    if (blog.likes > mostLikes.likes) {
      mostLikes = blog
    }
  })

  return ({
    title: mostLikes.title,
    author: mostLikes.author,
    likes: mostLikes.likes
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}