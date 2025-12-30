document.addEventListener("DOMContentLoaded", () => {

    // === CONFIGURACIÓN DE FIREBASE ===
    const firebaseConfig = {
        apiKey: "AIzaSyAITOn24kRQLGoSIoLT1TM5Snv-1AraN_s",
        authDomain: "radio-willy-chat.firebaseapp.com",
        databaseURL: "https://radio-willy-chat-default-rtdb.firebaseio.com/",
        projectId: "radio-willy-chat",
        storageBucket: "radio-willy-chat.firebasestorage.app",
        messagingSenderId: "593328601256",
        appId: "1:593328601256:web:26d6d1be628a278a042a9d",
        measurementId: "G-9JNCKV30T3"
    };

    // === VERIFICAR QUE FIREBASE EXISTA ===
    if (typeof firebase === "undefined") {
        console.error("Firebase no está cargado");
        return;
    }

    // === INICIALIZAR FIREBASE ===
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.database();
    const mensajesRef = db.ref("mensajes");

    // === ELEMENTOS DEL CHAT ===
    const inpNombre = document.getElementById("nombreInput");
    const inpMensaje = document.getElementById("mensajeInput");
    const btnEnviar = document.getElementById("enviarBtn");
    const areaChat = document.getElementById("chatMessages");

    // === ENVIAR MENSAJE ===
    if (btnEnviar && inpNombre && inpMensaje) {
        btnEnviar.addEventListener("click", (e) => {
    e.preventDefault(); // 🚫 evita el doble envío

            const nombre = inpNombre.value.trim();
            const mensaje = inpMensaje.value.trim();

            if (nombre === "" || mensaje === "") return;

            mensajesRef.push({
                usuario: nombre,
                texto: mensaje,
                tiempo: Date.now()
            });

            inpMensaje.value = "";
        });
    }

    // === RECIBIR MENSAJES ===
    if (areaChat) {
        mensajesRef.limitToLast(50).on("child_added", (snapshot) => {
            const data = snapshot.val();

            const div = document.createElement("div");
            div.style.marginBottom = "8px";
            div.innerHTML = `
                <b style="color:#00ffff">${data.usuario}:</b>
                <span style="color:white">${data.texto}</span>
            `;

            areaChat.appendChild(div);
            areaChat.scrollTop = areaChat.scrollHeight;
        });
    }

});

