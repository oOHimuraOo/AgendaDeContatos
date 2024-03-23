// constantes globais -----------------------------------------------
const listaContatos = document.getElementById('lisContatos')
const addContato = document.getElementById('addContato')
const config = document.getElementById('config')

const escondedor1 = document.getElementById('escondedor1')
const escondedor2 = document.getElementById('escondedor2')
const escondedor3 = document.getElementById('escondedor3')

const formAddContato = document.getElementById('formAddContato')
const formProcContato = document.getElementById('formProcContato')
const procurar = document.getElementById('procurar')
const inputNome = document.getElementById('nome')
const inputNumero = document.getElementById('numero')

const idiomas = document.getElementById('idiomas')
const estilo = document.getElementById('estilo')
const limparTudo = document.getElementById('limparTUDO')

// variaveis globais ---------------------------------------------------
var contatos = []
var nomes = []
var numeros = []
var linhas = ''

var contatosLista = []
var nomesLista = []
var numerosLista = []
var itens = ''

if (localStorage.getItem('contatos') !== null){
    carregarInformacoes()
    if (estilo.value == 0){
        attTabela()
        attContadorFinal()
    }
    else{
        attList()
    }
}


// eventos ---------------------------------------------------------------

listaContatos.addEventListener("click",function(){
    escondedor1.classList.remove('hidden')
    escondedor1.classList.add('shown')

    escondedor2.classList.remove('shown')
    escondedor2.classList.add('hidden')

    escondedor3.classList.remove('shown')
    escondedor3.classList.add('hidden')
})

addContato.addEventListener("click",function(){
    escondedor1.classList.remove('hidden')
    escondedor1.classList.add('shown')

    escondedor2.classList.remove('hidden')
    escondedor2.classList.add('shown')

    escondedor3.classList.remove('shown')
    escondedor3.classList.add('hidden')
})

config.addEventListener("click",function(){
    escondedor1.classList.remove('shown')
    escondedor1.classList.add('hidden')

    escondedor2.classList.remove('shown')
    escondedor2.classList.add('hidden')

    escondedor3.classList.remove('hidden')
    escondedor3.classList.add('shown')
})

formAddContato.addEventListener("submit", function(e){
    e.preventDefault()
    if (estilo.value == 0){
        if (!validarNome()){
            alert('O nome digitado é invalido')
        }
        else{
            addLinha()
            attTabela()
            attContadorFinal()
        }
    }
    else{
        if (!validarNome()){
            alert('O nome digitado é invalido')
        }
        else{
            addItem()
            attList()
        }
    }
})

inputNumero.addEventListener('input',function(e){
    formatarTelefone(e)
})

formProcContato.addEventListener('submit', function(e){
    e.preventDefault()

    if (estilo.value == 0) {
        localizarContato()
    }
    else {
        localizarContatoLista()
    }
    
})

formProcContato.addEventListener('reset',function(e){
    e.preventDefault()
    if (estilo.value == 0) {
        limparPesquisa()
    }
    else{
        limparPesquisaLista()
    }
    
})

estilo.addEventListener('change', function(e){
    if (parseInt(estilo.value) == 1){
        sincronizarInformacoesEntreAgendas()
        window.location.href = './modoLista.html'
    }
    else {
        sincronizarInformacoesEntreAgendas()
        window.location.href = './index.html'
    }
})

limparTudo.addEventListener("click", function(e){
    apagarInformacoes()
})

//funções --------------------------------------------------------

function addLinha(){
    if (nomes.includes(inputNome.value)) {
        alert('Nome já incluso na Agenda de contatos')
    }
    else {
        if (numeros.includes(inputNumero.value)){
            alert('Numero já incluso na Agenda de contatos')
        }
        else {
            nomes.push(inputNome.value)
            numeros.push(inputNumero.value)
    
            var linha = '<tr class="contato">'
            linha += `<td>${inputNome.value}</td>`
            linha += `<td>${inputNumero.value}</td>`
            linha += '</tr>'
        
            linhas += linha    
        }
    }

    inputNome.value = ''
    inputNumero.value = ''

}

function attTabela(){
    const corpoTabela = document.querySelector('tbody')
    contatos = document.getElementsByClassName('contato')
    if (corpoTabela){
        corpoTabela.innerHTML = linhas
    }
    else{
        console.error("Elemento 'tbody' não encontrado.")
    }
    
}

function attContadorFinal(){
    const numeroTotalC = document.getElementById('numeroTotalC')
    if (numeroTotalC){
        numeroTotalC.innerHTML = nomes.length
    }
}

function localizarContato(){
    if (procurar.value === '') {
        limparPesquisa()
    }
    else{
        if (nomes.includes(procurar.value)){
            for (var i = 0; i < nomes.length; i++){
                if (nomes[i] === procurar.value){
                    contatos[i].classList.remove('hidden')
                    contatos[i].classList.add('shownTable')
                }
                else{
                    contatos[i].classList.remove('shownTable')
                    contatos[i].classList.add('hidden')
                }
            }
        }
        else{
            alert('Nome ainda não registrado na agenda')
        }
    }

    procurar.value = ''
}

function limparPesquisa(){
    for (var i = 0; i < nomes.length; i++){
        contatos[i].classList.remove('hidden')
        contatos[i].classList.remove('shownTable')
    }
}

function formatarTelefone(event) {
    var telefone = inputNumero.value;
    
    telefone = telefone.replace(/\D/g, '');

    if (event.inputType === 'deleteContentBackward'){
        return
    }

    if (telefone.length >= 2 && telefone.length <= 5) {
        telefone = '(' + telefone.substring(0, 3) + ') ' + telefone.substring(3);
    } else if (telefone.length === 8){
        telefone = telefone.substring(0,4) + '-' + telefone.substring(4,8)
    } else if (telefone.length >= 6 && telefone.length <= 10) {
        telefone = '(' + telefone.substring(0, 3) + ') ' + telefone.substring(3, 7) + '-' + telefone.substring(7);
    } else if (telefone.length > 10) {
        telefone = '(' + telefone.substring(0, 3) + ') ' + telefone.substring(3, 7) + '-' + telefone.substring(7, 11);
    }
    
    inputNumero.value = telefone;
}

function validarNome(){
    const nomeArray = inputNome.value.split(' ')
    return nomeArray.length >= 2
}

//funcoes modo lista ----------------------------------------------------------------------------------------------------------

function addItem (){
    if (nomesLista.includes(inputNome.value)) {
        alert('Nome já incluso na Agenda de contatos')
    }
    else {
        if (nomesLista.includes(inputNumero.value)){
            alert('Numero já incluso na Agenda de contatos')
        }
        else {
            nomesLista.push(inputNome.value)
            numerosLista.push(inputNumero.value)
    
            var item = `<div class="organizadora2">`
            item += `<img id="imagemnalista" src="./Images/perfil.png" alt="imagem de perfil padrão">`
            item += `<ul class="contato">`
            item += `<li id="nomenalista">${inputNome.value}</li>`
            item += `<li id="numeronalista">${inputNumero.value}</li>`
            item += `</ul>`
            item += '</div>'
        
            itens += item    
        }
    }

    inputNome.value = ''
    inputNumero.value = ''

}

function attList(){
    const corpolist = document.getElementById('lista')
    contatosLista = document.getElementsByClassName('contato')
    if (corpolist){
        corpolist.innerHTML = itens
    }
    else{
        console.error("Elemento 'lista' não encontrado.")
    }
}

function localizarContatoLista(){
    if (procurar.value === '') {
        limparPesquisaLista()
    }
    else{
        if (nomesLista.includes(procurar.value)){
            for (var i = 0; i < nomesLista.length; i++){
                if (nomesLista[i] === procurar.value){
                    contatosLista[i].classList.remove('hidden')
                    contatosLista[i].classList.add('shown')
                }
                else{
                    contatosLista[i].classList.remove('shown')
                    contatosLista[i].classList.add('hidden')
                }
            }
        }
        else{
            alert('Nome ainda não registrado na agenda')
        }
    }

    procurar.value = ''
}

function limparPesquisaLista(){
    for (var i = 0; i < nomesLista.length; i++){
        contatosLista[i].classList.remove('hidden')
        contatosLista[i].classList.remove('shown')
    }
}

function sincronizarInformacoesEntreAgendas() {
    if (estilo.value == 0) {
        nomes = nomesLista.slice();
        numeros = numerosLista.slice();

        linhas = '';

        for (var i = 0; i < nomes.length; i++) {
            var linha = '<tr class="contato">'
            linha += `<td>${nomes[i]}</td>`
            linha += `<td>${numeros[i]}</td>`
            linha += '</tr>'
        
            if (!linhas.includes(linha)){
                linhas += linha 
            }
        }
        attTabela();
        attContadorFinal();
    } else {
        nomesLista = nomes.slice();
        numerosLista = numeros.slice();
        
        itens = '';

        for (var i = 0; i < nomesLista.length; i++) {

            var item = `<div class="organizadora2">`
            item += `<img id="imagemnalista" src="./Images/perfil.png" alt="imagem de perfil padrão">`
            item += `<ul class="contato">`
            item += `<li id="nomenalista">${nomesLista[i]}</li>`
            item += `<li id="numeronalista">${numerosLista[i]}</li>`
            item += `</ul>`
            item += '</div>'
        
            if (!itens.includes(item)){
                itens += item
            }
        }
        attList();
    }
    salvarInformacoes();
}

function salvarInformacoes(){
    localStorage.setItem('contatos', JSON.stringify(contatos))
    localStorage.setItem('nomes', JSON.stringify(nomes))
    localStorage.setItem('numeros', JSON.stringify(numeros))
    localStorage.setItem('linhas', JSON.stringify(linhas))
    
    localStorage.setItem('contatosLista', JSON.stringify(contatosLista))
    localStorage.setItem('nomesLista', JSON.stringify(nomesLista))
    localStorage.setItem('numerosLista', JSON.stringify(numerosLista))
    localStorage.setItem('itens', JSON.stringify(itens))
}

function apagarInformacoes(){
    localStorage.removeItem('contatos')
    localStorage.removeItem('nomes')
    localStorage.removeItem('numeros')
    localStorage.removeItem('linhas')

    localStorage.removeItem('contatosLista')
    localStorage.removeItem('nomesLista')
    localStorage.removeItem('numerosLista')
    localStorage.removeItem('itens')
}

function carregarInformacoes(){
    contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    nomes = JSON.parse(localStorage.getItem('nomes')) || [];
    numeros = JSON.parse(localStorage.getItem('numeros')) || [];
    linhas = JSON.parse(localStorage.getItem('linhas')) || '';

    contatosLista = JSON.parse(localStorage.getItem('contatosLista')) || [];
    nomesLista = JSON.parse(localStorage.getItem('nomesLista')) || [];
    numerosLista = JSON.parse(localStorage.getItem('numerosLista')) || [];
    itens = JSON.parse(localStorage.getItem('itens')) || '';
}