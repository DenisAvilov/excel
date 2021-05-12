// Pure functions
export const capitalize = (string) => {
  if (typeof string !== 'string') {
    return ''
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}
// sharAt(0) выбирает символ по порядку
// Находим диапазон между двух произвольных чисел
export const range = (start, end) => {
  if (start > end) {
    [start, end] = [end, start]
  }
  const count = end - start
  return new Array(count + 1)
      .fill().map( () => start++)
}
