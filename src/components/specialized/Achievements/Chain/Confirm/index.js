import React, { Component, Fragment } from 'react'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Hidden from '@material-ui/core/Hidden'
import DoneIcon from '@material-ui/icons/Done'
import Link from 'components/shared/Link'
import network from 'configurables/network'

class AchievementConfirm extends Component {
  state = {
    modalOpen: false
  }

  handleClickOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  handleConfirm = () => {
    const { onConfirm } = this.props
    if (onConfirm) { onConfirm() }
    this.handleClose()
  }

  render () {
    const {
      actionAlreadyDone,
      className,
      fullScreen,
      idx,
      canPerformActions,
      link,
      creatorName,
      title
    } = this.props
    const { modalOpen } = this.state
    return (
      <Fragment>
        <Button
          aria-label="Confirm"
          color="secondary"
          className={className}
          data-qa-id={`achievement-${idx}-confirm-button`}
          key='achievement-confirm-button'
          disabled={!canPerformActions || actionAlreadyDone}
          onClick={this.handleClickOpen}
          variant={fullScreen ? 'contained' : 'extendedFab'}
        >
          <Hidden smDown>
            <DoneIcon />
          </Hidden>
          {actionAlreadyDone ? 'You confirmed already' : 'Confirm'}
        </Button>
        <Dialog
          aria-labelledby="form-dialog-title"
          data-qa-id={`achievement-${idx}-confirm-modal`}
          fullScreen={fullScreen}
          key='achievement-confirm-modal'
          open={modalOpen}
          onClose={this.handleClose}
        >
          <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText component="div">
              <Typography paragraph variant="body1">
                Has {creatorName} really done achievement?<br /><br />
                {title}
              </Typography>
              <Link
                text={`View achievement post on ${network.name} again`}
                href={link}
                typographyProps={{
                  paragraph: true
                }}
              />
              <Typography variant="caption" color="textSecondary">
                Confirmations make other Diadem Network users know they support real achievement(s)<br />
                Please confirm only achievement(s) you are sure of
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              data-qa-id={`achievement-${idx}-confirm-cancel-button`}
              onClick={this.handleClose}
            >
              I'm not sure
            </Button>
            <Button
              color="secondary"
              data-qa-id={`achievement-${idx}-confirm-submit-button`}
              onClick={this.handleConfirm}
              variant="contained"
            >
              yes, {creatorName} has!
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

AchievementConfirm.propTypes = {
  actionAlreadyDone: T.bool,
  canPerformActions: T.bool,
  className: T.string,
  creatorName: T.string,
  fullScreen: T.bool,
  idx: T.number,
  link: T.string,
  onConfirm: T.func,
  title: T.string
}

export default withMobileDialog()(AchievementConfirm)
