import fs from 'fs'
import slugify from 'slugify'

const contributorIndex = {}

function allContributors() {
  const tempIndex = {}
  fs.readdirSync('./site/_data/results').forEach(file => {
    const groupResults = JSON.parse(fs.readFileSync(`./site/_data/results/${file}`))
    const groupSubjects = JSON.parse(fs.readFileSync(`./site/_data/subjects/${file}`))
    console.log(file, groupResults.length)
    for (let i = groupResults.length - 1; i > -1; i--) {
      const result = groupResults[i]
      const subject = groupSubjects.find(subject => subject.zooniverse_id === result.subject_id)
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
    }
  });
  for (const [key, value] of Object.entries(tempIndex)) {
    if (value.subjects.length > 0) {
      const { name, subjects } = value
      contributorIndex[key] = {
        name,
        subjects: [...new Set(subjects)]
      }
    }
  }
  console.log('Total number of contributors:', Object.keys(contributorIndex).length)
  return contributorIndex
}

export default Object.entries(allContributors())
