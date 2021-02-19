export async function fetchNFZData(url) {
  let places = []
  let NFZData = await fetch(url)
  let parsedNFZData = await NFZData.json()
  places.push(...parsedNFZData.data)

  if (parsedNFZData.links.next && parsedNFZData.links.next !== null) {
    let response = await fetchNFZData(
      `https://api.nfz.gov.pl${parsedNFZData.links.next}`
    )
    places.push(...response)
  }

  return places
}

export const updateCitiesArray = response => {
  let array = [""]
  response.forEach(item => {
    if (!array.includes(item.attributes.locality))
      array.push(item.attributes.locality)
  })

  return array
}
