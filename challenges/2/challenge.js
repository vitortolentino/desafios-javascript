/*
 * Normalização de estruturas
 */

/* ENUNCIADO
 *
 * Você deve escrever uma função que realize a
 * normalização da estrutura representada pela variável input de
 * forma que o retorno seja compatível com a variável output
 *
 */

/*
 * [INPUT] Object
 * {
 *   "id": "6197b77e-3942-11ea-a137-2e728ce88125",
 *   "user": {
 *     "id": "6197ba94",
 *     "name": "Laura"
 *   },
 *   "reports": [
 *     {
 *       "id": "51ddf1a9",
 *       "result": {
 *         "document": "356.4325-10",
 *         "status": "em análise",
 *       }
 *     }
 *   ]
 * }
 *
 * [OUTPUT] Object
 *  {
 *   "results": {
 *     "6197b77e-3942-11ea-a137-2e728ce88125": {
 *       id: "6197b77e-3942-11ea-a137-2e728ce88125",
 *       user: "6197ba94",
 *       reports: ["51ddf1a9"]
 *     }
 *   },
 *   "users": {
 *     "6197ba94": { "id": "6197ba94", "name": "Laura" }
 *   },
 *   "reports": {
 *     "51ddf1a9": {
 *        "id": "51ddf1a9",
 *        "user": "6197ba94",
 *        "document": "356.4325-10",
 *        "status": "em análise",
 *      }
 *    }
 *  }
 */

const normalizeData = (unormalized) => {
  const reports = normalizeReports(unormalized.reports, unormalized.user.id)

  const normalized = {
    reports,
    users: normalizeUsers(unormalized.user),
    results: normalizeResults(unormalized.id, unormalized.user.id, reports),
  }

  return normalized
}

const normalizeUsers = ({ id, name }) => ({
  [id]: {
    id,
    name,
  },
})

const normalizeReports = (reports, userId) => {
  return reports.reduce((normalizedReports, { id, result }) => {
    normalizedReports[id] = {
      id,
      user: userId,
      status: result.status,
      document: result.document,
    }

    return normalizedReports
  }, {})
}

const normalizeResults = (id, userId, reports) => {
  const reportsIdList = Object.keys(reports)

  return {
    [id]: {
      id,
      user: userId,
      reports: reportsIdList,
    },
  }
}

module.exports = normalizeData
