import "./Login.css";
import Logo from "../../assets/img/logo1.svg";
import Botao from "../../components/botao/Botao";
import api from "../../services/Service";
import { useState } from "react";
import { userDecodeToken } from "../../auth/Auth";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

//componente funcional , toda funcao tem um return
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { setUsuario } = useAuth();



    async function realizarAutenticacao(e) {
        e.preventDefault();
        const usuario = {
            email: email,
            senha: senha
        }
        if (senha.trim() != "" || email.trim() != "") {
            try {
                const resposta = await api.post("Login", usuario);
                const token = resposta.data.token

                if (token) {
                    const tokenDecodificado = userDecodeToken(token);
                    //console.log("Token decodificado");
                    console.log(tokenDecodificado);
                    
                    if (token) {
                        // Salve o token original (string) no storage seguro
                        // secureLocalStorage.setItem("tokenLogin", token);
                        
                        // Também pode guardar o decodificado pra usar dados do usuário facilmente
                        const tokenDecodificado = userDecodeToken(token);
                        setUsuario(tokenDecodificado);
                        secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokenDecodificado));

                        if (tokenDecodificado.tipoUsuario === "aluno") {
                            navigate("/ListagemEvento");
                        } else {
                            navigate("/CadastroEvento");
                        }
                    }
                }
            } catch (error) {
                console.log(error);
                alert("Email ou senha invalidos! para duvidas, entre em contato com o suporte")
            }
        } else {
            alert("preencha os campos vazios para realizar o login");
        }

    }


    return (
        <main className="login-container">
            <link rel="stylesheet" href="https://use.typekit.net/pam4ubo.css"></link>
            <div className="login-banner"></div>
            <section className="login-content">
                <img className="login-logo" src={Logo} alt="Event+" />

                <form action="" className="login-form" onSubmit={realizarAutenticacao}>
                    <div className="login-fields">

                        <div className="login-input">
                            <input type="email" name="nome" placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="login-input">
                            <input type="password" placeholder="Password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)} />
                        </div>

                        <p className="login-forgot-password">Esqueceu a senha?</p>
                    </div>

                    <Botao nomeDoBotao="Login" />
                </form>
            </section>
        </main>
    );
};
export default Login;