import axios from 'axios'
import mockAxios from 'mocks/axios'

// dependencies are injected for easier testing /mocking
export const createInsight = (fetcher, url) => {
  function getUrl (path) {
    return [url, path].join('/')
  }

  async function checkTransactions (path) {
    return fetcher.get(getUrl(path))
  }

  return Object.freeze({
    checkTransactions
  })
}

if (process.env.ENV === 'sandbox') {
  mockAxios()
}

export default createInsight(axios, process.env.QTUM_INSIGHT_URL)
