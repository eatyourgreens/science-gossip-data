function tagPageTag({ tagPage }) {
  return tagPage.tagName
}

function tagPageTitle({ tagPage }) {
  return `${tagPage.tagName} Page ${tagPage.page}`
}

function tagPageDescription({ tagPage }) {
  return `Illustrated pages tagged with ${tagPage.tagName}`
}

function tagPageImage({ tagPage }) {
  const [subject] = tagPage.subjects;
  return subject ? subject.location.thumb : ''
}

export default {
  eleventyComputed: {
    tagName: tagPageTag,
    title: tagPageTitle,
    description: tagPageDescription,
    ogImage: tagPageImage
  }
}
