const getDistance = (lat1, lng1, lat2, lng2) => {
  let lat1p = parseFloat(lat1)
  let lng1p = parseFloat(lng1)
  let lat2p = parseFloat(lat2)
  let lng2p = parseFloat(lng2)

  let R = 6371 // km (change this constant to get miles)
  let dLat = ((lat2p - lat1p) * Math.PI) / 180
  let dLon = ((lng2p - lng1p) * Math.PI) / 180
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let dist = R * c

  return dist // 리턴값이 1이면 1km, 0.1이면 100m
}

export default getDistance
