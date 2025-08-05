import "./Header.css";
import Logo from "../../assets/img/logo1.svg";
import ADM from "../../assets/img/adm.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/Home" || location.pathname === "/";
  
  const deslogar = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Tem certeza que deseja deslogar?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#8E8E8E",
      confirmButtonText: "Sim, deslogar!"
    }).then((result) => {
      if (result.isConfirmed) {
    
       secureLocalStorage.removeItem("tokenLogin");

        Swal.fire({
          title: "Deslogado!",
          text: "Você foi deslogado!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          navigate("/");
        });
      }
    });
  };
  return (
    <header>
      <div className="layout_grid header_header">
        <Link to="/">
          <img className="imagem" src={Logo} alt="Logo do Filmoteca" />
        </Link>
        <nav className="nav_header">
          <Link to="/Home" className="link_header">Home</Link>
          <Link to="/CadastroEvento" className="link_header">Eventos</Link>
          <Link to="/CadastroTipoUsuario" className="link_header">Tipo Usuário</Link>
          <Link to="/CadastroTipoEvento" className="link_header">Tipo Evento</Link>
        </nav>

        <nav className="navs_header">
          <div className="adm_info">
            {!isHomePage && (
              <>
                <span className="link_header">{props.HeaderNome}</span>
                <Link to="/" onClick={deslogar} className="link_header">
                  {props.headerzinho}
                  <img src={ADM} alt="Ícone de logout" className="adm_img" />
                </Link>

              </>
            )}
            {props.mostrarBotao && (
        <div className="botaozinhbo">
          <button
            className="botao"
            type="button"
            onClick={() => navigate("/")} // ou "/" se quiser ir pra home
          >
            {props.nomeDoBotao}
          </button>
        </div>)}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
