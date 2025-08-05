import "./cadastro.css";
import Botao from "../botao/Botao";
import Imagem from "../Imagem/imagem";

const Cadastro = (props) => {
    return (
        <main className="layout_grid main_cadastro">
            <form className="layout_grid form_cadastro" onSubmit={props.onSubmit}>
                <div className="titulo">
                    <h1>{props.tituloCadastro}</h1>
                    <hr />
                </div>

                <section className="layout_grid section_cadastro">
                    <div className="banner_cadastro">
                        <Imagem imagem={props.imagem} alt="Banner do cadastro" />
                    </div>

                    <div className="campos_cadastro">

                        <div className="campo_padrao">
                            <label htmlFor="titulo"></label>
                            <input type="text" name="titulo" id="titulo" placeholder={props.placeholderTitulo || "Título"}
                                value={props.valor}
                                onChange={props.onChange}
                            />
                        </div>

                        {props.exibirListaCadastro && (
                            <>
                                <div className="campo_padrao">
                                    <label htmlFor="data"></label>
                                    <input
                                        type="date"
                                        id="data"
                                        name="data"  
                                        value={props.valorData}
                                        onChange={props.onChangeData}
                                        required
                                    />
                                </div>

                                <div className="campo_cad_eventos" style={{ display: props.visibilidade_instituicao }}>
                                    <select
                                        name="instituicao"
                                        required
                                        value={props.valorInstituicao || ""} // garante que nunca será undefined
                                        onChange={(e) => props.setValorInstituicao(e.target.value)}
                                    >
                                        <option disabled value="">Selecione a instituição</option>
                                        <option value="0C2BCFE0-04C9-400F-A653-408E6BA17296">Torloni</option>
                                        <option value="06F8215C-9DBC-48C8-A6CD-317F82F7F692">Senai</option>
                                    </select>

                                </div>

                                <div className="campo_cad_eventos" style={{ display: props.visibilidade_tp_evento }}>
                                    <select
                                        name="tipoEvento"
                                        value={props.valorTipoEvento}
                                        onChange={(e) => props.setValorTipoEvento(e.target.value)}
                                    >
                                        <option disabled value="">Tipo Evento</option>
                                        {props.lista &&
                                            props.lista.length > 0 &&
                                            props.lista.map((itemTpEvento) => (
                                                <option key={itemTpEvento.idTipoEvento} value={itemTpEvento.idTipoEvento}>
                                                    {itemTpEvento.tituloTipoEvento}
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="campo_cad_nome">
                                    <label htmlFor="Descrição"></label>
                                    <input
                                        type="text"
                                        name="descricao"
                                        placeholder="Descrição"
                                        value={props.valorInputDescricao}
                                        style={{ display: props.visibilidade_descricao }}
                                        onChange={(e) => props.setValorInputDescricao(e.target.value)}
                                    />
                                </div>
                            </>
                        )}


                        <Botao nomeDoBotao="Cadastrar" tipo="submit" />
                    </div>
                </section>
            </form>
        </main>
    );
};

export default Cadastro;
