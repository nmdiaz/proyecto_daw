"use strict";

let elForm = document.forms["form"];
let ctrlEm = elForm.elements["email_usuario"];
ctrlEm.addEventListener("change", function (e) {
    let control = this;
    let expReg = new RegExp(control.pattern);
    control.nextElementSibling.innerHTML = "";
    if (!expReg.test(control.value)) {
        control.focus();
        control.nextElementSibling.innerHTML = "Correo inválido";
        document.getElementsByTagName('span')[0].style.color = 'red';
    }

});