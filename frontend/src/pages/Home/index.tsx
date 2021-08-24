import "./styles.css";

import { Link } from "react-router-dom";
import HomeAuthImage from "../../components/HomeAuthImage";

const Home = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="home-content">
                        <h1>NotepadAPP</h1>
                        <p className="text-justify">
                            Seu sistema de bloco de notas na nuvem e na palma de sua mão,
                            não importa onde você esteja, no smartphone, tablet, notebook
                            ou até mesmo no bom e velho pc, acesse suas anotações de onde
                            quiser E O MELHOR, É TOTALMENTE GRÁTIS.
                        </p>
                        <Link to="/auth/signup" className="btn btn-lg btn-primary mr-1">CRIAR CONTA</Link>
                        <Link to="/auth/signin" className="btn btn-lg btn-outline-primary mr-1">LOGIN</Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <HomeAuthImage />
                </div>
            </div>
        </div>
    )
};

export default Home;