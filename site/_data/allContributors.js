import slugify from 'slugify'

import allSubjects from './allSubjects.js'
import allResults from './allResults.js'

const contributorIndex = {}
allSubjects.forEach(subject => {
  subject.contributors = {}
})

function allContributors() {
  const tempIndex = {}
  allResults.forEach(result => {
    const subject = allSubjects.find(subject => subject.zooniverse_id === result.subject_id)
    result.reduced
      .filter(reduction => reduction.type === 'contributor')
      .map(reduction => reduction.value.name)
      .filter(Boolean)
      .forEach(names => {
        names.forEach(name => {
          const normalisedName = name.toLowerCase().trim().replaceAll('.', '').replaceAll(' ', '')
          const slug = slugify(normalisedName)
          if (slug) {
            const subjects = tempIndex[slug] ? [...tempIndex[slug].subjects, subject] : [subject]
            tempIndex[slug] = {
              name,
              subjects
            }
          }
        })
      })
  })
  for (const [key, value] of Object.entries(tempIndex)) {
    if (value.subjects.length > 0) {
      const { name, subjects } = value
      contributorIndex[key] = {
        name,
        subjects: [...new Set(subjects.filter(Boolean))]
      }
      contributorIndex[key].subjects
        .forEach(subject => {
          subject.contributors[key] = name
        })
    }
  }
  console.log('Total number of contributors:', Object.keys(contributorIndex).length)
  return contributorIndex
}

export default Object.entries(allContributors())
