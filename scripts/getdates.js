//LN : Set the current year in the footer
document.getElementById('currentyear').textContent = new Date().getFullYear();

//LN: Set the last modified date in the footer
document.getElementById('lastModified').textContent += document.lastModified;