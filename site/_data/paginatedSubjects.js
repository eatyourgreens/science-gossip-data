import fs from 'fs';

function pageSubjects(groupSubjects) {
  const pageSize = 50
  const subjectPages = [];
  const { group } = groupSubjects[0];
  const pageCount = Math.ceil(groupSubjects.length / pageSize);
  for (let i = 0; i < pageCount; i++) {
    const start = i * pageSize;
    const finish = start + pageSize;
    const pageSubjects = groupSubjects.slice(start, finish)
    subjectPages.push({
      groupID: group.zooniverse_id,
      groupName: group.name,
      page: i,
      pageCount,
      subjects: pageSubjects
    });
  }
  return subjectPages
}

function paginatedSubjects() {
  let groupedSubjects = [];
  fs.readdirSync('./site/_data/subjects').forEach(file => {
    const groupSubjects = JSON.parse(fs.readFileSync(`./site/_data/subjects/${file}`));
    groupedSubjects = groupedSubjects.concat(pageSubjects(groupSubjects));
  });
  return groupedSubjects;
}

export default paginatedSubjects();
