import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Card from 'components/Card/Card';
import { iconsArray } from 'variables/Variables.jsx';
import { Kinvey } from 'kinvey-html5-sdk';

class Icons extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { toggleDisplay: 'none' };
    this.clickSmile = this.clickSmile.bind(this);
    this.clickMeh = this.clickMeh.bind(this);
    this.clickFrown = this.clickFrown.bind(this);
    this.syncVotes = this.syncVotes.bind(this);

    this.votesDataStore = Kinvey.DataStore.collection(
      'Votes',
      Kinvey.DataStoreType.Sync
    );
  }

  clickSmile() {
    var that = this;
    this.setState({ toggleDisplay: 'block' });
    var promise = that.votesDataStore
      .save({
        rating: 1,
        timestamp: Date.now()
      })
      .then(function onSuccess(entity) {
        setTimeout(function() {
          that.setState({ toggleDisplay: 'none' });
        }, 1000);
      })
      .catch(function onError(error) {
        console.log(error);
      });
  }

  clickMeh() {
    var that = this;
    this.setState({ toggleDisplay: 'block' });
    var promise = that.votesDataStore
      .save({
        rating: 2,
        timestamp: Date.now()
      })
      .then(function onSuccess(entity) {
        setTimeout(function() {
          that.setState({ toggleDisplay: 'none' });
        }, 1000);
      })
      .catch(function onError(error) {
        console.log(error);
      });
  }

  clickFrown() {
    var that = this;
    this.setState({ toggleDisplay: 'block' });
    var promise = that.votesDataStore
      .save({
        rating: 3,
        timestamp: Date.now()
      })
      .then(function onSuccess(entity) {
        setTimeout(function() {
          that.setState({ toggleDisplay: 'none' });
        }, 1000);
      })
      .catch(function onError(error) {
        console.log(error);
      });
  }
  syncVotes() {
    var that = this;
    var promise = this.votesDataStore
      .push()
      .then(function onSuccess(result) {
        alert('Data Synced');
      })
      .catch(function onError(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="content">
        <div
          className="csatModal"
          style={{ display: this.state.toggleDisplay }}
        >
          <h1>Thank you for your feedback</h1>
          <div className="font-icon-detail">
            <i
              className="fa  fa-check-square-o"
              style={{
                color: 'green',
                fontSize: '150px',
                width: 'auto',
                marginTop: '30px'
              }}
            />
          </div>
        </div>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="How was your Experience?"
                ctAllIcons
                content={
                  <Row>
                    <Col lg={4} className="font-icon-list">
                      <div
                        className="font-icon-detail"
                        onClick={this.clickSmile}
                      >
                        <i
                          className="fa fa-smile-o csatIcon"
                          style={{ color: 'green' }}
                        />
                        {/* <input type="text" defaultValue={prop} /> */}
                      </div>
                    </Col>
                    <Col lg={4} className="font-icon-list">
                      <div className="font-icon-detail" onClick={this.clickMeh}>
                        <i
                          className="fa fa-meh-o csatIcon"
                          style={{ color: 'orange' }}
                        />
                        {/* <input type="text" defaultValue={prop} /> */}
                      </div>
                    </Col>
                    <Col lg={4} className="font-icon-list">
                      <div
                        className="font-icon-detail"
                        onClick={this.clickFrown}
                      >
                        <i
                          className="fa fa-frown-o csatIcon"
                          style={{ color: 'red' }}
                        />
                        {/* <input type="text" defaultValue={prop} /> */}
                      </div>
                    </Col>
                  </Row>
                }
              />
            </Col>
          </Row>
          <Row>
            <button className="btn" onClick={this.syncVotes}>
              Sync Votes
            </button>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Icons;
