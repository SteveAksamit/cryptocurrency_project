import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ONE_MONTH_BITCOIN = 'GET_ONE_MONTH_BITCOIN'
const GET_ONE_MONTH_ETHEREUM = 'GET_ONE_MONTH_ETHEREUM'
const GET_ONE_MONTH_NEWS_BITCOIN = 'GET_ONE_MONTH_NEWS_BITCOIN'

/**
 * INITIAL STATE
 */
const oneMonth = {}

/**
 * ACTION CREATORS
 */
const getOneMonthBitcoin = oneMonthBitcoinData => ({type: GET_ONE_MONTH_BITCOIN, oneMonthBitcoinData})
const getOneMonthEthereum = oneMonthEthereumData => ({type: GET_ONE_MONTH_ETHEREUM, oneMonthEthereumData})
const getOneMonthNewsBitcoin = oneMonthNewsBitcoin => ({type: GET_ONE_MONTH_NEWS_BITCOIN, oneMonthNewsBitcoin})

/**
 * THUNK CREATORS
 */
export const fetchOneMonthBitcoin = () =>
  dispatch =>
    axios.get('/api/bitcoin/oneMonthBitcoin')
      .then(res => {
        dispatch(getOneMonthBitcoin(res.data))
      })
      .catch(err => console.log(err))

export const fetchOneMonthEthereum = () =>
  dispatch =>
    axios.get('/api/bitcoin/oneMonthEthereum')
      .then(res => {
        dispatch(getOneMonthEthereum(res.data))
      })
      .catch(err => console.log(err))

  export const fetchOneMonthNewsBitcoin = () =>
  dispatch =>
    axios.get('/api/bitcoin/oneMonthNewsBitcoin')
      .then(res => {
        dispatch(getOneMonthNewsBitcoin(res.data))
      })
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = oneMonth, action) {
  switch (action.type) {
    case GET_ONE_MONTH_BITCOIN:
      return Object.assign({}, state, {bitcoin: action.oneMonthBitcoinData})
    case GET_ONE_MONTH_ETHEREUM:
      return Object.assign({}, state, {ethereum: action.oneMonthEthereumData})
    case GET_ONE_MONTH_NEWS_BITCOIN:
      return Object.assign({}, state, {bitcoinNews: action.oneMonthNewsBitcoin})
    default:
      return state
  }
}
