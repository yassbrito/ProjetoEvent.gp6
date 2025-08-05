const Imagem = ({ imagem, alt, width = "100%", height = "auto" }) => {
    return (
      <img src={imagem} alt={alt} width={width} height={height} />
    );
  };
  
  export default Imagem;
  