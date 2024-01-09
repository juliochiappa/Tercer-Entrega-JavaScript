document.addEventListener('DOMContentLoaded', () => {
    const turnosList = document.getElementById('turnosList');

    // Carga los datos desde el almacenamiento local
    const turnos = JSON.parse(localStorage.getItem('turnos')) || [];

    // Función para actualizar estado de la lista de turnos
    const actualizarTurnos = () => {
        turnosList.innerHTML = '';

            turnos.forEach((paciente, estadoActual) => {
            const li = document.createElement('li');
            li.className = 'lista';
            li.textContent = `${paciente.nombre} ${paciente.apellido} - Estado: ${paciente.estado}`;
            
            // Botones para cambiar el estado del paciente
            const botonEnEspera = document.createElement('button');
            botonEnEspera.className = 'btn btn-info btn-sm mx-2';
            botonEnEspera.textContent = 'Paciente en Espera';
            botonEnEspera.onclick = () => cambiarEstado(estadoActual, 'Paciente en Espera');
            
            const botonEnConsultorio = document.createElement('button');
            botonEnConsultorio.className = 'btn btn-warning btn-sm mx-2';
            botonEnConsultorio.textContent = 'Paciente en Consultorio';
            botonEnConsultorio.onclick = () => cambiarEstado(estadoActual, 'Paciente en Consultorio');
            
            const botonAtendido = document.createElement('button');
            botonAtendido.className = 'btn btn-success btn-sm mx-2';
            botonAtendido.textContent = 'Paciente Atendido';
            botonAtendido.onclick = () => cambiarEstado(estadoActual, 'Paciente Atendido');

            li.appendChild(botonEnEspera);
            li.appendChild(botonEnConsultorio);
            li.appendChild(botonAtendido);

            turnosList.appendChild(li);
        });
    };

    // Función para ingresar un nuevo paciente
    window.ingresarPaciente = () => {
        const nombreInput = document.getElementById('nombre');
        const apellidoInput = document.getElementById('apellido');

        const nombre = nombreInput.value.trim();
        const apellido = apellidoInput.value.trim();

        if (nombre && apellido) {
            const paciente = {
                nombre,
                apellido,
                estado: 'Paciente en Espera',
            };

            turnos.push(paciente);
            localStorage.setItem('turnos', JSON.stringify(turnos));
            console.log(paciente);
            actualizarTurnos();

            // Limpiar campos para nuevo paciente
            nombreInput.value = '';
            apellidoInput.value = '';
        }
    };

    // Función para cambiar el estado del paciente
    const cambiarEstado = (estadoActual, nuevoEstado) => {
        turnos[estadoActual].estado = nuevoEstado;
        localStorage.setItem('turnos', JSON.stringify(turnos));
        actualizarTurnos();
    };

    // Inicializar la aplicación
    actualizarTurnos();
});
