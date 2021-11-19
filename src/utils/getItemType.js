const getItemType = (name) => {
  const items = ['Spade', 'Clover', 'Diamond', 'Heart']

  for (let i = 0; i < items.length; i++) {
    if (name.indexOf(items[i]) !== -1) return items[i]
  }
}

export default getItemType
