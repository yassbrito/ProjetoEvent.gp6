import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../services/Service";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/cadastro";
import Lista from "../../components/lista/lista";
import imagemTipoUsuario from "../../assets/img/cadastrotipoUsuario_imagem.svg";

const CadastroTipoUsuario = () => {
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [listaTipoUsuario, setListaTipoUsuario] = useState([]);

  // Função para mostrar alertas rápidos com SweetAlert2
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

  async function cadastrarTipoUsuario(evento) {
    evento.preventDefault(); // previne reload da página

    if (tipoUsuario.trim() === "") {
      alertar("error", "Preencha o campo!");
      return; // para a execução se campo vazio
    }

    try {
      await api.post("tiposUsuarios", { tituloTipoUsuario: tipoUsuario });
      alertar("success", "Cadastro realizado com sucesso!");
      setTipoUsuario("");  // limpa campo após sucesso
      listarTipoUsuario();  // atualiza lista

    } catch (error) {
      alertar("error", "Erro! Entre em contato com o suporte.");
      console.error(error);
    }
  }


  async function listarTipoUsuario() {
    try {
      const resposta = await api.get("tiposUsuarios");
      setListaTipoUsuario(resposta.data); // atualiza o estado com os dados
    } catch (error) {
      console.log(error);
    }
  }

  async function excluirTipoUsuario(id) {
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
        await api.delete(`TiposUsuarios/${id.idTipoUsuario}`);
        swalWithBootstrapButtons.fire(
          "Deletado!",
          "O tipo de usuário foi deletado com sucesso.",
          "success"
        );
        listarTipoUsuario();
      } catch (error) {
        console.log(error);
        Swal.fire("Erro!", "Não foi possível deletar o tipo de usuário.", "error");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire(
        "Cancelado",
        "O tipo de usuário não foi deletado.",
        "error"
      );
    }
  }

    // Função para atualizar o nome do tipo de usuário via input SweetAlert2
  async function atualizarTipoUsuario(tipoUsuario) {
    console.log(tipoUsuario);

    const { value: novoTipoUsuario } = await Swal.fire({
      title: "Digite o novo usuário",
      input: "text",
      inputLabel: "Novo usuário",
      inputValue: tipoUsuario.tituloTipoUsuario,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "O campo não pode estar vazio!";
        }
      },
    });

    if (novoTipoUsuario) {
      try {
        console.log("Antigo:", tipoUsuario.tituloTipoUsuario);
        console.log("Novo:", novoTipoUsuario);

        await api.put(`tiposUsuarios/${tipoUsuario.idTipoUsuario}`, {
          tituloTipoUsuario: novoTipoUsuario,
        });

        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: `Tipo de usuário atualizado para: ${novoTipoUsuario}`,
        });

        listarTipoUsuario(); // atualiza a lista para mostrar a mudança
      } catch (error) {
        console.error("Erro ao atualizar:", error);
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Não foi possível atualizar. Tente novamente.",
        });
      }
    }
  }


  useEffect(() => {
    listarTipoUsuario();
  }, []);

  return (
    <>
      <Header HeaderNome= "Administrador"/>
      <main>
        <Cadastro
          exibirListaCadastro={false}
          imagem={imagemTipoUsuario}
          tituloCadastro="Cadastro de Tipo de Usuário"
          nome="tituloTipoUsuario"
          valor={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value)}
          onSubmit={cadastrarTipoUsuario}
        />
        <Lista


          tituloCadastro="none"
          tituloLista="Lista tipos de Usuário"
          visibilidadeGenero="none"
          lista={listaTipoUsuario}
          tituloTipoEvento="none"
          chaveId="idTipoUsuario"
          chaveNome="tituloTipoUsuario"  // <-- Aqui está o erro
          listaCadastrolistaGenero="none"
          chaveData="none"
          visibilidade="none"
          listaCadastroGenero="tipo usuário"
          funcEditar={atualizarTipoUsuario}
          funcDeletar={excluirTipoUsuario}
          visibilidade2="none"
        />

      </main>
      <Footer />
    </>
  );
};

export default CadastroTipoUsuario;
