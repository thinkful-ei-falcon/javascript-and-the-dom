window.addEventListener('DOMContentLoaded', main);
let database = [{ email: 'bob@gmail.com', password: 'password', address: '123 easy st', city: 'New York', state: 'New York', zip: '10001' }]
   
function main() {
    const leftButton = document.querySelector("#left");
    const middleButton = document.querySelector("#middle");
    const rightButton = document.querySelector("#right");

    let buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => btn.addEventListener('click', btnHandler))
    /*leftButton.addEventListener('click',btnHandler)
    middleButton.addEventListener('click',btnHandler)
    rightButton.addEventListener('click',btnHandler)*/

    function btnHandler(evt) {
        console.log(evt)
        let output = document.querySelector('.btn-info');

        output.innerHTML = `<div style="color:blue">you clicked a ${evt.target.innerText} button!</div>`;
    }

    //document.body.addEventListener('keydown', evt => {
    //    console.log(evt.key);
    // })


    const form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
    function handleFormSubmit(evt) {
        evt.preventDefault();
        const formData = new FormData(evt.target)
        const email = formData.get("email");
        console.log(email.length)
        let error = isFormValid(formData)
        console.log(error)
        if (error) {
            let alert = document.querySelector('.alert');
            alert.innerText = error;
            alert.classList.remove('d-none');
        }
        let newRecord ={
            email:formData.get('email'),
            password: formData.get('password'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip')
        }
       database.push(newRecord);
       render();
    }
    function isFormValid(data) {
        let error = null;
        if (data.get("email").length < 2) {
            error = "Please enter a longer email address";
        }
        return error;

    }
    
    function createTemplate(){
        let templateArr = database.map(item=>
            `<tr>
            <th scope="row"></th>
            <td>${item.email}</td>
            <td>${item.address}</td>
            <td>${item.city}</td>
            <td>${item.state}</td>
          </tr>`
        )
        return templateArr;
    }

    function render(){
        let template = createTemplate();
        let tbody = document.querySelector('tbody');
        tbody.innerHTML= template.join('');

    }

    render();


}