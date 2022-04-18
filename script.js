pegarCHAT();



let mensagens = [];
let pessoas = [];



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

    /////////////function scroll para ultimo elemento!!!/////
    function scroll() {
        const ultimoElemento = document.querySelector(".chat").querySelectorAll(".mensagens");
        ultimoElemento[ultimoElemento.length- 1].scrollIntoView();

    };
    setInterval(scroll, 3000);
}


let nome;

function entrarCHAT() {
    nome = document.getElementById("login").value;

    const login = {
        name: nome
    };
        const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', login);
        //com sucesso = then
        //let tirar = document.querySelectorAll(".tirar");
        promise.then(console.log("oi"));
            
        document.querySelectorAll(".tirar")[0].classList.remove("tela-escondida");
        document.querySelectorAll(".tirar")[1].classList.remove("tela-escondida");
        document.querySelectorAll(".tirar")[2].classList.remove("tela-escondida");
        document.querySelectorAll(".tirar")[3].classList.remove("tela-escondida");
        document.querySelector(".tela-inicial").classList.add("tela-escondida");
        
            
        //deu ruim = catch
        promise.catch(function() {
            alert('Por favor insira outro nome, esse já está em uso.');
        })



    /////////////////////////////// CHECAGEM SE ESTÁ ONLINE ///////////////
    setInterval(continuaOn,5000);
    function continuaOn () {
        const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', login);
        console.log(promise);
        promise.then(console.log("continuaON!"));
        
        promise.catch(function() {
            console.log("caiuuuuu!")
        });
    }
}


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

        const sidebar = document.querySelector(".sidebar");
        const backg = document.querySelector(".dark-bkg");
        if (sidebar.classList.contains("show-menu") == false){
            sidebar.classList.add("show-menu");
            backg.classList.add("on");
        } else {
            sidebar.classList.remove("show-menu");
            backg.classList.remove("on");
        }
    
    chargeNames();
    
    function chargeNames() {
        const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    promise.then(carregarNames);

    }
    setInterval(chargeNames, 10000);
    function carregarNames (response) {
        pessoas = response.data;
    

    const todosnomes = document.querySelector(".nomes-pessoas");
    todosnomes.innerHTML = "";

        for(let i=0 ; i < pessoas.length ; i++) {
            todosnomes.innerHTML += `
            <div onclick="escolherPessoa(this)" class="alinhar">
            
            <div class="nome-pessoa align">
            
            <ion-icon class="sidebarIcon" name="person-circle"></ion-icon>
            <p>${pessoas[i].name}</p>
            
            </div>
            
            <ion-icon class="checkinho check-none" name="checkmark"></ion-icon>
            
            </div>
            `;
        }
    }   
}
//////// SELECIONAR UMA PESSOA PARA FALAR RESERVADO /////////

function escolherPessoa(elemento) {
    const selecionar = elemento.querySelector(".checkinho")
    const arraynomes = document.querySelector(".sidebar").querySelectorAll(".alinhar");

    if (selecionar.classList.contains("check-none") == true){
        selecionar.classList.remove("check-none");
        selecionar.classList.add("check");
    } else {
        selecionar.classList.add("check-none");
        selecionar.classList.remove("check");
    }/////NAO TA MARCANDO///////////
    
    for(let i = 0 ; i < arraynomes.length ; i++) {
        if ((arraynomes[i].lastElementChild) == document.querySelector(".check")){

            arraynomes[i].lastElementChild.classList.remove("check");
            arraynomes[i].lastElementChild.classList.add("check-none");

            let nomeEnviado = arraynomes[i].outerText;
            const enviando = document.querySelector(".escreva");
            enviando.innerHTML = `
            <input type="text" id="mensagem" placeholder="Escreva aqui...">
            <p class="enviar-para">Enviando para ${nomeEnviado} reservadamente...</p>
            `;
        }    
    }    
}



function escolherTodos() {
    const selecionarTodos = document.querySelector(".todos").querySelector(".alinhando").querySelector(".checkinho");

    if (selecionarTodos.classList.contains("check-none") == true){
        selecionarTodos.classList.remove("check-none");
        selecionarTodos.classList.add("check");
        document.querySelector(".escreva").innerHTML = `
        <input type="text" id="mensagem" placeholder="Escreva aqui...">
        `;
    } else{
        selecionarTodos.classList.add("check-none");
        selecionarTodos.classList.remove("check");
    }
}

            /*para selectionar diferente todos de pessoas nao sei??:
            document.querySelector(".todos").querySelector(".alinhando").querySelector(".checkinho").classList.add("check-none");
            document.querySelector(".todos").querySelector(".alinhando").querySelector(".checkinho").classList.remove("check");*/