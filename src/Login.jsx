import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

function Login({setAutenticado}){

    const [Utilizador, setUtilizador] = useState("")
    const [Senha, setSenha] = useState("")
    const navigate = useNavigate()


    function handleEntrar(event){
        event.preventDefault()

        if(Utilizador == "Jonagui" && Senha == "qwerty"){
            

            alert("Login realizado com sucesso! " + Utilizador)
            
            setAutenticado(true)

            navigate("/tarefas")

        }else{
            alert("Dados Inválidos!")
        }
        
        
    }

    return (
        <div className="container">
            <section>
                <h1>Acesse o Sistema</h1>
                    <form onSubmit={handleEntrar}>
                        <div><input type="text" className="Utilizador" placeholder="Utilizador" onChange={(e) => setUtilizador(e.target.value)} /></div>
                        <div><input type="password" className="Senha" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} /></div>
                        <button className="Entrar"> Entrar </button>
                        <div className='registo'>Não possui cadastro:<a href="./registo"> Clique aqui!</a></div>
                    </form>
            </section>
        </div>
    )
        
}

export default Login