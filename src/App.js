import React from 'react';
import './index.css';

class App extends React.Component {
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
            className="input"
            type="number"
            placeholder="Currency"
            required
          /><br />
          <label className="label">Enter Investment Type :</label>
          <br />
          <input
            className="input"
            type="text"
            placeholder="Text"
            required
          /><br />
          <label className="label">Enter Total Net Worth :</label>
          <br />
          <input
            className="input"
            type="number"
            placeholder="Currency"
            required

          /><br />
          <label className="label">Enter User Estimated Yearly Income :</label>
          <br />
          <input
            className="input"
            type="number"
            placeholder="Currency"
            required
          /><br />
          <label className="label">Enter User Estimated Credit Score :</label>
          <br />
          <input
            className="input"
            type="number"
            placeholder="Number from 300-850"
            required
          /><br />
          <div>
            <button className="button">Submit</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default App;