// Pure functions
export const capitalize = (string) => {
  if (typeof string !== 'string') {
    return ''
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}
// sharAt(0) выбирает символ по порядку
