const router = require('express').Router()
const axios = require('axios')
const { Bitcoin } = require('../db/models')
const AylienNewsApi = require('aylien-news-api');
const apiInstance = new AylienNewsApi.DefaultApi()

module.exports = router

router.get('/oneMonthEthereum', (req, res, next) => {
  axios.get(`https://etherchain.org/api/statistics/price`)
    .then(res => {
      let arr = [];
      res.data.data.slice(-720).forEach((obj, i) => {
        if (i % 24 === 0) arr.push({ ethereumPrice: obj.usd, date: obj.time })
      })
      return arr
    })
    .then(myArr => {
      myArr.forEach((obj) => {
        Bitcoin.update({
          ethereumPrice: obj.ethereumPrice
        },
          {
            where: {
              date: obj.date
            }
          })
      })
    })
    .then(() =>
      Bitcoin.findAll()
    )
    .then(data => {
      res.json(data)
    })
    .catch(next)
})


router.get('/oneMonthBitcoin', (req, res, next) => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  var lastMonth = ((mm * 1) - 1).toString()
  var lastDd = ((dd * 1) + 1).toString()
  if (dd === '31') lastDd = '1'
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${yyyy}-${lastMonth}-${lastDd}&end=${yyyy}-${mm}-${dd}`)
    .then(res => {
      let arr = [];
      for (let key in res.data.bpi) {
        arr.push({ date: key, bitcoinPrice: res.data.bpi[key] })
      }
      return arr
    })
    // .then(myArr => {
    //   Bitcoin.destroy({ truncate: true });
    //   return myArr
    // })
    .then(myArr => {
      Bitcoin.bulkCreate(myArr)
        .then(() =>
          Bitcoin.findAll()
        )
        .then(data => {
          res.json(data)
        })
    })
    .catch(next)
})

router.get('/oneMonthNewsBitcoin', (req, res, next) => {
  let data;
  // Configure API key authorization: app_id
  var app_id = apiInstance.apiClient.authentications.app_id;
  app_id.apiKey = '0ccaae63';

  // Configure API key authorization: app_key
  var app_key = apiInstance.apiClient.authentications.app_key;
  app_key.apiKey = 'a63ec28bb815853e6859dee572afa848';


    var opts = {
      title: 'ethereum',
      sortBy: 'social_shares_count.facebook',
      language: ['en'],
      publishedAtStart: 'NOW-19DAYS',
      publishedAtEnd: 'NOW-18DAYS'
    }

    var callback = function (error, data, response) {
      if (error) {
        console.error(error);
      } else {
        let negative = 0;
        let neutral = 0;
        let positive = 0;
        for (let i = 0; i < data.stories.length; i++) {
          let polarity = data.stories[i].sentiment.body.polarity
          let date = data.stories[i].publishedAt
          // date = date+''
          var dd = date.getDate();
          var mm = date.getMonth() + 1; //January is 0!
          var yyyy = date.getFullYear();
          if (polarity === 'negative') negative++;
          if (polarity === 'positive') positive++;
          if (polarity === 'neutral') neutral++;
          Bitcoin.update({
            ethereumPositive: positive,
            ethereumNegative: negative,
            ethereumNeutral: neutral
          },
            {
              where: {
                date: yyyy + '-' + mm + '-' + dd
              }
            })
        }

      }

  }

    apiInstance.listStories(opts, callback);



  res.json({})
})

