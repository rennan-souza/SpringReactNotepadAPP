const Signup = () => {
    return (
        <div className="auth-container">
            <form>
                <div className="auth-title">
                    <h1>Criar conta</h1>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Nome completo" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Email" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg" placeholder="Senha" />
                </div>
                <div className="form-group">
                    <button className="btn btn-lg btn-primary btn-block">CRIAR CONTA</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;