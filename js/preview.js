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

function generateTemplatePreview(template) {
    const previewData = {
        fullName: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        summary: "Experienced software engineer with expertise in web development.",
        experience: [{
            position: "Senior Developer",
            company: "Tech Corp",
            duration: "2020 - Present",
            description: "Led development of enterprise applications."
        }],
        education: [{
            degree: "B.S. Computer Science",
            school: "University of Technology",
            year: "2019"
        }],
        skills: "JavaScript, Python, React, Node.js"
    };

    const previewElement = document.createElement('div');
    previewElement.className = `preview-${template}`;
    previewElement.innerHTML = generatePreviewHTML(previewData, template);
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
            updatePreview(template.dataset.template);
        });
    });
});
