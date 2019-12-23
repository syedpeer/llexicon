import React, { PureComponent, Fragment } from "react"
import PropTypes from "prop-types"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import "./styles.css"

class ConfirmAction extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { show: false, ...props }
  }

  static propTypes = {
    onClickCallback: PropTypes.func,
    title: PropTypes.string,
    icon: PropTypes.object,
    buttonClassName: PropTypes.string
  }

  static defaultProps = { show: false, disabled: false }

  componentWillUnmount() {
    this.setState({ show: false })
  }

  handleConfirm = () => {
    const { onClickCallback } = this.props
    onClickCallback()
  }

  toggleShow = () => {
    this.setState(currentState => ({ show: !currentState.show }))
  }

  render() {
    const { buttonClassName } = this.props
    const { show, disabled, icon, title } = this.state
    return (
      <Fragment>
        <Button
          disabled={disabled}
          color="inherit"
          onClick={this.toggleShow}
          className={buttonClassName}
        >
          {icon}
        </Button>
        <Modal
          isOpen={show}
          toggle={this.toggleShow}
          className="ConfirmActionModal"
        >
          <ModalHeader toggle={this.toggleShow} className="Center">
            {title}
          </ModalHeader>
          <ModalBody>Are you sure you want to complete this action?</ModalBody>
          <ModalFooter className="Center">
            <Button color="danger" onClick={this.handleConfirm}>
              Confirm
            </Button>{" "}
            <Button color="primary" onClick={this.toggleShow}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    )
  }
}
export default ConfirmAction
