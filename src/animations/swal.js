import Swal from 'sweetalert2';

const timedAlert = (message, time, callback = () => {}) => {
    let timerInterval;
    return Swal.fire({
        title: message,
        timer: time,
        timerProgressBar: true,
        onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
                const content = Swal.getContent();
                if (content) {
                    const b = content.querySelector('b');
                    if (b) {
                        b.textContent = Swal.getTimerLeft()
                    }
                }
            }, 100)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    }).then(() => callback());
};

const simpleSwal = (title, html, icon) => {
    return Swal.fire(title, html, icon);
};

const questionSwal = (question, confirmButtonText) => {
    return Swal.fire({
        title: question,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText
    })
};

const showLinks = (url, fileNames) => {
    Swal.fire({
        title: 'File Upload Links',
        html: fileNames.reduce((total, curr) => total + `<a target='_blank' href='${url}${encodeURIComponent(curr)}'>${curr}</a>` + '<hr>', '')
    })
};
const errorAlert = (message, callback = () => {}) => {
    if (Array.isArray(message)) {
        message = message.reduce((total, curr) => total + curr + '<br>', '');
    }
    return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: message
    }).then(() => callback());
};

export {timedAlert, errorAlert, showLinks, questionSwal, simpleSwal};
