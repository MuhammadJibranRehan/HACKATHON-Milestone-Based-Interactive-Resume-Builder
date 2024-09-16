var _a, _b, _c;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault(); // Prevent form submission
    // Collect form inputs
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var phoneElement = document.getElementById('phone');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    var profilePictureElement = document.getElementById('profilePicture');
    if (areFormElementsValid(nameElement, emailElement, phoneElement, educationElement, experienceElement, skillsElement)) {
        var name_1 = nameElement.value.trim();
        var email_1 = emailElement.value.trim();
        var phone_1 = phoneElement.value.trim();
        var education_1 = educationElement.value.trim();
        var experience_1 = experienceElement.value.trim();
        var skills_1 = skillsElement.value.trim();
        var file = (_a = profilePictureElement.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader_1 = new FileReader();
            reader_1.onloadend = function () {
                var profileImageSrc = reader_1.result ? "<img src=\"".concat(reader_1.result, "\" alt=\"Profile Picture\" class=\"profile-img\" />") : '';
                generateResumeOutput(profileImageSrc, name_1, email_1, phone_1, education_1, experience_1, skills_1);
            };
            reader_1.readAsDataURL(file);
        }
        else {
            generateResumeOutput('', name_1, email_1, phone_1, education_1, experience_1, skills_1);
        }
    }
    else {
        console.error('One or more form elements are missing or invalid.');
    }
});
function areFormElementsValid() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    return elements.every(function (element) { return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement; });
}
function generateResumeOutput(profileImageSrc, name, email, phone, education, experience, skills) {
    var _a, _b;
    var resumeOutput = "\n      <div class=\"resume-header\">\n          ".concat(profileImageSrc, "\n          <h1>").concat(name, "</h1>\n          <p><strong>Email:</strong> ").concat(email, "</p>\n          <p><strong>Phone:</strong> ").concat(phone, "</p>\n      </div>\n      <h3>Education</h3>\n      <p>").concat(education, "</p>\n      <h3>Experience</h3>\n      <p>").concat(experience, "</p>\n      <h3>Skills</h3>\n      <p>").concat(skills, "</p>\n  ");
    var resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        makeEditable(); // Make resume editable
    }
    (_a = document.getElementById('printResume')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
    (_b = document.getElementById('downloadResume')) === null || _b === void 0 ? void 0 : _b.classList.remove('hidden');
}
function makeEditable() {
    var editableElements = document.querySelectorAll('.resume-header p, .resume-header h1');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            if (currentElement.tagName === "P" || currentElement.tagName === "H1") {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing');
                input_1.style.width = '100%';
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
(_b = document.getElementById('printResume')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    window.print();
});
(_c = document.getElementById('downloadResume')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    var resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        var blob = new Blob([resumeOutputElement.innerHTML], { type: 'text/html' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'resume.html';
        a.click();
        URL.revokeObjectURL(url);
    }
});
