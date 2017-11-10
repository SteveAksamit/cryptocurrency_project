import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import TableauReport from 'react-tableau-report'
import { fetchOneMonthBitcoin, fetchOneMonthEthereum } from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */

const EthereumPositive = () => {

    //const { oneMonth } = this.props
    return (
      <div>
        <TableauReport url="https://us-east-1.online.tableau.com/t/cryptopriceanalysis/views/ETCBTH-30Day/ETHPositiveStories?:embed=y&:showAppBanner=false&:showShareOptions=true&:display_count=no&:showVizHome=no" />
      </div>
    )
  }

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    coindesk: state.coindesk
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData() {
//       //dispatch(fetchOneMonthBitcoin())
//       //dispatch(fetchOneMonthEthereum())
//     }
//   }
// }

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState)(EthereumPositive)

