//importa funcoes do react necessarias para criar e usar contexto
import { createContext, useState, useContext, children } from "react";
import secureLocalStorage from "react-secure-storage";

const AuthContext = createContext();

//esse componente vai envolver a aplicacao(ou parte dela) e ofereceer os dados de autenticacao par os filhos
//criar os contexto de autenticacao, que vai permitir compartilhar os dados de autenticacao para os filhos
//provider = provedor(a) prover/dar
export const AuthProvider = ({ children }) => {
    //cria um estado que guarda os dados do usuario logado
    const [usuario, setUsuario] = useState(() => {
        const usuarioSalvo = secureLocalStorage.getItem("tokenLogin")

        console.log(JSON.parse(usuarioSalvo));
        
        return usuarioSalvo ? JSON.parse(usuarioSalvo) : undefined;
    });

    return (

        //o AuthContext.Provider permite que qualquer componente dentro dele acesse o `usuario` e `setUsuario`
        //Faz com que qualquer componente qur deseja dentro de <AuthProvider>
        //consiga acessar o valor {usuario, setUsuario} usando o hook useAuth();
        <AuthContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

// esse hooks personalizado facilita o acesso ao contexto dentro de qualquer componente
//USAR!!
//vai usar nas telas que eu preciso dessas informacoes 
export const useAuth = () => useContext(AuthContext);