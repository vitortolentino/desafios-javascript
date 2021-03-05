/*
 * Paginação
 */

/* ENUNCIADO
 *
 *  Você deve escrever uma função de paginação de listas que receba o número da página e o número de itens por página como parâmetros
 *  e retorne no seguinte formato:
 * 
 * 
 *  {
        currentPage: 1,
        perPage: 10,
        total: 20,
        totalPages: 2,
        data: [
            {
                userId: 1,
                id: 1,
                title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                body: "quia et suscipit\nsuscipit recusandae consequuntur (...)"
            },
            [...]
        ]
    }
 */

const posts = require('./posts.json')
const cache = {}

const paginate = (collection = posts, pageNumber = 1, itemsPerPage = 10) => {
  if (typeof collection === 'string') {
    throw new Error('Expect array and got string')
  }

  const total = collection.length
  const totalPages = Math.ceil(total / itemsPerPage)
  const indexToStartSlice = (pageNumber - 1) * itemsPerPage

  const cacheKey = `posts-${pageNumber}-${itemsPerPage}`

  const cachedList = getCachedData(cacheKey)

  const data = cachedList || collection.slice(indexToStartSlice, itemsPerPage)

  if (!cachedList) {
    setCacheData(cacheKey, data)
  }

  return {
    data,
    total,
    totalPages,
    perPage: itemsPerPage,
    currentPage: pageNumber,
  }
}

const getCachedData = (key) => {
  const cachedList = cache[key]

  return cachedList
}

const setCacheData = (key, value) => (cache[key] = value)

module.exports = paginate
