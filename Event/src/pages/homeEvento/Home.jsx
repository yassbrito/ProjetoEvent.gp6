import "./Home.css"
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import mapa from "../../assets/img/mapa.png";
import banner2 from "../../assets/img/banner2.png";
import home from "../../assets/img/home.png"
import { Link } from "react-router-dom";

const Home = () => {
  const eventos = [
    {
      titulo: "Participe de Eventos Exclusivos",
      descricao:
        "Esteja presente nos principais eventos de T.I. do país. Networking, conteúdo de ponta e experiências únicas te esperam.",
    },
    {
      titulo: "Conheça os Líderes da Inovação",
      descricao:
        "Palestras com especialistas, cases de sucesso e insights que vão transformar sua carreira e sua visão de tecnologia.",
    },
    {
      titulo: "Desenvolva Novas Habilidades",
      descricao:
        "Workshops práticos, desafios de programação e trilhas técnicas para quem quer ir além da teoria.",
    },
    {
      titulo: "Faça Parte da Comunidade Tech",
      descricao:
        "Conecte-se com devs, startups e empresas. Encontre seu lugar em uma rede colaborativa que não para de crescer.",
    },
  ];

  return (

    <div>
      <Header   
        nomeDoBotao="Logar" mostrarBotao={true}         
      />


      <main className="home-layout">

        <section className="home-banner">
          <img src={home} alt="Área de eventos da escola de informática" />
        </section>

        {/* Seção de eventos */}
        <section className="home-eventos">
          <h2>Próximos Eventos</h2>
          <hr />

          <div className="conjunto-cards">
            {eventos.map((evento, index) => (
              <div className="cartao-evento" key={index}>
                <h2>{evento.titulo}</h2>
                <p>{evento.descricao}</p>
                <Link className="link-evento" to="/Login">
                  Conectar
                </Link>
              </div>
            ))}
          </div>

        </section>

        <section className="home-visao">
          <div className="imagem-container">
            <img src={banner2} alt="Banner" className="imagem-banner" />
            <div className="textoDaImagem">
              <h2>Visão</h2>
              <hr />
              <p>
                Nossa visão é impulsionar o desenvolvimento tecnológico por meio deexperiências únicas em eventos de T.I. Acreditamos que a troca de conhecimento, o networking qualificado e o acesso a conteúdos
                relevantes são essenciais para a evolução da comunidade tech.
                Queremos ser referência na promoção de encontros que conectam
                pessoas, inspiram ideias e aceleram a inovação.
              </p>

            </div>
          </div>
        </section>

        <section className="home-contato">
          <div className="tituloHome">
            <h2>Contato</h2>
            <hr />
          </div>
          <div className="contato-container">
            <div className="contato-mapa">
              <img src={mapa} alt="Mapa da localização" />
            </div>
            <div className="contato-info">
              <p>Rua Niterói, 180 - Centro</p>
              <p>São Caetano do Sul - SP</p>
              <p>(11) 4225-2000</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

export default Home;
