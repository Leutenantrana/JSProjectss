const form = document.querySelector("#generate-form");
const qr = document.getElementById("qrcode");




const onGenerateSubmit = (e) => {
    clearUI()
    e.preventDefault();

    const url = document.getElementById("url").value;
    const size = document.getElementById("size").value;
    if (url === "") {
        alert('please enter a URL')
    } else {
        showSpinner();

        setTimeout(() => {
            hideSpinner()

            generateQRcode(url, size)

            setTimeout(() => {
                const saveUrl = qr.querySelector("canvas").toDataURL();
                createSaveBtn(saveUrl)
            })
        }, 1000)
    }


}

const showSpinner = () => {
    document.getElementById("spinner").style.display = 'block'
}

const hideSpinner = () => {
    document.getElementById('spinner').style.display = "none"
}

const clearUI = () => {
    qr.innerHTML = ''
    const saveBtn = document.getElementById('save-link')
    if (saveBtn) {
        saveBtn.remove()
    }

}


const generateQRcode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size,
    });
}

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w:1/3 m-auto my-5 '
    link.href = saveUrl;
    link.download = 'qrcode.png';
    link.innerText = "Save Image"

    document.getElementById('generated').appendChild(link)
}







form.addEventListener("submit", onGenerateSubmit);