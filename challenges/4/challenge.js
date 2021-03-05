/*
 * Regex
 */

/* ENUNCIADO
 *
 * Escreva uma função que busque no texto os valores de "height" e "width"
 * e retorne um objeto { "height": x, "width": y } contendo esses valores ignorando sua medida (px, %, em).
 *
 * Ex:1
 * [INPUT]
 * "<div style="height: 20px; width: 60px;">"
 * [OUTPUT]
 * {
 *   height: 20,
 *   width: 60
 * }
 *
 * Ex: 2
 * [INPUT] String
 * "<div style="background-color: red;"> <img style="width: 120px; height: 20%" /></div>"
 * [OUTPUT] Object
 * {
 *   width: 120,
 *   height: 20
 * }
 */

const extractSize = (htmlTemplate) => {
  const htmlTemplateType = typeof htmlTemplate
  if (!htmlTemplate || htmlTemplateType !== 'string') {
    return {
      width: 0,
      height: 0,
    }
  }

  const regexMatchSizes = /^.+?(?=.*(width).+?(\d+))(?=.*?(height).+?(\d+)).+$/s
  const matched = htmlTemplate.match(regexMatchSizes)

  if (!matched) {
    return {
      width: 0,
      height: 0,
    }
  }

  const onlySizesMatched = matched.slice(1, matched.length)

  const formattedSize = formatSize(onlySizesMatched)

  return formattedSize
}

const formatSize = (sizesList) => {
  const sizes = {}
  for (let index = 0; index < sizesList.length; index += 2) {
    const propNameIndex = index
    const propName = sizesList[propNameIndex]
    const propValue = Number(sizesList[propNameIndex + 1])

    sizes[propName] = propValue
  }

  return sizes
}

module.exports = extractSize
