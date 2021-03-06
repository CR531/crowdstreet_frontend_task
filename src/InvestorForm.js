import React from 'react';
import './index.css';
import NewAccountPage from "./NewAccountPage";
import DisqualifyPage from "./DisqualifyPage";
class InvestorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      investmentAmount: "",
      investmentType: "",
      netWorth: "",
      yearlyIncome: "",
      creditScore: "",
      errors: [],
      api_response_status: "",
      api_response_message: ""
    }
  }
  async componentDidMount() {
    await this.setState({
      ...this.state, investmentAmount: "", investmentType: "", netWorth: "", yearlyIncome: "", creditScore: "", errors: [], api_response_status: "", api_response_message: ""
    })
  }
  apicall = async (url, option) => {
    const response = await fetch(url);
    const data = await response.json();
    await this.setState({ ...this.state, api_response_status: data.fakeData[option].status, api_response_message: data.fakeData[option].message });
  }
  onChange = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value });
  }
  handleClick = () => {
    if (this.handleValidation()) {
      let url = "https://my-json-server.typicode.com/CR531/json_data/db";
      var a = Number(this.state.investmentAmount);
      var b = Number(this.state.netWorth);
      var c = Number(this.state.yearlyIncome);
      var d = Number(this.state.creditScore);
      if (a > 9000000) {
        this.apicall(url, 2);
      } else {
        if ((a > (c / 5)) || (d < 600) || (a > (b * 0.03))) {
          this.apicall(url, 0);
        } else {
          this.apicall(url, 1);
        }
      }
    }
  }
  handleValidation = () => {
    let errors = [];
    let formIsValid = true;
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
      if (x <= 300 || x >= 850) {
        formIsValid = false;
        errors.push("User Estimated Credit Score should be between 300-850")
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  }
  render() {
    return (
      <React.Fragment>{
        this.state.api_response_status === "" && <div>
          <br />
          <p className="header">Crowd Street<br /> Pre-Approval for an Investor</p>
          <br />
          <div className="div_css">
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
            <button className="button" onClick={() => this.handleClick()}>Submit</button>
          </div>
          {this.state.errors.length > 0 && <pre className="pre">
            <p>Errors</p>
            {this.state.errors.map((err, i) => (
              <li key={i}>
                {err}
              </li>
            ))}
          </pre>}
        </div>
      }
        {this.state.api_response_status === "badrequest" && <div>
          <p>{this.state.api_response_message}</p>
        </div>}
        {this.state.api_response_status === "success" && <NewAccountPage />}
        {this.state.api_response_status === "disqualify" && <DisqualifyPage />}
      </React.Fragment>
    )
  }
}
export default InvestorForm;