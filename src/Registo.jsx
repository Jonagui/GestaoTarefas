import { useState } from 'react'
import './registo.css'
import { useNavigate } from 'react-router-dom'

function Registo(event){

        const [Email, setEmail] = useState("")
        const [NovoUtilizador, setNovoUtilizador] = useState("")
        const [NovaSenha, setNovaSenha] = useState("")
        const navigate = useNavigate()

    function handleEnviar(event){

        event.preventDefault()

        if(Email && NovoUtilizador && NovaSenha){

            alert("Formulário enviado com Sucesso, "  + NovoUtilizador + "!")
            alert("Aguarde nosso Retorno!")
            navigate("/")

        } else{
            alert("Preencha todos campos obrigatorios!")
        }

        console.log(Email , NovoUtilizador, NovaSenha) 

    }


    return(

        <div className="container">
            
            <section>
                <h1>Formulário Registo</h1>
                <form onSubmit={handleEnviar}>
                    <input type="text" className="Email" placeholder="Insira seu Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" className="NovoUtilizador" placeholder="Crie um Utilizador" onChange={(e) => setNovoUtilizador(e.target.value)} />
                    <input type="password"className="NovaSenha" placeholder="Insira uma Senha" onChange={(e) => setNovaSenha(e.target.value)} />
                    <button className="Enviar"> Enviar </button>
                </form>
            </section>
                       
        </div>
    )

}

export default Registo