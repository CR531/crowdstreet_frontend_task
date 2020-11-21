import React from 'react';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      investmentAmount: "",
      investmentType: "",
      netWorth: "",
      yearlyIncome: "",
      creditScore: "",
      errors: []
    }
  }
  async componentDidMount() {
    await this.setState({
      ...this.state, investmentAmount: "", investmentType: "", netWorth: "", yearlyIncome: "", creditScore: ""
    })
  }
  onChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  }
  handleClick = () => {
    if (!this.handleValidation()) {
      // alert("Errors");
    }
  }
  handleValidation = () => {
    let errors = [];
    let formIsValid = true;
    //Investment Amount
    if (this.state.investmentAmount === "") {
      formIsValid = false;
      errors.push("Investment Amount cannot be empty")
    }
    if (this.state.investmentType === "") {
      formIsValid = false;
      errors.push("Investment Type cannot be empty")
    }
    if (this.state.investmentType !== "") {
      if (!this.state.investmentType.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors.push("Investment type should be a text format")
      }
    }
    if (this.state.netWorth === "") {
      formIsValid = false;
      errors.push("Total Net Worth cannot be empty")
    }
    if (this.state.yearlyIncome === "") {
      formIsValid = false;
      errors.push("User Estimated Yearly Income cannot be empty")
    }
    if (this.state.creditScore === "") {
      formIsValid = false;
      errors.push("User Estimated Credit Score cannot be empty")
    }
    if (this.state.creditScore !== "") {
      var x = Number(this.state.creditScore)
      if (x < 300 || x > 850) {
        formIsValid = false;
        errors.push("User Estimated Credit Score should be between 300-850")
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  }
  render() {
    return (
      <React.Fragment>
        <div className="div_css">
          <br />
          <p className="heading">CrowdStreet Front-End Task</p>
          <p className="heading">Pre-Approval for an Investor</p>
          <br />
          <label className="label">Enter Investment Amount :</label>
          <br />
          <input
            className="input" type="number" placeholder="Currency" required
            id="investmentAmount"
            value={this.state.investmentAmount}
            onChange={(value) => this.onChange(value)}
          /><br />
          <label className="label">Enter Investment Type :</label>
          <br />
          <input
            className="input" type="text" placeholder="Text" required
            id="investmentType"
            value={this.state.investmentType}
            onChange={(value) => this.onChange(value)}
          /><br />
          <label className="label">Enter Total Net Worth :</label>
          <br />
          <input
            className="input" type="number" placeholder="Currency" required
            id="netWorth"
            value={this.state.netWorth}
            onChange={(value) => this.onChange(value)}

          /><br />
          <label className="label">Enter User Estimated Yearly Income :</label>
          <br />
          <input
            className="input" type="number" placeholder="Currency" required
            id="yearlyIncome"
            value={this.state.yearlyIncome}
            onChange={(value) => this.onChange(value)}
          /><br />
          <label className="label">Enter User Estimated Credit Score :</label>
          <br />
          <input
            className="input" type="number" placeholder="Number from 300-850" required
            id="creditScore"
            value={this.state.creditScore}
            onChange={(value) => this.onChange(value)}
          /><br />
          <div>
            <button className="button" onClick={() => this.handleClick()}>Submit</button>
          </div>
        </div>
        {this.state.errors.length > 0 && <pre>
          <p>Errors</p>
          {this.state.errors.map(err => (
            <li>
              {err}
            </li>
          ))}
        </pre>}
      </React.Fragment>
    )
  }
}
export default App;