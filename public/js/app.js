console.log('Client side javascript file is loaded!')


// fetch('http://localhost:3000/weather?address=Mohali').then ((response ) =>{
//     response.json().then((data) => {
//         if(data.error){
//             console.log('Error')
//         }

//         else{
//             console.log(data.location)
//         }

//     })

// })





const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})