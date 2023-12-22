import slugify from 'slugify'

import allSubjects from './allSubjects.js'
import allResults from './allResults.js'

const tagIndex = {}

function allTags() {
  const tempTagIndex = {}
  allResults.forEach(result => {
    const subject = allSubjects.find(subject => subject.zooniverse_id === result.subject_id)
    result.keywords
      .map(key => key.trim())
      .filter(Boolean)
      .forEach(key => {
        const slug = slugify(key).toLowerCase()
        if (slug) {
          const subjects = tempTagIndex[slug] ? [...tempTagIndex[slug].subjects, subject] : [subject]
          tempTagIndex[slug] = {
            tagName: key,
            subjects
          }
        }
      })
  })
  for (const [key, value] of Object.entries(tempTagIndex)) {
    if (value.subjects.length > 1) {
      const { tagName, subjects } = value
      tagIndex[key] = {
        tagName,
        subjects: [...new Set(subjects)]
      }
    }
  }
  console.log('Total number of tags:', Object.keys(tagIndex).length)
  return tagIndex
}

export default Object.entries(allTags())
