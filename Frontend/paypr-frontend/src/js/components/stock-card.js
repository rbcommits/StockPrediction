import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class StockCard extends Component {
  constructor(props)
  {
      super(props);
      this.state = {
        graph_data:{},
        prediction: this.props.prediction
      }
  }

  render() {
    return (
      <div>
        <div className="col-md-6 col-md-fill" style={{padding:"0px"}}>
                    <div className="card">
                        <div className="card-image"><img src="assets/img/Stock Sample Image.jpg" width="100%" /><span className="card-title" style={{color:"rgb(1,0,0)"}}>GooGle</span></div>
                        <div className="card-content">
                            <p>Prediction:</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image"><img className="img-responsive" src="assets/img/Stock Sample Image2.jpg" width="100%" /><span className="card-title" style={{color:"rgb(0,0,0)"}}>Apple</span></div>
                        <div className="card-content">
                            <p>Cards for display in portfolio style material design by Google. </p>
                        </div>
                        
                    </div>
                </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
console.log("In stock-card mstp")
console.log(state)
return{
    
}
}

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(StockCard)

