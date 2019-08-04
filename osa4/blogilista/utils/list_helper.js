const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => {
        return sum + item.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) { return {} }
    let favorite = blogs[0]
    blogs.forEach((blog) => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) { return {} }
    let authors = {}
    blogs.forEach((blog) => {
        blog.author in authors
            ? authors[blog.author] += 1
            : authors[blog.author] = 1
    })
    const keyWithHighest = Object.keys(authors).reduce((a, b) => (authors[a] > authors[b] ? a : b))
    return {
        author: keyWithHighest,
        blogs: authors[keyWithHighest]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) { return {} }
    let authors = {}
    blogs.forEach((blog) => {
        blog.author in authors
            ? authors[blog.author] += blog.likes
            : authors[blog.author] = blog.likes
    })
    const keyWithHighest = Object.keys(authors).reduce((a, b) => (authors[a] > authors[b] ? a : b))
    return{
        author: keyWithHighest,
        likes: authors[keyWithHighest]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}