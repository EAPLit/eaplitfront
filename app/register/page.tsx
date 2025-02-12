

const Register = () => {
    return (
        <div>
            <form aria-labelledby="register-heading">
                <h1 id="register-heading">Register</h1>
                <section aria-label="Register Panel">
                    <div>
                        <label htmlFor="your-name">Name</label>
                        <input id="your-name" type="text" placeholder="Your name" />
                    </div>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" placeholder="Username" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="password" />
                    </div>
                    <div>
                        <label htmlFor="confirm-password">Confirm password</label>
                        <input id="confirm-password" type="password" placeholder="confirm password" />
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </section>
            </form>
            <section aria-label="Back to login">
                <div>
                    <p>To login</p>
                </div>
            </section>

        </div>
    );
};

export default Register;