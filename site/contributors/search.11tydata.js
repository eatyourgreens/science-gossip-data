function searchIndex({ allContributors }) {
  return allContributors.map(([key, value]) => ({ name: value.name, slug: key }));
}

export default {
  eleventyComputed: {
    searchIndex,
    title: 'Contributor search',
    description: 'Search for contributors that have been indexed by our volunteers.'
  }
}
