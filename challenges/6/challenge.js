/*
 * Soma Combinacional
 */
/* ENUNCIADO
 * Dado um conjunto de dados e um número alvo, você deve encontrar todas as combinações exclusivas
 * entre valores do conjunto que resultem na soma do número alvo.
 *
 * Observações:
 *
 * Todos os números, inclusive o alvo, serão inteiros positivos
 * O resultado não deve obter combinações com valores repetidos. Exemplo:
 *
 *  combinate([2, 3, 5], 8) retornando
 *
 *  [
 *       [2,2,2,2],
 *       [2,3,3],
 *       [3,2,3],
 *       [3,3,2]
 *       [3,5]
 *       [5,3]
 *   ]
 *
 * Os valores do conjunto de dados podem se repetir entre si, como por exemplo:
 *
 * combinate([2, 3, 5], 8) retornando [2,2,2,2] e [2,3,3] como conjuntos que resultam na soma alvo.
 *
 *
 * Seguem mais alguns exemplos do retorno esperado:
 *
 *  combinate([2, 3, 5], 8) deve retornar
 *
 *  [
 *       [2,2,2,2],
 *       [2,3,3],
 *       [3,5]
 *   ]
 *
 *    outro exemplo:
 *
 *    combinate([2, 3, 6, 7], 7) retorna
 *
 *    [
 *       [2, 2, 3],
 *       [7]
 *    ]
 */

const combinate = (set, target) => {
  const result = []
  if (!set || set.length === 0) return result

  const current = []
  findValuesAndPrepareResult(set, target, 0, current, result)
  return result
}

const findValuesAndPrepareResult = function (set, target, position, current, result) {
  if (target === 0) {
    const temp = [...current]
    result.push(temp)
    return
  }

  for (let index = position; index < set.length; index++) {
    const setValue = set[index];

    if (target < setValue) return

    current.push(setValue)

    const targetSubtracted = target - setValue

    findValuesAndPrepareResult(set, targetSubtracted, index, current, result)

    current.pop()    
  }
}

module.exports = combinate
