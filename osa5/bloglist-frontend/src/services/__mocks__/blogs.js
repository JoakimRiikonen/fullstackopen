const blogs = [
  {
    id: '123123123123',
    author: 'M. Auther',
    likes: 0,
    title: 'First blog that ever was',
    url: 'http://www.genesis.com',
    user: {
      id: '1234512345',
      name: 'Aurthur the First',
      username: 'admin1'
    }
  },
  {
    id: '234234234',
    author: 'S. B. Guy',
    likes: 7,
    title: 'Dustloop',
    url: 'https://keeponrock.in',
    user: {
      id: '1234512345',
      name: 'Aurthur the First',
      username: 'admin1'
    }
  },
  {
    id: '345345345',
    author: 'Unknown Author',
    likes: 5,
    title: 'Where am I',
    url: 'What site is this?',
    user: {
      id: '1212121212',
      name: 'Bob?',
      username: 'bob67'
    }
  }
]

const setToken = () => {
  //This is just here because app calls setToken at one point
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }