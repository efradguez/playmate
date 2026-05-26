function sendMessage(){

    const input =
    document.getElementById("userInput");

    const chatBox =
    document.getElementById("chatBox");

    const userMessage = input.value;

    if(userMessage.trim() === "") return;

    chatBox.innerHTML += `
    <div class="message user">
        ${userMessage}
    </div>
    `;

    let response =
    "Recuerda nunca compartir información personal en internet.";

    if(userMessage.includes("youtube")){

        response =
        "Asegúrate de navegar solo en contenido apropiado para tu edad.";

    }

    if(userMessage.includes("extraño")){

        response =
        "Nunca hables con desconocidos en internet sin supervisión.";

    }

    setTimeout(() => {

        chatBox.innerHTML += `
        <div class="message bot">
            ${response}
        </div>
        `;

        chatBox.scrollTop =
        chatBox.scrollHeight;

    }, 700);

    input.value = "";

}