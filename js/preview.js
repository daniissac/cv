// preview.js

// Template preview data
const sampleData = {
    fullName: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    summary: "Experienced software engineer with a track record of building scalable applications.",
    experience: [
        {
            position: "Senior Software Engineer",
            company: "Tech Solutions Inc.",
            duration: "2023 - Present",
            description: "Led development of enterprise applications"
        },
        {
            position: "Software Developer",
            company: "Digital Innovations",
            duration: "2021 - 2023",
            description: "Full-stack development"
        }
    ],
    education: [
        {
            degree: "M.S. Computer Science",
            school: "Stanford University",
            year: "2021"
        }
    ],
    skills: "JavaScript, Python, React, Node.js, AWS"
};

function generateModernPreview(data) {
    return `
        <div class="cv-modern">
            <header class="cv-header">
                <h1>${data.fullName}</h1>
                <div class="contact-info">
                    <span>${data.email}</span>
                    <span>${data.phone}</span>
                    <span>${data.location}</span>
                </div>
            </header>
            <section class="summary">
                <p>${data.summary}</p>
            </section>
            <section class="experience">
                <h2>Experience</h2>
                ${data.experience[0].position} | ${data.experience[0].company}
            </section>
            <section class="education">
                <h2>Education</h2>
                ${data.education[0].degree} | ${data.education[0].school}
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
            <section class="experience">
                <h2>Professional Experience</h2>
                ${data.experience[0].position} | ${data.experience[0].company}
            </section>
            <section class="education">
                <h2>Education</h2>
                ${data.education[0].degree} | ${data.education[0].school}
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
                ${data.experience[0].position} | ${data.experience[0].company}
            </section>
            <section>
                <h2>Education</h2>
                ${data.education[0].degree} | ${data.education[0].school}
            </section>
        </div>
    `;
}

function generatePreviewHTML(data, template) {
    switch(template) {
        case 'modern':
            return generateModernPreview(data);
        case 'classic':
            return generateClassicPreview(data);
        case 'minimal':
            return generateMinimalPreview(data);
        default:
            return generateModernPreview(data);
    }
}

function generateTemplatePreview(template) {
    const previewElement = document.createElement('div');
    previewElement.className = `preview-${template}`;
    previewElement.innerHTML = generatePreviewHTML(sampleData, template);
    return previewElement;
}

function updatePreview(template) {
    const preview = document.getElementById('preview');
    preview.style.width = '210mm';
    preview.style.minHeight = '297mm';
    preview.style.padding = '25.4mm';
    preview.style.margin = '0 auto';
    preview.style.backgroundColor = 'white';
    preview.style.overflow = 'hidden';

    const formData = new FormData(document.getElementById('cvForm'));
    const data = Object.fromEntries(formData);
    
    preview.innerHTML = generatePreviewHTML(data, template);
    preview.classList.remove('hidden');
}

// Initialize previews on page load
document.addEventListener('DOMContentLoaded', () => {
    const templates = document.querySelectorAll('.template');
    
    // Initialize template previews
    templates.forEach(template => {
        const preview = template.querySelector('.preview');
        const templateType = template.dataset.template;
        preview.appendChild(generateTemplatePreview(templateType));
    });

    // Add template selection handler
    templates.forEach(template => {
        template.addEventListener('click', () => {
            templates.forEach(t => t.classList.remove('selected'));
            template.classList.add('selected');
            updatePreview(template.dataset.template);
        });
    });
});
