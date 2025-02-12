

const Login = () => {
    return (
        <div>
            <form aria-labelledby="login-heading">
                <h1 id="login-heading">Login</h1>
                <section aria-label="Login Panel">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="Your email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Your password" />
                    </div>

                    <button type="submit">Login</button>
                </section>
            </form>

        </div>
    );
};

export default Login;