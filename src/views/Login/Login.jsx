import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import { Kinvey } from 'kinvey-html5-sdk';
import { Route } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { password: '', username: '' };
    this.handleUNChange = this.handleUNChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleMICOut = this.handleMICOut.bind(this);
  }

  handleUNChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePWChange(event) {
    this.setState({ password: event.target.value });
  }

  handleMICOut() {
    var promise = Kinvey.User.loginWithMIC('http://localhost:3000');
    promise = promise
      .then(function onSuccess(user) {
        // ...
      })
      .catch(function onError(error) {
        // ...
      });
  }

  handleLogOut(event) {
    event.preventDefault();
    var promise = Kinvey.User.logout()
      .then(function() {
        console.log('Logged out');
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleSubmit(event) {
    var that = this;

    var promise = Kinvey.User.login(this.state.username, this.state.password)
      .then(function(user) {
        that.props.history.push('/');
      })
      .catch(function(error) {
        console.log(error);
        alert('Login Failed');
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Login"
                // category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <span>
                    <form
                      onSubmit={this.handleSubmit}
                      style={{ margin: '20px' }}
                    >
                      <div className="form-group">
                        <label htmlFor="unInput">Username</label>
                        <input
                          className="form-control"
                          id="unInput"
                          type="text"
                          value={this.state.username}
                          onChange={this.handleUNChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="pwInput">Password</label>
                        <input
                          type="text"
                          className="form-control"
                          id="pwInput"
                          value={this.state.password}
                          onChange={this.handlePWChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="submit"
                          value="Submit"
                          className="btn btn-primary"
                          style={{
                            margin: 'auto',
                            display: 'block',
                            width: '50%'
                          }}
                        />
                      </div>
                    </form>
                    <div className="form-group">
                      <button
                        onClick={this.handleMICOut}
                        className="btn btn-secondary m-*-auto"
                        style={{
                          margin: 'auto',
                          display: 'block',
                          width: '50%'
                        }}
                      >
                        Identity Connect
                      </button>
                    </div>
                    <div className="form-group">
                      <button
                        onClick={this.handleLogOut}
                        className="btn btn-secondary m-*-auto"
                        style={{
                          margin: 'auto',
                          display: 'block',
                          width: '50%'
                        }}
                      >
                        Log Out
                      </button>
                    </div>
                  </span>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Login;
