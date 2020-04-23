import React, {Component} from 'react';
import CoronaTable from './Table';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Corona from '../../img/corona-64.png';
import Confirm from "../../img/confirm-48.png";
import Death from "../../img/death-48.png";
import DeathPer from "../../img/deathper-48.png"
import Recover from "../../img/recover-48.png";
import Testing from "../../img/testing-48.png";
import World from "../../img/world-32.png";
import Calender from "../../img/day-32.png";
import Badge from "react-bootstrap/esm/Badge";
import CoronaData from "../../data/corona";

function numberFormat(inputNumber) {
   return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Main extends Component {
     constructor(props) {
         super(props);
         this.state = {
             Corona : CoronaData,
             Confirm : CoronaData.Global.TotalConfirmed,
             Death : CoronaData.Global.TotalDeaths,
             Recover : CoronaData.Global.TotalRecovered,
             newConfirm : CoronaData.Global.NewConfirmed,
             newDeath : CoronaData.Global.NewDeaths,
             newRecover : CoronaData.Global.NewRecovered,
             Rate : ((CoronaData.Global.TotalDeaths/CoronaData.Global.TotalConfirmed) * 100).toFixed(2),
             incConfirm : ((CoronaData.Global.NewConfirmed/(CoronaData.Global.TotalConfirmed)) * 100).toFixed(2),
             incDeath : ((CoronaData.Global.NewDeaths/(CoronaData.Global.TotalDeaths)) * 100).toFixed(2),
             incRecover : ((CoronaData.Global.NewRecovered/(CoronaData.Global.TotalRecovered)) * 100).toFixed(2),
             lastRate : (((CoronaData.Global.TotalDeaths-CoronaData.Global.NewDeaths)/(CoronaData.Global.TotalConfirmed-CoronaData.Global.NewConfirmed))*100).toFixed(2)
         };
     }
    render() {
         var _Rate = null;
         if ((this.state.Rate - this.state.lastRate) > 0) {
             _Rate = <Badge variant="danger">{(this.state.Rate - this.state.lastRate).toFixed(2)}% increase</Badge>;
         } else  if((this.state.Rate - this.state.lastRate) <= 0){
             _Rate = <Badge variant="success">{(this.state.Rate - this.state.lastRate).toFixed(2)}% increase</Badge>;
         }
         this.state.Confirm = numberFormat(this.state.Confirm);
         this.state.Death = numberFormat(this.state.Death);
         this.state.Recover = numberFormat(this.state.Recover);
         this.state.newConfirm = numberFormat(this.state.newConfirm);
         this.state.newDeath = numberFormat(this.state.newDeath);
         this.state.newRecover = numberFormat(this.state.newRecover);
         return (
            <div className="corona">
                <Container>
                    <Row className="corona-header">
                        <Col xs={12} md={8} className="corona-logo">
                            <h1><img src={Corona}/> COVID-19</h1>
                            <p className="corona-logo-desc">COVID-19 세계, 국가별 현황 공유</p>
                        </Col>
                    </Row>
                    <Row classNmae="corona-content">
                        <Col md={12}>
                            <span className="corona-box-desc"><img src={Calender}/> 실시간 세계 COVID-19 현황판</span>
                        </Col>
                        <Col md={6} className="corona-box">
                            <div className="corona-box-wrap">
                                <span className="corona-icon"><img src={Confirm}/></span>
                                <h6 className="font-gray">Confirmed</h6>
                                <h1>{this.state.Confirm}</h1>
                                <div className="badge-box">
                                    <Badge variant="danger">{this.state.incConfirm}% increase</Badge>
                                    <h6 className="badge-desc">+{this.state.newConfirm}</h6>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="corona-box">
                            <div className="corona-box-wrap">
                                <span className="corona-icon"><img src={Death}/></span>
                                <h6 className="font-gray">Deaths</h6>
                                <h1>{this.state.Death}</h1>
                                <div className="badge-box">
                                    <Badge variant="danger">{this.state.incDeath}% increase</Badge>
                                    <h6 className="badge-desc">+{this.state.newDeath}</h6>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="corona-box">
                            <div className="corona-box-wrap">
                                <span className="corona-icon"><img src={Recover}/></span>
                                <h6 className="font-gray">Recovered</h6>
                                <h1>{this.state.Recover}</h1>
                                <div className="badge-box">
                                    <Badge variant="success">{this.state.incRecover}% increase</Badge>
                                    <h6 className="badge-desc">+{this.state.newRecover}</h6>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="corona-box">
                            <div className="corona-box-wrap">
                                <span className="corona-icon"><img src={DeathPer}/></span>
                                <h6 className="font-gray">Death rate</h6>
                                <h1>{this.state.Rate} %</h1>
                                <div className="badge-box">
                                    {_Rate}
                                    <h6 className="badge-desc">yesterday : {this.state.lastRate}%</h6>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="corona-content-table">
                            <span className="corona-box-desc"><img src={World}/> 국가별 COVID-19 현황</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="corona-table">
                            <CoronaTable Corona={this.state.Corona}></CoronaTable>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Main;