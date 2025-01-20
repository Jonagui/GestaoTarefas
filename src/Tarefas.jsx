import { useState } from "react"
import './tarefas.css'

function Tarefas(){

    const [listaTarefas, setlistaTarefas] = useState([])

    const [Descricao, setDescricao] = useState("")
    const [ComboBox, setComboBox] = useState("")
    const [data, setData] = useState("")

    function handleaddTarefa(event){
        event.preventDefault()
        
        if(Descricao && ComboBox && data){
            
            setlistaTarefas([...listaTarefas, {Descricao, ComboBox, data, status: "Pendente"}])

            alert("Dados adicionados com sucesso!")

            setComboBox("")
            setData("")
            setDescricao("")

        }else{
            alert("Preencha todos campos obrigatorios!")
        }
                
    }

    function handleConcluir(index){

        const novasTarefas = [...listaTarefas]
        novasTarefas[index].status = "Concluida"
        setlistaTarefas(novasTarefas)

    }

    function handleEditar(index) {
        const tarefa = listaTarefas[index];
        setDescricao(tarefa.descricao);
        setComboBox(tarefa.tipo);
        setData(tarefa.data);

        
        const novasTarefas = listaTarefas.filter((_, i) => i !== index);
        setlistaTarefas(novasTarefas);
    }

    function handleApagar(index){

        const novasTarefas = listaTarefas.filter((_, i) => i !== index);
        setlistaTarefas(novasTarefas);

    }


    return (
                <div>
                    <div>
                        
                        <div>
                            <form onSubmit={handleaddTarefa}>
                                <h1>Gestão de Tarefas</h1>
                                <input type="text" className="descricao" placeholder="Insira a descrição" onChange={(e) => setDescricao(e.target.value)} />
                                <div>
                                    <select id="ComboBox" onChange={(e) => setComboBox(e.target.value)}>
                                    <option value="">Selecione o Tipo</option>
                                        <option value="Pessoais">Pessoais</option>
                                        <option value="Profissionais">Profissionais</option>
                                        <option value="Domesticas">Domesticas</option>
                                        <option value="Academicas">Academicas</option>
                                        <option value="Saude - Bem-estar">Saude - Bem-estar</option>
                                        <option value="Financeiras">Financeiras</option>
                                        <option value="Emergenciais">Emergenciais</option>
                                    </select>
                                    <input type="date" className="data" onChange={(e) => setData(e.target.value)}  />
                                </div>
                                <button className="Adicionar">Adicionar</button>
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
                                    {listaTarefas.map((tarefa, index) => (
                                        <tr key={index}>                                            
                                            <td>{tarefa.Descricao}</td>
                                            <td>{tarefa.ComboBox}</td>
                                            <td>{tarefa.data}</td>
                                            <td>{tarefa.status}</td>
                                            <td>
                                                {tarefa.status !== "Concluida" && (<button onClick={() => handleConcluir(index)}>Concluir</button>)}
                                                {tarefa.status !== "Concluida" && (<button onClick={() => handleEditar(index)}>Editar</button>)}
                                                {tarefa.status == "Concluida" && (<button onClick={() => handleApagar(index)}>Apagar</button>)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>                                
                            </table>
                        </div>
                    </div>
                </div>
    )

}

export default Tarefas