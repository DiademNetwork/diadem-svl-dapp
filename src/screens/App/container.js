import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import S from 'modules/selectors'
import A from 'modules/actions'

const mapStateToProps = (state) => ({
  hasUnreadTransactions: S.transactions.hasUnread(state),
  hasUnreadAchievements: S.achievements.list.hasUnread(state),
  userID: S.login.userID(state),
  userQtumAddress: S.wallets.address(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  achievementsOpenned: A.achievements.openned,
  transactionsOpenned: A.transactions.openned
}, dispatch)

export default WrappedComponent =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
