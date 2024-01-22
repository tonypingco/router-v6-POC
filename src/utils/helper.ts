// Local storage
export const fetchData = (key: string) => {
  return JSON.parse(localStorage.getItem(key || ""))
}

// remove item
export const deleteItem = ({ key }: { key: string }) => {
  return localStorage.removeItem(key)
}
