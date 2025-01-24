import { useState, useEffect } from "react";
import './tarefas.css';
import axios from 'axios';

function Tarefas() {
    const [listaTarefas, setListaTarefas] = useState([]);
    const [Descricao, setDescricao] = useState("");
    const [ComboBox, setComboBox] = useState("");
    const [data, setData] = useState("");
    const [filtroTarefas, setFiltroTarefas] = useState([]);

    useEffect(() => {
        fetchTarefas();
    }, []);

    const fetchTarefas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tarefas');
            console.log(response.data);  // Verifique os dados no console
            setListaTarefas(response.data);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        }
    };

    const handleAddTarefa = async (event) => {
        event.preventDefault();

        if (Descricao && ComboBox && data) {
            try {
                await axios.post('http://localhost:5000/tarefas', {
                    descricao: Descricao,
                    tipo: ComboBox,
                    data,
                });
                alert("Dados adicionados com sucesso!");
                setDescricao("");
                setComboBox("");
                setData("");
                fetchTarefas();
            } catch (error) {
                console.error("Erro ao adicionar tarefa:", error);
            }
        } else {
            alert("Preencha todos campos obrigatórios!");
        }
    };

    const handleConcluir = async (id) => {
        try {
            await axios.put(`http://localhost:5000/tarefas/${id}/concluir`);
            fetchTarefas();
        } catch (error) {
            console.error("Erro ao concluir tarefa:", error);
        }
    };

    const handleApagar = async (id) => {
        const confirmacao = confirm("Tem certeza que deseja excluir?");
        if (confirmacao) {
            try {
                await axios.delete(`http://localhost:5000/tarefas/${id}`);
                fetchTarefas();
            } catch (error) {
                console.error("Erro ao excluir tarefa:", error);
            }
        }
    };

    const handlePesquisar = (event) => {
        event.preventDefault();
        const resultados = listaTarefas.filter((tarefa) => {
            return (
                (Descricao && tarefa.descricao.includes(Descricao)) ||
                (ComboBox && tarefa.tipo.includes(ComboBox)) ||
                (data && tarefa.data.includes(data))
            );
        });
        setFiltroTarefas(resultados);
    };

    const handleLimparPesquisa = () => {
        setFiltroTarefas([]);
        setDescricao("");
        setComboBox("");
        setData("");
    };

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
                            {(filtroTarefas.length > 0 ? filtroTarefas : listaTarefas).map((tarefa) => (
                                <tr key={tarefa.id}>
                                <td>{tarefa.descricao}</td>
                                <td>{tarefa.tipo}</td>
                                <td>{tarefa.data}</td>
                                <td>{tarefa.status}</td>
                                <td>
                                    {tarefa.status !== "Concluída" && (
                                    <>
                                        <button onClick={() => handleConcluir(tarefa.id)}>Concluir</button>
                                        <button onClick={() => handleEditar(tarefa.id)}>Editar</button>
                                    </>
                                    )}
                                    {tarefa.status === "Concluída" && (
                                    <button onClick={() => handleApagar(tarefa.id)}>Apagar</button>
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
