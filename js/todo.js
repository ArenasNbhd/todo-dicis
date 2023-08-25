const formulario = document.getElementById('formulario')
const listaTareas = document.getElementById('lista-tareas')
const template = document.getElementById('template').content //Content es para obtener solo su contenido, excluyendo el nombre de la etiqueta
const fragment = document.createDocumentFragment()

// Variable Global para las tareas, guardada como objeto
let tareas = {}

// Agregamos eventos
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})

const pintarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas))
    if (Object.values(tareas).length === 0){
        listaTareas.innerHTML = `
            <div class="alert alert-dark">
                No task pending
            </div>
        `
        return
    }
    listaTareas.innerHTML = ''
    Object.values(tareas).forEach((tarea) => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto
        if(tarea.estado) {
            clone.querySelectorAll('.fas')[0].classList.replace('fa-circle-chaeck', 'fa-undo-alt') //Icono izquierdo es actual, icono derecho con la que se reemplazará
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }
        clone.querySelector('.fas')[0].dataset.id = tarea.id
        clone.querySelector('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })
    listaTareas.appendChild(fragment)
}