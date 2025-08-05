import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../services/Service";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/cadastro";
import Lista from "../../components/lista/lista";
import imagemTipoEvento from "../../assets/img/cadastroTipoEvento_imagem.svg";

const CadastroTipoEvento = () => {
    const [tipoEvento, setTipoEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([]);

    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }

    async function cadastrarTipoEvento(evento) {
        evento.preventDefault();

        if (tipoEvento.trim() === "") {
            alertar("error", "Preencha o campo!");
            return;
        }

        try {
            await api.post("tiposEventos", { tituloTipoEvento: tipoEvento });
            alertar("success", "Cadastro realizado com sucesso!");
            setTipoEvento("");
            listarTipoEvento();
        } catch (error) {
            alertar("error", "Erro! Entre em contato com o suporte.");
            console.error(error);
        }
    }

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("tiposEventos");
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function excluirTipoEvento(id) {
        //   const token = localStorage.getItem("token"); // pegue o token salvo

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
        });

        const result = await swalWithBootstrapButtons.fire({
            title: "Você tem certeza?",
            text: "Não será possível reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                console.log(id);

                await api.delete(`TiposEventos/${id.idTipoEvento}`);
                swalWithBootstrapButtons.fire(
                    "Deletado!",
                    "O tipo de evento foi deletado com sucesso.",
                    "success"
                );
                listarTipoEvento();
            } catch (error) {
                console.log(error);
                Swal.fire("Erro!", "Não foi possível deletar o tipo de evento.", "error");
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                "Cancelado",
                "O tipo de evento não foi deletado.",
                "error"
            );
        }
    }


    async function atualizarTipoEvento(tipoEvento) {
        const { value: novoTipoEvento } = await Swal.fire({
            title: "Digite o novo nome",
            input: "text",
            inputLabel: "Novo usuário",
            inputValue: tipoEvento.tituloTipoEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            },
        });

        if (novoTipoEvento) {
            try {
                await api.put(`tiposEventos/${tipoEvento.idTipoEvento}`, {
                    tituloTipoEvento: novoTipoEvento
                });

                Swal.fire("Atualizado!", `Novo tipo: ${novoTipoEvento}`, "success");
                listarTipoEvento();
            } catch (error) {
                console.error("Erro ao atualizar:", error);
                Swal.fire("Erro!", "Não foi possível atualizar.", "error");
            }
        }
    }

    useEffect(() => {
        listarTipoEvento();
    }, []);

    return (
        <>
            <Header nomeDoBotao="Clique aqui" mostrarBotao={false} 
            HeaderNome= "Administrador"/>
            <main>
                <Cadastro
                    exibirListaCadastro={false}
                    imagem={imagemTipoEvento}
                    tituloCadastro="Cadastro de Tipo de Evento"
                    nome="tituloTipoEvento"
                    valor={tipoEvento}
                    onChange={(e) => setTipoEvento(e.target.value)}
                    onSubmit={cadastrarTipoEvento}
                />

                <Lista
                    tituloCadastro="none"
                    tituloLista="Lista tipos de Evento"
                    visibilidadeGenero="none"
                    lista={listaTipoEvento}
                    tituloTipoEvento="none"
                    chaveId="idTipoEvento"
                    chaveNome="tituloTipoEvento"
                    listaCadastrolistaGenero="none"
                    chaveData="none"
                    visibilidade="none"
                    listaCadastroGenero="tipo evento"
                    funcEditar={atualizarTipoEvento}
                    funcDeletar={excluirTipoEvento}
                    visibilidade2="none"
                />
            </main>
            <Footer />
        </>
    );
};

export default CadastroTipoEvento;
