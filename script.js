pegarCHAT();



let mensagens = [];



/////////TRAZENDO A LIB AXIOS PARA O CHAT/////////
function pegarCHAT () {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(carregarAxios);

    function carregarAxios (response) {
        mensagens = response.data;
        carregarMensagens ()
        
    }
}

//////////SET INTERVAL PARA ATUALIZAR////////////////////
setInterval(pegarCHAT, 3000);



/////////MENSAGENS QUE SERÃO CARREGADAS/////////
function carregarMensagens () {
    const chatNormal = document.querySelector(".chat");
    chatNormal.innerHTML = "";

    for(let i=0 ; i < mensagens.length ; i++) {
        if (mensagens[i].type === "message"){
            chatNormal.innerHTML += `
            <div class="mensagens normal">
            <p class="tempo">${mensagens[i].time}</p>
            <p class="nome">${mensagens[i].from}</p>
            <p class="mensagem">${mensagens[i].text}</p>
            </div>
            `;
        }
    
        if (mensagens[i].type === "status"){
            chatNormal.innerHTML += `
            <div class="mensagens status">
            <p class="tempo">${mensagens[i].time}</p>
            <p class="nome">${mensagens[i].from}</p>
            <p class="mensagem">${mensagens[i].text}</p>
            </div>
            `;
        }

        if (mensagens[i].type == "private_message"){
            chatNormal.innerHTML += `
            <div class="mensagens reservada">
            <p class="tempo">${mensagens[i].time}</p>
            <p class="nome">${mensagens[i].from}</p>
            <p class="mensagem">${mensagens[i].text}</p>
            </div>
            `;
        }
    }

    /////////////function scroll nao ta funcionando/////
    function scroll() {
        let repete = mensagens[mensagens.length - 3];
        if (repete == true) {
            repete.scrollIntoView();
        }

    };
    setInterval(scroll, 3000);
}


let nome;

function entrarCHAT() {
    nome = prompt("Qual seu nome, consagrado?");

    const login = {
        name: nome
    };
        const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', login);
        //com sucesso = then
        promise.then(console.log("entrou!"));
        //deu ruim = then
        promise.catch(function() {
            alert('Por favor insira outro nome, esse já está em uso.');
        })
    /////////////////////////////// como sai e deixa de ficar online? ///////////////
    setInterval(continuaOn,5000);
    function continuaOn () {
        const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', login);
        console.log(promise);
        promise.then(console.log("continuaON!"));
        
        promise.catch(function() {
            console.log("caiuuuuu!")
        });
    }
}////////quando fizer a tela bonus, document.querySelector("login").value (no input)///////


function envioMensagem () {
    const mensagemDigitada = document.getElementById("mensagem").value;
    

    const mensagemEnviada = ({
        from: nome,
        to: "Todos",
        text: mensagemDigitada,
        type: "message" // ou "private_message" para o bônus
    });

    console.log(mensagemDigitada);
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagemEnviada);
    console.log(promise);
    promise.then(pegarCHAT);
    
    promise.catch(function() {
        window.location.reload();
    });
}

function participantes() {
    
}


