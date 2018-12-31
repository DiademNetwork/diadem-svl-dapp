import { merge } from 'modules/utils'
import T from './types'

const initialState = {
  data: null,
  checkRegistrationFailReason: 'none',
  hasPendingTx: false,
  isRegistered: false,
  loadFailReason: 'none',
  mnemonic: '',
  privateKey: '',
  recoverFailReason: 'none',
  status: 'none',
  util: null
}

export default function createReducer (state, {
  hasPendingTx,
  mnemonic,
  privateKey,
  reason,
  type,
  walletUtil: util,
  walletData: data
}) {
  if (typeof state === 'undefined') { return initialState }
  switch (type) {
    case T.LOAD.succeeded: return merge(state)({ data, util, loadFailReason: 'none', status: 'loaded' })
    case T.LOAD.failed: return merge(state)({ loadFailReason: reason, status: 'failed' })
    case T.GENERATE.succeeded: return merge(state)({ data, mnemonic, privateKey, util, status: 'generated' })
    case T.RECOVER.requested: return merge(state)({ status: 'is-recovering' })
    case T.RECOVER.succeeded: return merge(state)({ data, util, loadFailReason: 'none', recoverFailReason: 'none', status: 'recovered' })
    case T.RECOVER.failed: return merge(state)({ recoverFailReason: reason, status: 'none' })
    case T.REFRESH.succeeded: return merge(state)({ data })
    case T.CHECK_LAST_TX.succeeded: return merge(state)({ hasPendingTx })
    case T.INFO_SAVED: return merge(state)({ status: 'restoring-info-saved' })
    case T.CHECK_REGISTRATION.succeeded: return merge(state)({ checkRegistrationFailReason: 'none', isRegistered: true })
    case T.CHECK_REGISTRATION.failed: return merge(state)({ checkRegistrationFailReason: reason, isRegistered: false })
    default: return state
  }
}
