import "./lista.css";
import Lixo from "../../assets/img/Lixo_Branco.png";
import Caneta from "../../assets/img/caneta.png";
import Descricao from "../../assets/img/descricao.png"

const Lista = (props) => {
  return (
    <div className="listagem">
      <section className="layout_grid ">

        <h1>{props.tituloLista}</h1>
        <hr />

        <table className=" tabela">
          <thead>
            <tr className="tabela_cabecalho">
              <th style={{ display: props.listaCadastroGenero }}>Nome</th>
              {props.exibirData && <th>Data do evento</th>}
              <th style={{ display: props.tituloTipoEvento }}>Tipo Evento</th>
              <th style={{ display: props.tituloCadastro }}>Título</th>
              {/* Exibe o cabeçalho do Gênero só se visibilidadeGenero for diferente de 'none' */}
              {props.visibilidadeGenero !== "none" && <th>Gênero</th>}
              <th>Editar</th>
              <th>Deletar</th>
              <th style={{ display: props.listaCadastrolistaGenero }}>Descrição</th>
            </tr>
          </thead>
          {/* -------------------------------------------T/BODY------------------------------------------- */}
          <tbody>
            {props.lista && props.lista.length > 0 ? (
              props.lista.map((item) => (
                <tr className="layout_grid item_lista" key={item[props.chaveId]}>
                  <td data-cell="Nome" style={{ display: props.listaCadastroGenero }}>
                    {item[props.chaveNome]}
                  </td>

                  {props.exibirData && (
                    <td data-cell="Data Evento" style={{ display: props.visibilidade }}>
                      {item[props.chaveData]
                        ? new Date(item[props.chaveData]).toLocaleDateString("pt-BR")
                        : "-"}
                    </td>
                  )}

                  {props.exibirTipoEvento && (
                    <td data-cell="Tipo Evento" style={{ display: props.visibilidade }}>
                      {item[props.chaveTipoEvento]?.tituloTipoEvento || "-"}
                    </td>
                  )}

                  <td data-cell="Editar" className="botao_edicao">
                    <img
                      src={Caneta}
                      alt="Caneta"
                      onClick={() => props.funcEditar(item)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>

                  <td data-cell="Excluir" className="botao_edicao">
                    <img
                      src={Lixo}
                      alt="Lixeira"
                      onClick={() => props.funcDeletar(item)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>

                  {props.exibirSimboloDescricao && (
                    <td
                      data-cell="descricao"
                      className="botao_edicao_descricao"
                      style={{ display: props.visibilidade2 }}
                    >
                      <img
                        src={Descricao}
                        alt="Exclamação"
                        onClick={() => props.funcDescricao(item[props.chaveId])}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "1rem" }}>
                  Nenhum item encontrado
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </section>
    </div>
  );
};

export default Lista;
