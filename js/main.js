document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cvForm');
    const preview = document.getElementById('preview');
    let selectedTemplate = 'modern';

    // Template selection
    document.querySelectorAll('.template').forEach(template => {
        template.addEventListener('click', () => {
            selectedTemplate = template.dataset.template;
            document.querySelectorAll('.template').forEach(t => 
                t.classList.remove('selected'));
            template.classList.add('selected');
            updatePreview();
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const cvData = Object.fromEntries(formData);
        generateCV(cvData, selectedTemplate);
    });
});

function addEducation() {
    const educationSection = document.getElementById('education');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry';
    newEntry.innerHTML = `
        <input type="text" name="degree" placeholder="Degree">
        <input type="text" name="school" placeholder="School">
        <input type="text" name="year" placeholder="Year">
        <button type="button" class="remove-btn" 
                onclick="this.parentElement.remove()">Remove</button>
    `;
    educationSection.insertBefore(newEntry, 
        educationSection.querySelector('.add-btn'));
}

function addExperience() {
    const experienceSection = document.getElementById('experience');
    const newEntry = document.createElement('div');
    newEntry.className = 'experience-entry';
    newEntry.innerHTML = `
        <input type="text" name="position" placeholder="Position">
        <input type="text" name="company" placeholder="Company">
        <input type="text" name="duration" placeholder="Duration">
        <textarea name="description" placeholder="Description"></textarea>
        <button type="button" class="remove-btn" 
                onclick="this.parentElement.remove()">Remove</button>
    `;
    experienceSection.insertBefore(newEntry, 
        experienceSection.querySelector('.add-btn'));
}
