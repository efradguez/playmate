const alerts = [

{
    title:"Contenido sospechoso detectado",
    text:"Se detectó acceso a un sitio potencialmente peligroso."
},

{
    title:"Posible ciberacoso",
    text:"La IA detectó lenguaje ofensivo en una conversación."
},

{
    title:"Navegación segura",
    text:"El menor completó navegación educativa segura."
}

];

const container =
document.getElementById("alertsContainer");

alerts.forEach(alert => {

    container.innerHTML += `

    <div class="alert-box">

        <h2>${alert.title}</h2>

        <p>${alert.text}</p>

    </div>

    `;

});
