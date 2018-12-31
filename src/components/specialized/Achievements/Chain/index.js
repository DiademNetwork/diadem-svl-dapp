import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import * as R from 'ramda'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import withContainer from './container'
import Support from './Support'
import { withStyles } from '@material-ui/core/styles'
import Link from 'components/shared/Link'
import network from 'configurables/network'

const styles = (theme) => ({
  actions: {
    justifyContent: 'flex-end'
  },
  card: {
    padding: theme.spacing.unit
  },
  actionsButtons: {
    marginRight: theme.spacing.unit
  },
  iconButton: {
    color: theme.palette.secondary.light
  },
  link: {
    marginBottom: theme.spacing.unit
  },
  panelDetails: {
    flexDirection: 'column'
  }
})

class AchievementsChain extends Component {
  handleConfirm = () => {
    const { accessToken, confirmAchievement, currentAchievement, userID, walletAddress } = this.props
    confirmAchievement({
      address: walletAddress,
      link: currentAchievement.object,
      token: accessToken,
      user: userID
    })
  }

  handleSupport = (data) => {
    const { currentAchievement, supportAchievement } = this.props
    supportAchievement({ ...data, link: currentAchievement.object })
  }

  handleDeposit = (data) => {
    const { currentAchievement, depositForAchievement } = this.props
    depositForAchievement({ ...data, link: currentAchievement.object })
  }

  hasUserAlreadyConfirmed = R.ifElse(
    R.isNil,
    R.F,
    R.compose(
      R.contains(this.props.userID),
      R.map(R.prop('actor'))
    )
  )

  getUniqueUsersNamesFor = verb => R.compose(
    (list) => {
      const nameKey = verb === 'confirm' ? 'witnessName' : 'name'
      return R.compose(
        R.uniq,
        R.map(R.prop(nameKey))
      )(list)
    },
    R.propOr([], verb)
  )

  getTotalAmountFor = verb => R.compose(
    R.reduce(
      (acc, curr) => R.add(acc, R.prop('amount', curr)),
      0
    ),
    R.propOr([], verb)
  )

  render () {
    const {
      classes,
      currentAchievement,
      idx,
      userID,
      walletBalance
    } = this.props
    const { actor: creatorID, name: creatorName, title, object } = currentAchievement

    const uniqConfirmatorsNames = this.getUniqueUsersNamesFor('confirm')(currentAchievement)

    const confirmationsCount = R.length(uniqConfirmatorsNames)

    const commonActionsButtonsProps = {
      creatorName,
      className: classes.actionsButtons,
      idx,
      link: object,
      title
    }

    return [
      <Card
        className={classes.card}
        data-qa-id={`achievement-item-${idx}`}
        key="achievement-card"
      >
        <CardHeader title={[
          <Typography key="achievement-actor" variant="subheading" color="textSecondary">Startup of {creatorName}:</Typography>,
          <Typography key="achievement-title" variant="headline">{title}</Typography>
        ]} />
        <Divider />
        <CardContent>
          <Link
            className={classes.link}
            href={object}
            text={`View achievement post on ${network.name}`}
          />
          <Typography variant="body1" color="textSecondary">
            Warning: Ownership has not been confirmed yet
          </Typography>
        </CardContent>
        {creatorID !== userID ? (
          <CardActions
            className={classes.actions}
            disableActionSpacing
          >
            <Support
              {...commonActionsButtonsProps}
              confirmationsCount={confirmationsCount}
              onSupport={this.handleSupport}
              walletBalance={walletBalance}
            />
          </CardActions>
        ) : (
          <CardActions
            className={classes.actions}
            disableActionSpacing
          >
            <Typography>This is your startup</Typography>
          </CardActions>
        )}
      </Card>
    ]
  }
}

AchievementsChain.propTypes = {
  accessToken: T.string,
  canPerformActions: T.bool,
  classes: T.object,
  confirmAchievement: T.func,
  currentAchievement: T.object,
  depositForAchievement: T.func,
  idx: T.number,
  pastAchievements: T.array,
  userID: T.string,
  walletAddress: T.string,
  walletBalance: T.number,
  supportAchievement: T.func
}

export default R.compose(
  withContainer,
  withStyles(styles)
)(AchievementsChain)
