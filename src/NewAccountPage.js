import React from 'react';
import './index.css';

class NewAccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            rePassword: "",
            errors: [],
            user_creation: false
        }
    }
    async componentDidMount() {
        await this.setState({
            ...this.state, username: "", password: "", rePassword: "", errors: [], user_creation: false
        })
    }
    onChange = (e) => {
        this.setState({ ...this.state, [e.target.id]: e.target.value });
    }
    handleSignUp = () => {
        if (this.handleValidation()) {
            this.setState({ ...this.state, errors: [], user_creation: true, username: "", password: "", rePassword: "" })
        }
    }
    handleValidation = () => {
        let errors = [];
        let accountValid = true;
        let str1 = this.state.password;
        let str2 = this.state.rePassword;
        if (this.state.username === "" || str1 === "" || str2 === "") {
            accountValid = false;
            errors.push("Please fill all the fields ")
        }

        if (!(str1 === str2) && (str1 !== "" && str2 !== "")) {
            accountValid = false;
            errors.push("Passwords doesn't match")
        }
        if ((str1 !== "" && str2 !== "") && (str1 === str2)) {
            if (str1.length < 8) {
                accountValid = false;
                errors.push("Your password must be at least 8 characters");
            }
            if (str1.search(/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) < 0) {
                accountValid = false;
                errors.push("Your password must contain at least one special character.");
            }
            if (str1.search(/[0-9]/) < 0) {
                accountValid = false;
                errors.push("Your password must contain at least one digit.");
            }
        }

        this.setState({ errors: errors });
        return accountValid;
    }
    render() {
        return (
            <React.Fragment>
                <br />
                <p className="header">CrowdStreet Front-End Task <br /> Create Account</p>
                <br />
                <div className="div_css">
                    <label className="label">Enter Username :</label>
                    <br />
                    <input
                        className="input" type="text" placeholder="Username" required
                        id="username"
                        value={this.state.username}
                        onChange={(value) => this.onChange(value)}
                    /><br />
                    <label className="label">Enter Password :</label>
                    <br />
                    <input
                        className="input" type="password" placeholder="Password" required
                        id="password"
                        value={this.state.password}
                        onChange={(value) => this.onChange(value)}
                    />
                    <p>[password should be more than 8 characters and a number or special character]</p>
                    <label className="label">Re-enter Password :</label>
                    <br />
                    <input
                        className="input" type="password" placeholder="Re-enter password" required
                        id="rePassword"
                        value={this.state.rePassword}
                        onChange={(value) => this.onChange(value)}
                    /><br />
                    <button className="button" onClick={() => this.handleSignUp()}>Sign Up</button>
                </div>
                {this.state.errors.length > 0 && <pre className="pre">
                    <p>Errors</p>
                    {this.state.errors.map((err, i) => (
                        <li key={i}>
                            {err}
                        </li>
                    ))}
                </pre>}
                {this.state.user_creation > 0 && <pre className="pre_success">
                    <p>Success</p>
                    <li>User Created Successfully</li>
                </pre>}
            </React.Fragment >
        );
    }
}
export default NewAccountPage;