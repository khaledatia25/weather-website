const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#forecast');
const messageTwo = document.querySelector('#error');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = '';
                messageTwo.textContent = data.error;
            } else {
                messageTwo.textContent = data.location;
                messageOne.textContent = data.forecast;

            }
        });
    });
});