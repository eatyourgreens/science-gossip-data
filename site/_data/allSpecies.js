import slugify from 'slugify'

import allSubjects from './allSubjects.js'
import allResults from './allResults.js'

const speciesIndex = {}

function allSpecies() {
  const tempIndex = {}
  allResults.forEach(result => {
    const subject = allSubjects.find(subject => subject.zooniverse_id === result.subject_id)
    result.reduced
      .filter(reduction => reduction.type === 'species')
      .map(reduction => reduction.value)
      .filter(Boolean)
      .forEach(value => {
        value.common.forEach(common => {
          const normalisedName = common.toLowerCase().trim().replaceAll('.', '').replaceAll(' ', '')
          const slug = slugify(normalisedName)
          if (slug) {
            const subjects = tempIndex[slug] ? [...tempIndex[slug].subjects, subject] : [subject]
            tempIndex[slug] = {
              name: common,
              subjects
            }
          }
        })
        value.scientific.forEach(scientific => {
          const normalisedName =scientific.toLowerCase().trim().replaceAll('.', '').replaceAll(' ', '')
          const slug = slugify(normalisedName)
          if (slug) {
            const subjects = tempIndex[slug] ? [...tempIndex[slug].subjects, subject] : [subject]
            tempIndex[slug] = {
              name: scientific,
              subjects
            }
          }
        })
      })
  })
  for (const [key, value] of Object.entries(tempIndex)) {
    if (value.subjects.length > 0) {
      const { name, subjects } = value
      speciesIndex[key] = {
        name,
        subjects: [...new Set(subjects)]
      }
    }
  }
  console.log('Total number of species:', Object.keys(speciesIndex).length)
  return speciesIndex
}

export default Object.entries(allSpecies())
