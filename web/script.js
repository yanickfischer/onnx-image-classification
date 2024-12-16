function checkFiles(files) {
    console.log(files);

    if (files.length != 1) {
        alert("Bitte genau eine Datei hochladen.")
        return;
    }

    const fileSize = files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 10) {
        alert("Datei zu gross (max. 10Mb)");
        return;
    }

    answerPart.style.visibility = "visible";
    const file = files[0];

    // Preview
    if (file) {
        preview.src = URL.createObjectURL(files[0])
    }

    // Upload
    const formData = new FormData();
    for (const name in files) {
        formData.append(name, files[name]);
    }

    fetch('/analyze', {
        method: 'POST',
        headers: {
        },
        body: formData
    }).then(
        response => response.json()
    ).then(
        data => {
            console.log(data);
            let table = "<table><tr><th>Class</th><th>Value</th></tr>";
            data.forEach(item => {
                table += `<tr><td>${item.class}</td><td>${item.value}</td></tr>`;
            });
            table += "</table>";
            answer.innerHTML = table;
        }
    ).catch(
        error => console.log(error)
    );
}