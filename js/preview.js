const sampleData = {
    fullName: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    summary: "Senior Software Engineer with 8+ years of experience in full-stack development.",
    experience: [
        {
            position: "Senior Software Engineer",
            company: "Tech Solutions Inc.",
            duration: "2023 - Present",
            description: "Leading development of enterprise applications"
        }
    ],
    education: [
        {
            degree: "M.S. Computer Science",
            school: "Stanford University",
            year: "2021"
        }
    ],
    skills: "JavaScript, Python, React, Node.js, AWS, Docker"
};

function generatePreviewHTML(data, template) {
    const templates = {
        modern: generateModernPreview,
        classic: generateClassicPreview,
        minimal: generateMinimalPreview
    };
    
    return templates[template](data);
}

function generateModernPreview(data) {
    return `
        <div class="cv-modern">
            <header class="cv-header">
                <h1>${data.fullName}</h1>
                <div class="contact-info">
                    <span>${data.email}</span> • 
                    <span>${data.phone}</span> • 
                    <span>${data.location}</span>
                </div>
            </header>
            <section class="summary">
                <h2>Professional Summary</h2>
                <p>${data.summary}</p>
            </section>
            <section class="experience">
                <h2>Experience</h2>
                <div class="experience-item">
                    <h3>${data.experience[0].position}</h3>
                    <p>${data.experience[0].company} | ${data.experience[0].duration}</p>
                </div>
            </section>
            <section class="education">
                <h2>Education</h2>
                <div class="education-item">
                    <h3>${data.education[0].degree}</h3>
                    <p>${data.education[0].school} | ${data.education[0].year}</p>
                </div>
            </section>
        </div>
    `;
}

function generateClassicPreview(data) {
    return `
        <div class="cv-classic">
            <header>
                <h1>${data.fullName}</h1>
                <div class="contact">
                    ${data.email} | ${data.phone} | ${data.location}
                </div>
            </header>
            <hr>
            <section class="summary">
                <h2>Summary</h2>
                <p>${data.summary}</p>
            </section>
            <section class="experience">
                <h2>Professional Experience</h2>
                <div class="experience-item">
                    <h3>${data.experience[0].position}</h3>
                    <p>${data.experience[0].company}, ${data.experience[0].duration}</p>
                </div>
            </section>
        </div>
    `;
}

function generateMinimalPreview(data) {
    return `
        <div class="cv-minimal">
            <h1>${data.fullName}</h1>
            <p class="contact">${data.email} · ${data.phone}</p>
            <section>
                <h2>Experience</h2>
                <div class="experience-item">
                    <h3>${data.experience[0].position}</h3>
                    <p>${data.experience[0].company} | ${data.experience[0].duration}</p>
                </div>
            </section>
        </div>
    `;
}

function generateTemplatePreview(template) {
    const previewElement = document.createElement('div');
    previewElement.className = `preview-${template}`;
    previewElement.innerHTML = generatePreviewHTML(sampleData, template);
    return previewElement;
}

document.addEventListener('DOMContentLoaded', () => {
    const templates = document.querySelectorAll('.template');
    
    templates.forEach(template => {
        const preview = template.querySelector('.preview');
        const templateType = template.dataset.template;
        preview.appendChild(generateTemplatePreview(templateType));
    });

    templates.forEach(template => {
        template.addEventListener('click', () => {
            templates.forEach(t => t.classList.remove('selected'));
            template.classList.add('selected');
            updateMainPreview(template.dataset.template);
        });
    });
});

function updateMainPreview(template) {
    const preview = document.getElementById('preview');
    const formData = new FormData(document.getElementById('cvForm'));
    const data = Object.fromEntries(formData);
    
    preview.innerHTML = generatePreviewHTML(data, template);
    preview.classList.remove('hidden');
}
