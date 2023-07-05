import react from 'react';

function Login() {
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="shadow p-2">
                    <h3>
                        <small className="text-body-secondary">Sign Up</small>
                    </h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label"></label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label"></label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter your password" />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1"></label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Login;