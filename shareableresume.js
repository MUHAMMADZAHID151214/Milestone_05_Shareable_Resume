var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function generateResume(event) {
    var _this = this;
    event.preventDefault();
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var workExperience = document.getElementById("workExperience").value;
    var skills = document.getElementById("skills").value.split(", ");
    var uniquepath = "".concat(fullName.replace(/\s+/g, '_'), "_Resume.pdf");
    var resumeContainer = document.getElementById("generated-resume");
    if (resumeContainer) {
        resumeContainer.innerHTML = "";
        var resumeHTML = "\n        <div class=\"resume-container\" id=\"resum\">\n            <div class=\"sidebar\">\n                <h2>Name</h2>\n                <p class=\"subtitle\" contenteditable=\"true\">".concat(fullName, "</p>\n                <div class=\"contact-section\">\n                    <h3>Contact</h3>\n                    <p contenteditable=\"true\">").concat(email, "</p>\n                    <p contenteditable=\"true\">").concat(phone, "</p>\n                </div>\n                <div class=\"skills-section\">\n                    <h3>Skills</h3>\n                    <p contenteditable=\"true\">").concat(skills.join(", "), "</p>\n                </div>\n            </div>    \n            \n            <div class=\"main-content\">\n                <div class=\"work-experience-section\">\n                    <h3>Work Experience</h3>\n                    <div id=\"work-content\">\n                        <div class=\"job\">\n                            <h6 contenteditable=\"true\">").concat(workExperience, "</h6>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"education-section\">\n                    <h3>Education</h3>\n                    <div id=\"education-content\">\n                        <div class=\"degree\">\n                            <h6 contenteditable=\"true\">").concat(education, "</h6>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ");
        resumeContainer.innerHTML = resumeHTML;
        var buttonContainer = document.createElement('div');
        buttonContainer.style.textAlign = 'center';
        var downloadLink = document.createElement('button');
        downloadLink.textContent = "Download PDF With Unique Url";
        downloadLink.classList.add('btn1');
        downloadLink.addEventListener("click", function () {
            var elementToConvert = document.getElementById("resum");
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
        var shareButton = document.createElement('button');
        shareButton.textContent = "Copy ShareLink";
        shareButton.classList.add('btn2');
        shareButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            var baseUrl, fileName, shareableLink, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        baseUrl = 'https://milestone-05-shareable-resume.vercel.app/';
                        fileName = "index.html";
                        shareableLink = "".concat(baseUrl).concat(fileName);
                        return [4 /*yield*/, navigator.clipboard.writeText(shareableLink)];
                    case 1:
                        _a.sent();
                        alert("Link Copied!!");
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Failed to copy link: ", err_1);
                        alert("Failed to copy link. Try again!");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        buttonContainer.appendChild(downloadLink);
        buttonContainer.appendChild(shareButton);
        resumeContainer.appendChild(buttonContainer);
    }
    addEditListeners();
}
function addEditListeners() {
    var editableElements = document.querySelectorAll("[contenteditable='true']");
    editableElements.forEach(function (element) {
        element.addEventListener("blur", function () {
            console.log("Updated content: ".concat(element.textContent));
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resume-form");
    if (form) {
        form.addEventListener("submit", generateResume);
    }
    else {
        console.error("Form not found!");
    }
});
