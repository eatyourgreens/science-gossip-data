function searchIndex({ allSpecies }) {
  return allSpecies.map(([key, value]) => ({ name: value.name, slug: key }));
}

export default {
  eleventyComputed: {
    searchIndex,
    title: 'Species search',
    description: 'Search for species that have been indexed by our volunteers.'
  }
}
