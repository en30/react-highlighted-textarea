export default (obj, keys) => keys.reduce((a, k) => {
  a[k] = obj[k]
  return a
}, {})
