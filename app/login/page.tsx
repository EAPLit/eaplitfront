import '../styles/login.scss';

const Login = () => {
    return (
        <div className="login-form">
            <form className="form" aria-labelledby="login-heading">
                <h1 className="login-heading" id="login-heading">Login</h1>
                <section aria-label="Login Panel">
                    <div class="input-area">
                        <label className="input-label" htmlFor="email">Email</label>
                        <input className="input-item" id="email" type="email" placeholder="Your email" />
                    </div>
                    <div class="input-area">
                        <label className="input-label" htmlFor="password">Password</label>
                        <input className="input-item" id="password" type="password" placeholder="Your password" />
                    </div>
                    <div className="submit-area">
                        <button className="submit-button" type="submit">Login</button>
                    </div>
                    <div className="form-bottom">
                        <p className="to-registration">To registration</p>
                    </div>
                </section>
            </form>

        </div>
    );
};

export default Login;