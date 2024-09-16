declare var html2pdf: any;

function generateResume(event: Event): void {
    event.preventDefault(); 

    const fullName = (document.getElementById("fullName") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const workExperience = (document.getElementById("workExperience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLInputElement).value.split(", ");
    
    const uniquepath = `${fullName.replace(/\s+/g, '_')}_Resume.pdf`;

    const resumeContainer = document.getElementById("generated-resume");
    
    if (resumeContainer) {
        resumeContainer.innerHTML = "";

        const resumeHTML = `
        <div class="resume-container" id="resum">
            <div class="sidebar">
                <h2>Name</h2>
                <p class="subtitle" contenteditable="true">${fullName}</p>
                <div class="contact-section">
                    <h3>Contact</h3>
                    <p contenteditable="true">${email}</p>
                    <p contenteditable="true">${phone}</p>
                </div>
                <div class="skills-section">
                    <h3>Skills</h3>
                    <p contenteditable="true">${skills.join(", ")}</p>
                </div>
            </div>    
            
            <div class="main-content">
                <div class="work-experience-section">
                    <h3>Work Experience</h3>
                    <div id="work-content">
                        <div class="job">
                            <h6 contenteditable="true">${workExperience}</h6>
                        </div>
                    </div>
                </div>

                <div class="education-section">
                    <h3>Education</h3>
                    <div id="education-content">
                        <div class="degree">
                            <h6 contenteditable="true">${education}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        resumeContainer.innerHTML = resumeHTML;

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container'); // Added a class for easier styling
        
        const downloadLink = document.createElement('button');
        downloadLink.textContent = "Download PDF With Unique Url";
        downloadLink.classList.add('btn1');
        
        downloadLink.addEventListener("click", () => {
            const elementToConvert = document.getElementById("resum");
            if (elementToConvert) {
                html2pdf()
                    .from(elementToConvert)
                    .set({
                        filename: uniquepath, 
                        margin: 1,
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                    })
                    .save();
            }
        });
        
        const shareButton = document.createElement('button');
        shareButton.textContent = "Copy ShareLink";
        shareButton.classList.add('btn2');
        shareButton.addEventListener("click", async () => {
            try {
                const baseUrl = 'https://milestone-05-shareable-resume.vercel.app/'; 
                const fileName = `index.html`;
                const shareableLink = `${baseUrl}${fileName}`;
                
                await navigator.clipboard.writeText(shareableLink);
                alert("Link Copied!!");
            } catch (err) {
                console.error("Failed to copy link: ", err);
                alert("Failed to copy link. Try again!"); 
            }
        });
        
        buttonContainer.appendChild(downloadLink);
        buttonContainer.appendChild(shareButton);
        
        document.body.appendChild(buttonContainer); // Append outside the resume-container
        
    }

    addEditListeners();
}

function addEditListeners(): void {
    const editableElements = document.querySelectorAll("[contenteditable='true']");

    editableElements.forEach((element) => {
        element.addEventListener("blur", () => {
            console.log(`Updated content: ${element.textContent}`);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("resume-form");
    if (form) {
        form.addEventListener("submit", generateResume);
    } else {
        console.error("Form not found!");
    }
});
