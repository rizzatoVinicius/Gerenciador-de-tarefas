document.addEventListener('DOMContentLoaded', function() {
    let buttonAdicionarTarefa = document.getElementById('buttonAdicionarTarefa');
    let divAdicionarTarefa = document.getElementById('adicionar-tarefa');
    let formAdicionarTarefa = document.getElementById('formAdicionarTarefa');
    let accordionTarefas = document.getElementById('accordionTarefas');

    carregarTarefas();

    buttonAdicionarTarefa.addEventListener('click', function() {
        if (divAdicionarTarefa.style.display === 'none' || divAdicionarTarefa.style.display === '') {
            divAdicionarTarefa.style.display = 'block';
            buttonAdicionarTarefa.innerText = "Fechar";
        } else {
            divAdicionarTarefa.style.display = 'none';
            buttonAdicionarTarefa.innerText = "Adicionar Tarefa";
        }
    });

    formAdicionarTarefa.addEventListener('submit', function(e) {
        e.preventDefault();
        let nomeTarefa = document.getElementById('inputNomeTarefa').value;
        let descricaoTarefa = document.getElementById('inputDescricaoTarefa').value;

        adicionarTarefa(nomeTarefa, descricaoTarefa);

        formAdicionarTarefa.reset();
        divAdicionarTarefa.style.display = 'none';
        buttonAdicionarTarefa.innerText = "Adicionar Tarefa";

        carregarTarefas();
    });


    function adicionarTarefa(nome, descricao) {
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        let novaTarefa = {
            id: new Date().getTime(), // Id único baseado no timestamp
            nome: nome,
            descricao: descricao,
            concluida: false
        };

        tarefas.push(novaTarefa);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }


    function carregarTarefas() {
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    
        accordionTarefas.innerHTML = '';
    
        tarefas.forEach(function(tarefa) {
            let status = tarefa.concluida ? ' (Concluída)' : '';
    
            let tarefaHtml = `
                <div class="accordion-item">
                    <h2 class="accordion-header ${tarefa.concluida ? 'bg-success' : ''}">
                        <button class="accordion-button ${tarefa.concluida ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" 
                                data-bs-target="#tarefa-${tarefa.id}" aria-expanded="${tarefa.concluida ? 'true' : 'false'}">
                            ${tarefa.nome}${status}
                        </button>
                    </h2>
                    <div id="tarefa-${tarefa.id}" class="accordion-collapse collapse ${tarefa.concluida ? 'show' : ''}">
                        <div class="accordion-body">
                            ${tarefa.descricao}
                            <div>
                                ${!tarefa.concluida ? `<button class="btn btn-success mt-2" onclick="concluirTarefa(${tarefa.id})">Concluir</button>` : ''}
                                <button class="btn btn-danger mt-2" onclick="excluirTarefa(${tarefa.id})">Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            accordionTarefas.innerHTML += tarefaHtml;
        });
    }
    

    window.concluirTarefa = function(id) {
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    
        tarefas.forEach(function(tarefa) {
            if (tarefa.id === id) {
                tarefa.concluida = true;
            }
        });
    
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        carregarTarefas();
    }
    
    

    window.excluirTarefa = function(id) {
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        tarefas = tarefas.filter(function(tarefa) {
            return tarefa.id !== id;
        });

        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        carregarTarefas();
    }


});








