import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';

import { Card } from 'components/Card/Card.jsx';
import { StatsCard } from 'components/StatsCard/StatsCard.jsx';
import { Tasks } from 'components/Tasks/Tasks.jsx';
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from 'variables/Variables.jsx';

import { Kinvey } from 'kinvey-html5-sdk';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { stats: {}, datapie: {} };
  }

  // var dataPie = {
  //   labels: ['40%', '20%', '40%'],
  //   series: [40, 20, 40]
  // };

  componentDidMount() {
    var that = this;
    var votesDataStore = Kinvey.DataStore.collection('Votes');
    var stream = votesDataStore.find();
    stream.subscribe(
      function onNext(entities) {
        console.log(entities.length);
        if (entities.length > 0) {
          that.setState({
            stats: entities[entities.length - 1].stats,
            datapie: {
              labels: [
                entities[entities.length - 1].stats.smilePercent,
                entities[entities.length - 1].stats.mehPercent,
                entities[entities.length - 1].stats.frownPercent
              ],
              series: [
                parseInt(entities[entities.length - 1].stats.smileNum),
                parseInt(entities[entities.length - 1].stats.mehNum),
                parseInt(entities[entities.length - 1].stats.frownNum)
              ]
            }
          });
        }
      },
      function onError(error) {
        console.log(error);
      },
      function onComplete(entities) {
        console.log(entities);
      }
    );
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json['names'].length; i++) {
      var type = 'fa fa-circle text-' + json['types'][i];
      legend.push(<i className={type} key={i} />);
      legend.push(' ');
      legend.push(json['names'][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-smile-o smileIcon" />}
                statsValue={this.state.stats.smilePercent}
                statsIcon={<i className="fa fa-smile-o" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-meh-o mehIcon" />}
                statsValue={this.state.stats.mehPercent}
                statsIcon={<i className="fa fa-meh-o" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-frown-o frownIcon" />}
                statsValue={this.state.stats.frownPercent}
                statsIcon={<i className="fa fa-frown-o" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="CSAT History"
                category="7 Days performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="CSAT Breakdown"
                category="Total CSAT Breakdown by Choice"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={this.state.datapie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
