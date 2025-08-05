import "./ListagemEvento.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Modal from "../../components/modal/modal";
import Swal from "sweetalert2";
import nuvem from "../../assets/img/nuvem.png";
import descricao from "../../assets/img/informacao.png";
import api from "../../services/Service";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Toggle from "../../components/toggle/Toggle";
import { useAuth } from "../../context/AuthContext";

const ListagemEvento = () => {
    const [listaEventos, setListaEvento] = useState([]);
    const [tipoModal, setTipoModal] = useState("");
    const [dadosModal, setDadosModal] = useState({});
    const [modalAberto, setModalAberto] = useState(false);
    const {usuario} = useAuth();
    // const [usuarioId, setUsuarioId] = useState("7B53EF89-AFCB-46C9-8BED-80528A8144EA");
    const [filtroData, setFiltroData] = useState(["todos"]);

    async function listarEvento() {
        try {
            const resposta = await api.get("eventos");
            const todosOsEventos = resposta.data;
            const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/" + usuario.idUsuario);
            const minhasPresencas = respostaPresenca.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);
                return {
                    ...atualEvento,
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null
                };
            });

            setListaEvento(eventosComPresencas);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // console.log(usuario.idUsuario);      
        listarEvento();
    }, []);

    function abrirModal(tipo, dados) {
        setTipoModal(tipo);
        setDadosModal(dados);
        setModalAberto(true);
    }

    function fecharModal() {
    setModalAberto(false);
    setDadosModal({});
    setTipoModal("");
}  // <-- Sem '++' aqui!

async function manipularPresenca(idEvento, presenca, idPresenca) {
    try {
        if (presenca && idPresenca !== "") {
            await api.put(`PresencasEventos/${idPresenca}`, { situacao: false });
            Swal.fire('Removido!', 'Sua presença foi removida.', "success");
        } else if (idPresenca !== null) {
            await api.put(`PresencasEventos/${idPresenca}`, { situacao: true });
            Swal.fire('Confirmada!', 'Sua presença foi confirmada.', 'success');
        } else {
            await api.post("PresencasEventos", { situacao: true, idUsuario:  usuario.idUsuario, idEvento: idEvento });
            Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success');
        }

        listarEvento();
    } catch (error) {
        console.log(error);
    }
}


    async function manipularPresenca(idEvento, presenca, idPresenca) {
        try {
            if (presenca && idPresenca !== "") {
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: false });
                Swal.fire('Removido!', 'Sua presença foi removida.', "success");
            } else if (idPresenca !== null) {
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: true });
                Swal.fire('Confirmada!', 'Sua presença foi confirmada.', 'success');
            } else {
                await api.post("PresencasEventos", { situacao: true, idUsuario:  usuario.idUsuario, idEvento: idEvento });
                Swal.fire('Confirmado!', 'Sua presença foi confirmada.', 'success');
            }

            listarEvento();
        } catch (error) {
            console.log(error);
        }
    }

    function filtrarEventos() {
        const hoje = new Date();

        return listaEventos.filter(evento => {
            const dataEvento = new Date(evento.dataEvento);
            if (filtroData.includes("todos")) return true;
            if (filtroData.includes("futuros") && dataEvento > hoje) return true;
            if (filtroData.includes("passados") && dataEvento < hoje) return true;
            return false;
        });
    }

    return (
        <>
            <Header 
             HeaderNome= "Aluno" />
            <section className="main_lista_eventos layout_grid">
                <div className="tituloEvento">
                    <h1>Eventos</h1>
                    <hr />
                </div>


            
                <select
                    className="selecaoDeEventos"
                    onChange={(e) => setFiltroData([e.target.value])}
                >
                    <option value="todos">Todos os eventos</option>
                    <option value="futuros">Somente futuros</option>
                    <option value="passados">Somente passados</option>
                </select>

                <div className="tabela_lista_eventos">
                    <table>
                        <thead>
                            <tr className="sub_eventos">
                                <th>Título</th>
                                <th>Data</th>
                                <th>Tipo de Evento</th>
                                <th>Descrição</th>
                                <th>Comentário</th>
                                <th>Participar</th>
                            </tr>
                        </thead>
                        <tbody className="corpoListagem">
                            {listaEventos.length > 0 ? (
                                filtrarEventos() && filtrarEventos().map((item) => (
                                    <tr className="listagemDoEvento" key={item.idEvento}>
                                        <td data-cell="Nome">{item.nomeEvento}</td>
                                        <td data-cell="Data">{format(item.dataEvento, "dd/MM/yy")}</td>
                                        <td data-cell="Tipo Evento">{item.tiposEvento.tituloTipoEvento}</td>
                                        <td data-cell="Descricao">
                                            <img
                                                className="imagemListagem"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })}
                                                src={descricao}
                                                alt="Descrição"
                                            />
                                        </td>
                                        <td data-cell="Comentários">
                                            <img
                                                style={{ cursor: "pointer" }}
                                                onClick={() => abrirModal("comentarios", { idEvento: item.idEvento })}
                                                src={nuvem}
                                                alt="Comentários"
                                            />
                                        </td>
                                        <td data-cell="Participar">
                                            <Toggle
                                                presenca={item.possuiPresenca}
                                                manipular={() => manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>Nenhum evento encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </section>
            {modalAberto && (
                <Modal
                    titulo={tipoModal === "descricaoEvento" ? "Descrição do evento" : "Comentário"}
                    tipoModel={tipoModal}
                    idEvento={dadosModal.idEvento}
                    descricao={dadosModal.descricao}
                    fecharModal={fecharModal}
                />
            )}
            <Footer />
        </>
    );
};

export default ListagemEvento;
