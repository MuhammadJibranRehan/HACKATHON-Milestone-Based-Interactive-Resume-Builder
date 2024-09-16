document.getElementById('resumeForm')?.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Collect form inputs
  const nameElement = document.getElementById('name') as HTMLInputElement;
  const emailElement = document.getElementById('email') as HTMLInputElement;
  const phoneElement = document.getElementById('phone') as HTMLInputElement;
  const educationElement = document.getElementById('education') as HTMLTextAreaElement;
  const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
  const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
  const profilePictureElement = document.getElementById('profilePicture') as HTMLInputElement;

  if (areFormElementsValid(nameElement, emailElement, phoneElement, educationElement, experienceElement, skillsElement)) {
      const name = nameElement.value.trim();
      const email = emailElement.value.trim();
      const phone = phoneElement.value.trim();
      const education = educationElement.value.trim();
      const experience = experienceElement.value.trim();
      const skills = skillsElement.value.trim();

      const file = profilePictureElement.files?.[0];

      if (file) {
          const reader = new FileReader();
          reader.onloadend = function () {
              const profileImageSrc = reader.result ? `<img src="${reader.result}" alt="Profile Picture" class="profile-img" />` : '';
              generateResumeOutput(profileImageSrc, name, email, phone, education, experience, skills);
          };
          reader.readAsDataURL(file);
      } else {
          generateResumeOutput('', name, email, phone, education, experience, skills);
      }
  } else {
      console.error('One or more form elements are missing or invalid.');
  }
});

function areFormElementsValid(...elements) {
  return elements.every(element => element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement);
}

function generateResumeOutput(profileImageSrc, name, email, phone, education, experience, skills) {
  const resumeOutput = `
      <div class="resume-header">
          ${profileImageSrc}
          <h1>${name}</h1>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
      </div>
      <h3>Education</h3>
      <p>${education}</p>
      <h3>Experience</h3>
      <p>${experience}</p>
      <h3>Skills</h3>
      <p>${skills}</p>
  `;

  const resumeOutputElement = document.getElementById('resumeOutput');
  if (resumeOutputElement) {
      resumeOutputElement.innerHTML = resumeOutput;
      makeEditable(); // Make resume editable
  }

  document.getElementById('printResume')?.classList.remove('hidden');
  document.getElementById('downloadResume')?.classList.remove('hidden');
}

function makeEditable() {
  const editableElements = document.querySelectorAll('.resume-header p, .resume-header h1');
  editableElements.forEach(element => {
      element.addEventListener('click', function () {
          const currentElement = element as HTMLElement;
          const currentValue = currentElement.textContent || "";

          if (currentElement.tagName === "P" || currentElement.tagName === "H1") {
              const input = document.createElement('input');
              input.type = 'text';
              input.value = currentValue;
              input.classList.add('editing');
              input.style.width = '100%';

              input.addEventListener('blur', function () {
                  currentElement.textContent = input.value;
                  currentElement.style.display = 'inline';
                  input.remove();
              });

              currentElement.style.display = 'none';
              currentElement.parentNode?.insertBefore(input, currentElement);
              input.focus();
          }
      });
  });
}

document.getElementById('printResume')?.addEventListener('click', function () {
  window.print();
});

document.getElementById('downloadResume')?.addEventListener('click', function () {
  const resumeOutputElement = document.getElementById('resumeOutput');
  if (resumeOutputElement) {
      const blob = new Blob([resumeOutputElement.innerHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.html';
      a.click();
      URL.revokeObjectURL(url);
  }
});
