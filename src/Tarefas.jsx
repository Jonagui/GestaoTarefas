import { useState } from "react";
import './tarefas.css';

function Tarefas() {
    const [listaTarefas, setListaTarefas] = useState([]);
    const [Descricao, setDescricao] = useState("");
    const [ComboBox, setComboBox] = useState("");
    const [data, setData] = useState("");
    const [filtroTarefas, setFiltroTarefas] = useState([]);

    function handleAddTarefa(event) {
        event.preventDefault();

        if (Descricao && ComboBox && data) {
            setListaTarefas([...listaTarefas, { Descricao, ComboBox, data, status: "Pendente" }]);
            alert("Dados adicionados com sucesso!");

            setComboBox("");
            setData("");
            setDescricao("");
        } else {
            alert("Preencha todos campos obrigatórios!");
        }
    }

    function handleConcluir(index) {
        const novasTarefas = [...listaTarefas];
        novasTarefas[index].status = "Concluída";
        setListaTarefas(novasTarefas);
    }

    function handleEditar(index) {
        const tarefa = listaTarefas[index];
        setDescricao(tarefa.Descricao);
        setComboBox(tarefa.ComboBox);
        setData(tarefa.data);

        const novasTarefas = listaTarefas.filter((_, i) => i !== index);
        setListaTarefas(novasTarefas);
    }

    function handleApagar(index, isFiltered) {
        const lista = isFiltered ? filtroTarefas : listaTarefas;
        const novasTarefas = lista.filter((_, i) => i !== index);
        const confirmacao = confirm("Tem certeza que deseja excluir?");
        if (confirmacao) {
            if (isFiltered) {
                setFiltroTarefas(novasTarefas);
                setListaTarefas(listaTarefas.filter((_, i) => i !== listaTarefas.indexOf(lista[index])));
            } else {
                setListaTarefas(novasTarefas);
            }
        }
    }

    function handlePesquisar(event) {
        event.preventDefault();
        const resultados = listaTarefas.filter((tarefa) => {
            return (
                (Descricao && tarefa.Descricao.includes(Descricao)) ||
                (ComboBox && tarefa.ComboBox.includes(ComboBox)) ||
                (data && tarefa.data.includes(data))
            );
        });
        setFiltroTarefas(resultados);
    }

    function handleLimparPesquisa() {
        setFiltroTarefas([]);
        setDescricao("");
        setComboBox("");
        setData("");
    }

    return (
        <div>
            <div>
                <div>
                    <form onSubmit={handleAddTarefa}>
                        <h1>Gestão de Tarefas</h1>
                        <input
                            type="text"
                            className="descricao"
                            placeholder="Insira a descrição"
                            value={Descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                        <div>
                            <select id="ComboBox" value={ComboBox} onChange={(e) => setComboBox(e.target.value)}>
                                <option value="">Selecione o Tipo</option>
                                <option value="Pessoais">Pessoais</option>
                                <option value="Profissionais">Profissionais</option>
                                <option value="Domésticas">Domésticas</option>
                                <option value="Acadêmicas">Acadêmicas</option>
                                <option value="Saúde - Bem-estar">Saúde - Bem-estar</option>
                                <option value="Financeiras">Financeiras</option>
                                <option value="Emergenciais">Emergenciais</option>
                            </select>
                            <input
                                type="date"
                                className="data"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                            />
                        </div>
                        <button className="Adicionar">Adicionar</button>
                        <div>
                            <button className="Pesquisar" onClick={handlePesquisar}>Pesquisar</button>
                            <button className="Limpar" type="button" onClick={handleLimparPesquisa}>Limpar Pesquisa</button>
                        </div>
                    </form>
                </div>
                <div className="tabela">
                    <table>
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Tipo</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(filtroTarefas.length > 0 ? filtroTarefas : listaTarefas).map((tarefa, index) => (
                                <tr key={index}>
                                    <td>{tarefa.Descricao}</td>
                                    <td>{tarefa.ComboBox}</td>
                                    <td>{tarefa.data}</td>
                                    <td>{tarefa.status}</td>
                                    <td>
                                        {tarefa.status !== "Concluída" && (
                                            <>
                                                <div>
                                                    <button onClick={() => handleConcluir(index)}>Concluir</button>
                                                    <button onClick={() => handleEditar(index)}>Editar</button>
                                                </div>
                                            </>
                                        )}
                                        {tarefa.status === "Concluída" && (
                                            <button onClick={() => handleApagar(index, filtroTarefas.length > 0)}>Apagar</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Tarefas;