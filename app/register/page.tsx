import "../styles/register.scss";

const Register = () => {
    return (
        <div className='register-form'>
            <form className="form" aria-labelledby="register-heading">
                <h1 className="register-heading" id="register-heading">Register</h1>
                <section aria-label="Register Panel">
                    <div className="input-area">
                        <label className="input-label" htmlFor="your-name">Name</label>
                        <input className="input-item" id="your-name" type="text" placeholder="Your name" />
                    </div>
                    <div className="input-area">
                        <label className="input-label" htmlFor="username">Username</label>
                        <input className="input-item" id="username" type="text" placeholder="Username" />
                    </div>
                    <div className="input-area">
                        <label className="input-label" htmlFor="email">Email</label>
                        <input className="input-item" id="email" type="email" placeholder="email" />
                    </div>
                    <div className="input-area">
                        <label className="input-label" htmlFor="password">Password</label>
                        <input className="input-item" id="password" type="password" placeholder="password" />
                    </div>
                    <div className="input-area">
                        <label className="input-label" htmlFor="confirm-password">Confirm password</label>
                        <input className="input-item" id="confirm-password" type="password" placeholder="confirm password" />
                    </div>
                    <div className="submit-area">
                        <button className="submit-button" type="submit">Register</button>
                    </div>
                    <div className="form-bottom">
                        <p className="to-login">To login</p>
                    </div>
                </section>
            </form>

        </div>
    );
};

export default Register;