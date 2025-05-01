const mesAno = document.querySelector('#mesAno');
const dias = document.querySelector('#dias');
const tabelaAgenda = document.querySelector('#tabelaAgenda');
const diaSelecionadoTitulo = document.querySelector('#diaSelecionado');

let mes = new Date().getMonth();
let ano = new Date().getFullYear();
let diaAtivo = null;

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function atualizarCabecalho() {
  mesAno.innerHTML = `${meses[mes]} de ${ano}`;
}

function criarDias() {
  dias.innerHTML = '';
  let quantidadeDias = new Date(ano, mes + 1, 0).getDate();

  for (let i = 1; i <= quantidadeDias; i++) {
    let dia = document.createElement('div');
    dia.classList.add('dia');
    dia.textContent = i;

    dia.addEventListener('click', () => {
      selecionarDia(i);
    });

    dias.appendChild(dia);
  }
}

function selecionarDia(dia) {
  diaAtivo = dia;
  diaSelecionadoTitulo.textContent = `Agenda do dia ${dia} de ${meses[mes]} de ${ano}`;
  gerarTabelaHorarios();
}

function gerarTabelaHorarios() {
  const horarios = [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const tbody = tabelaAgenda.querySelector('tbody');
  tbody.innerHTML = ''; // limpa antes de criar

  horarios.forEach(horario => {
    const tr = document.createElement('tr');

    const tdHorario = document.createElement('td');
    tdHorario.textContent = horario;

    const tdTarefa = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Digite sua tarefa...';

    tdTarefa.appendChild(input);

    tr.appendChild(tdHorario);
    tr.appendChild(tdTarefa);
    tbody.appendChild(tr);
    // Botão de salvar a tarefa
    const botaoSalvar = document.createElement('button');
    botaoSalvar.textContent = 'Salvar';
    botaoSalvar.addEventListener('click', () => {
      const tarefa = input.value;
      if (tarefa) {
        salvarTarefa(diaAtivo, horario, tarefa);
      }
    });
    tr.appendChild(botaoSalvar);    

    tabelaAgenda.appendChild(tbody);

    // Botão de excluir a tarefa
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.addEventListener('click', () => {
      excluirTarefa(diaAtivo, horario);
    });
    tr.appendChild(botaoExcluir);   
  });

//   Armazenado tarefas em localStorage
  function salvarTarefa(dia, horario, tarefa) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || {};
    tarefas[dia] = tarefas[dia] || {};
    tarefas[dia][horario] = tarefa;
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  // Funcionalidade de excluir a tarefa
  function excluirTarefa(dia, horario) {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || {};
    delete tarefas[dia][horario];
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    gerarTabelaHorarios();
  }
}

// Armazenado tarefas em localStorage
function salvarTarefa(dia, horario, tarefa) {
  const tarefas = JSON.parse(localStorage.getItem('tarefas')) || {};
  tarefas[dia] = tarefas[dia] || {};
  tarefas[dia][horario] = tarefa;
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Recuperar tarefas do localStorage
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || {};
for (const dia in tarefas) {
  for (const horario in tarefas[dia]) {
    const tarefa = tarefas[dia][horario];
    salvarTarefa(dia, horario, tarefa);
  }
}

// Botões de navegação de mês
document.querySelector('#prev').addEventListener('click', () => {
  mes--;
  if (mes < 0) {
    mes = 11;
    ano--;
  }
  atualizarCabecalho();
  criarDias();
});

document.querySelector('#next').addEventListener('click', () => {
  mes++;
  if (mes > 11) {
    mes = 0;
    ano++;
  }
  atualizarCabecalho();
  criarDias();
});

// Inicializar
atualizarCabecalho();
criarDias();
