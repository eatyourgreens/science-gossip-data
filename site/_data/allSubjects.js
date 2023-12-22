import fs from 'fs';

function allSubjects() {
  let subjects = [];
  fs.readdirSync('./site/_data/subjects').forEach(file => {
    const groupSubjects = JSON.parse(fs.readFileSync(`./site/_data/subjects/${file}`))
    console.log(file, groupSubjects.length)
    subjects = subjects.concat(groupSubjects)
  });
  console.log('Total number of subjects:', subjects.length)
  return subjects
}

export default allSubjects()
