const slugify = require('slugify');

function parseSubjectResults({ subject, results }) {
  const groupID = subject.group.zooniverse_id;
  const result = results[groupID].find(result => result.subject_id === subject.zooniverse_id);
  return result;
}

function subjectTitle(data) {
  return `Subject ${data.subject.zooniverse_id}`;
}

function subjectDescription(data) {
  const result = parseSubjectResults(data);
  return result ? result.keywords.join(', ') : '';
}

function subjectImage({ subject }) {
  let href = subject.location.thumb.replace('zooniverse-static.s3.amazonaws.com', 'static.zooniverse.org');
  href = href.replace('http://', 'https://');
  return href;
}

function linkedKeywords({ allTags, subject, results }) {
  const keywords = [];
  const result = parseSubjectResults({ subject, results });
  result.keywords
  .map(key => key.trim())
  .filter(Boolean)
  .forEach(key => {
    const slug = slugify(key).toLowerCase()
    if (slug && allTags[slug]) {
      const href = `../../../../tags/${slug}/page/0/`
      keywords.push({ href, key });
    } else {
      keywords.push({ key });
    }
  })
  return keywords;
}

module.exports = {
  eleventyComputed: {
    result: parseSubjectResults,
    title: subjectTitle,
    description: subjectDescription,
    ogImage: subjectImage,
    linkedKeywords
  }
}