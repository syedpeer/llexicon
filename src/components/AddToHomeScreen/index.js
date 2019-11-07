import * as React from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { useAddToHomescreenPrompt } from "./prompt"

const AddToHomeScreen = ({ isInStandalone }) => {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt()
  const [isVisible, setVisibleState] = React.useState(!isInStandalone)

  const toggle = () => setVisibleState(!isVisible)

  const hide = () => setVisibleState(false)

  React.useEffect(() => {
    if (prompt) {
      setVisibleState(true)
    }
  }, [prompt])

  //   if (isVisible) {
  //     return <noscript />
  //   }

  return (
    <Modal isOpen={isVisible} toggle={toggle} className="ConfirmActionModal">
      <ModalHeader toggle={toggle} className="Center">
        Installation
      </ModalHeader>
      <ModalBody>
        Would you like to install this app? Doing so will allow the following
        features:
        <li>Native App Interface</li>
        <li>Offline Use</li>
      </ModalBody>
      <ModalFooter className="Center">
        <Button
          color="success"
          onClick={() => {
            promptToInstall()
            hide()
          }}
        >
          <i className="fab fa-android" /> Install
        </Button>{" "}
        <Button color="primary" onClick={hide}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default AddToHomeScreen
