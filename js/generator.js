function generateCV(data, template) {
    const cv = document.createElement('div');
    cv.className = `cv-container ${template}`;
    
    switch(template) {
        case 'modern':
            cv.innerHTML = generateModernTemplate(data);
            break;
        case 'classic':
            cv.innerHTML = generateClassicTemplate(data);
            break;
        case 'minimal':
            cv.innerHTML = generateMinimalTemplate(data);
            break;
    }

    const opt = {
        margin: [10, 10, 10, 10],
        filename: `${data.fullName.replace(/\s+/g, '_')}_CV.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            scrollX: 0,
            scrollY: 0,
            width: 794, // A4 width in pixels (210mm)
            height: 1123, // A4 height in pixels (297mm)
            windowWidth: 794
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait'
        },
        pagebreak: { 
            mode: ['avoid-all', 'css'],
            before: '.page-break'
        }
    };

    // Create temporary container with proper dimensions
    const container = document.createElement('div');
    container.style.width = '210mm';
    container.style.minHeight = '297mm';
    container.style.padding = '0';
    container.style.margin = '0';
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.appendChild(cv);
    document.body.appendChild(container);

    // Generate PDF
    html2pdf()
        .set(opt)
        .from(container)
        .save()
        .then(() => {
            document.body.removeChild(container);
        })
        .catch(err => {
            console.error('PDF Generation Error:', err);
            document.body.removeChild(container);
        });
}
