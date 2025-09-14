document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-registro');
    const erroresDiv = document.getElementById('errores');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        let valid = true;
        let mensajes = [];

        // Usuario
        const usuario = form.usr.value.trim();
        if (usuario.length < 3) {
            valid = false;
            mensajes.push('El usuario debe tener al menos 3 caracteres.');
        }

        // Email
        const email = form.mail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            valid = false;
            mensajes.push('El correo electrónico no es válido.');
        }

        // Contraseña
        const pass = form.pass.value;
        if (pass.length < 6) {
            valid = false;
            mensajes.push('La contraseña debe tener al menos 6 caracteres.');
        }

        // Confirmar contraseña
        const repass = form.repass.value;
        if (pass !== repass) {
            valid = false;
            mensajes.push('Las contraseñas no coinciden.');
        }

        // Mostrar mensajes y evitar envío si hay errores
        if (!valid) {
            e.preventDefault();
            erroresDiv.classList.remove('d-none');
            erroresDiv.innerHTML = mensajes.map(m => `<div>${m}</div>`).join('');
        } else {
            erroresDiv.classList.add('d-none');
            erroresDiv.innerHTML = '';
        }
    });
});