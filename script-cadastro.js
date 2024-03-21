const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const snome = document.querySelector('#m-nome')
const sfuncao = document.querySelector('#m-funcao')
const sidade = document.querySelector('#m-idade')
const squalificacao = document.querySelector('#m-qualificacao')
const btnCadastrar = document.querySelector('#btnCadastrar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    snome.value = itens[index].nome
    sidade.value = itens[index].idade
    sfuncao.value = itens[index].funcao
    squalificacao.value = itens[index].qualificacao
    id = index
  } else {
    snome.value = ''
    sidade.value = ''
    sfuncao.value = ''
    squalificacao.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.idade}</td>
    <td>${item.funcao}</td>
    <td>${item.qualificacao}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnCadastrar.onclick = e => {
  
  if (snome.value == '' || sidade.value == '' || sfuncao.value == '' || squalificacao.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = snome.value
    itens[id].idade = sidade.value
    itens[id].funcao = sfuncao.value
    itens[id].qualificacao = squalificacao.value
  } else {
    itens.push({'nome': snome.value, 'idade': sidade.value, 'funcao': sfuncao.value, 'qualificacao': squalificacao.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()