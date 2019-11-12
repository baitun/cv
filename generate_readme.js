const resume = require("./src/resume.json");
const fs = require("fs");

// console.log(resume);

let content = `

# ${resume.basics.name}
## ${resume.basics.label}

${resume.basics.summary}
`;

content += getContact(resume);
content += getExperience(resume);
content += getEducation(resume);
content += getSkills(resume);

// content += `\n\`\`\`${JSON.stringify(resume, null, 2)}\`\`\``;

fs.writeFile("./README.md", content, function(err) {
  if (err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});

function getContact(resume) {
  if (!resume) throw new Error("no resume");
  if (!resume.basics) return "";
  if (!resume.basics.profiles) return "";

  let content = "\n## Contact\n";
  for (let profile of resume.basics.profiles) {
    content += `\n- [${profile.network}](${profile.url})`;
  }
  content += "\n";
  return content;
}

function getExperience(resume) {
  let content = "\n## Work Experience\n";
  for (let work of resume.work) {
    content += `### ${work.company}, ${work.position} (${work.startDate} - ${work.endDate})\n`;
    content += `${work.summary}  \n`;
    for (let h of work.highlights) {
      content += `\n- ${h}`;
    }
    content += "\n";
  }
  return content;
}

function getEducation(resume) {
  let content = `\n## Education`;
  for (let e of resume.education) {
    content += `\n- **${e.institution}**, _${e.studyType}_`;
  }
  return content;
}

function getSkills(resume) {
  let content = `\n## Skills`;
  for (let skill of resume.skills) {
    content += `\n- **${skill.name}**: ` + skill.keywords.join(", ");
  }
  return content;
}
