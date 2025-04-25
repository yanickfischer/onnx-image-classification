function checkFiles(files) {
    if (files.length !== 1) {
        alert("Bitte genau eine Datei hochladen.");
        return;
    }

    const fileSize = files[0].size / 1024 / 1024;
    if (fileSize > 10) {
        alert("Datei zu gross (max. 10Mb)");
        return;
    }

    answerPart.style.visibility = "visible";

    if (files[0]) {
        preview.src = URL.createObjectURL(files[0]);
    }
}

function submitForm() {
    const fileInput = document.getElementById("image");
    const modelSelect = document.getElementById("model");

    if (fileInput.files.length !== 1) {
        alert("Bitte genau eine Datei hochladen.");
        return;
    }

    const fileSize = fileInput.files[0].size / 1024 / 1024;
    if (fileSize > 10) {
        alert("Datei zu gross (max. 10Mb)");
        return;
    }

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);
    formData.append("model", modelSelect.value);

    fetch('/analyze', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let table = "<table><tr><th>Class</th><th>Value</th></tr>";
        data.forEach(item => {
            table += `<tr><td>${item.class}</td><td>${item.value.toFixed(4)}</td></tr>`;
        });
        table += "</table>";
        answer.innerHTML = table;
    })
    .catch(error => console.log(error));
}