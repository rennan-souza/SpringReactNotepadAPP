const Signin = () => {
    return (
        <div className="auth-container">
            <form>
                <div className="auth-title">
                    <h1>Login</h1>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Email" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Senha" />
                </div>
                <div className="form-group">
                    <a href="#link" className="text-dark">
                        <small>Esqueci minha senha</small>
                    </a>
                </div>
                <div className="form-group">
                    <button className="btn btn-lg btn-outline-primary btn-block">LOGIN</button>
                </div>
            </form>
        </div>    
    )
};

export default Signin;