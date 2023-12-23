import slugify from 'slugify';

function parseSubjectResults({ subject }) {
  return subject?.result;
}

function subjectTitle(data) {
  return `Subject ${data.subject.zooniverse_id}`;
}

function subjectDescription({ subject }) {
  return subject.result ? subject.result.keywords.join(', ') : '';
}

function subjectImage({ subject }) {
  let href = subject.location.thumb.replace('zooniverse-static.s3.amazonaws.com', 'static.zooniverse.org');
  href = href.replace('http://', 'https://');
  return href;
}

function linkedKeywords({ subject }) {
  const keywords = [];
  const linkedTags = tags({ subject });
  subject.result.keywords
  .map(key => key.trim())
  .filter(Boolean)
  .forEach(key => {
    const slug = slugify(key).toLowerCase()
    const href = `../../../../tags/${slug}/page/0/`
    const isLink = slug && linkedTags.find(tag => tag.href === href)
    if (isLink) {
      keywords.push({ href, key });
    } else {
      keywords.push({ key });
    }
  })
  return keywords;
}

function tags({ subject }) {
  return Object.entries(subject.tags)
  .map(([slug, name]) => ({ href: `../../../../tags/${slug}/page/0/`, name }))
}

function contributors({ subject }) {
  return Object.entries(subject.contributors)
  .map(([slug, name]) => ({ href: `../../../../contributors/${slug}/page/0/`, name }))
}

function species({ subject }) {
  return Object.entries(subject.species)
  .map(([slug, name]) => ({ href: `../../../../species/${slug}/page/0/`, name }))
}

function group({ groups, subject }) {
  return groups[subject.group.zooniverse_id]
}

export default {
  eleventyComputed: {
    group,
    species,
    result: parseSubjectResults,
    title: subjectTitle,
    description: subjectDescription,
    ogImage: subjectImage,
    linkedKeywords,
    contributors
  }
}
