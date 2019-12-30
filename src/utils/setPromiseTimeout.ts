export const setPromiseTimeout = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}
