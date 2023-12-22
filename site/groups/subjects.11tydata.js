function subjectsPageGroup({ groups, subjectsPage }) {
  return groups[subjectsPage.groupID]
}

function subjectsPageTitle({ groups, subjectsPage }) {
  const group = groups[subjectsPage.groupID];
  return `${group.metadata.title} Page ${subjectsPage.page}`
}

function subjectsPageDescription({ groups, subjectsPage }) {
  const group = groups[subjectsPage.groupID];
  return `Illustrated pages from ${group.metadata.title}`
}

function subjectsPageImage({ subjectsPage }) {
  const [subject] = subjectsPage.subjects;
  return subject.location.thumb
}

export default {
  eleventyComputed: {
    group: subjectsPageGroup,
    title: subjectsPageTitle,
    description: subjectsPageDescription,
    ogImage: subjectsPageImage
  }
}
