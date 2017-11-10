import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, OneMonth, EthereumNegative, EthereumPositive, BitcoinNegative, BitcoinPositive}   from './components'
import {me, fetchOneMonthBitcoin, fetchOneMonthEthereum, fetchOneMonthNewsBitcoin} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
  this.props.loadInitialData()
  }

  render () {

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route exact path="/" component={OneMonth} />
            <Route path="/oneMonth" component={OneMonth} />
            <Route path="/bitcoinPositive" component={BitcoinPositive} />
            <Route path="/bitcoinNegative" component={BitcoinNegative} />
            <Route path="/ethereumPositive" component={EthereumPositive} />
            <Route path="/ethereumNegative" component={EthereumNegative} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    coindesk: state.coindesk
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      //dispatch(fetchOneMonthBitcoin())
      //dispatch(fetchOneMonthEthereum())
      //dispatch(fetchOneMonthNewsBitcoin())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

