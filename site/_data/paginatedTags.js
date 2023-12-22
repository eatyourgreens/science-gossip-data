import allTags from './allTags.js'

function pageSubjects(key, tag) {
  const pageSize = 50
  const subjectPages = [];
  const pageCount = Math.ceil(tag.subjects.length / pageSize);
  for (let i = 0; i < pageCount; i++) {
    const start = i * pageSize;
    const finish = start + pageSize;
    const pageSubjects = tag.subjects.slice(start, finish)
    subjectPages.push({
      slug: key,
      tagName: tag.tagName,
      page: i,
      pageCount,
      subjects: pageSubjects
    });
  }
  return subjectPages
}

function paginatedTags() {
  let taggedSubjects = [];
  for (const [key, value] of allTags) {
    taggedSubjects = taggedSubjects.concat(pageSubjects(key, value))
  }
  return taggedSubjects;
}

export default paginatedTags()
