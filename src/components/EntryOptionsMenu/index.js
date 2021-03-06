import React, { Fragment, useState, useCallback, memo } from "react"
import PropTypes from "prop-types"
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap"
import {
  BasicModal,
  ConfirmAction,
  ShareOnFaceBook,
  ShareOnLinkedIn,
  ShareOnTwitter,
} from "../"
import { copyStringToClipboard, shareUrl } from "../../helpers"
import { RouterGoBack } from "../../routes"
import { useDispatch } from "react-redux"
import { UpdateReduxEntry, SyncEntries } from "../../redux/Entries/actions"
import { BASE_JOURNAL_ENTRY_ID } from "../../redux/Entries/reducer"
import "./styles.css"

const EntryOptionsMenu = ({
  entryId,
  title,
  is_public,
  history,
  shouldSyncOnUpdate,
  shouldRedirectOnDelete,
  readOnly,
}) => {
  const dispatch = useDispatch()
  const [dropdownOpen, setOpen] = useState(false)
  const [urlCopied, setUrlCopied] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const toggleDropdown = () => setOpen(!dropdownOpen)
  const toggleModal = () => setShowModal(!showModal)

  const { href } = window.location
  const url = href
  const entryIsLocalOnly = entryId.toString().includes(BASE_JOURNAL_ENTRY_ID)
  const canShareOnMobileDevice = !entryIsLocalOnly && navigator.share

  const handleSync = useCallback(() => dispatch(SyncEntries()), [])

  const handleEditorChange = useCallback(({ ...payload }) => {
    dispatch(UpdateReduxEntry(entryId, payload))
    shouldSyncOnUpdate && handleSync()
  }, [])

  const handleDelete = useCallback(() => {
    shouldRedirectOnDelete && RouterGoBack(history)
    setTimeout(() => {
      handleEditorChange({
        _shouldDelete: true,
      })

      handleSync()
    }, 200)
  }, [history])

  const handleCopyAndMakePublic = useCallback(() => {
    copyStringToClipboard(url)
    setUrlCopied(true)
    !is_public && handleEditorChange({ is_public: true })
  }, [is_public])

  const handleToggleIsPublic = useCallback(() => {
    setUrlCopied(false)
    handleEditorChange({ is_public: !is_public })
  }, [is_public])

  const handleShareOnMobile = useCallback(() => {
    !readOnly && handleEditorChange({ is_public: true })

    const sharePayload = {
      url,
      title,
      text: "Check out my journal entry: ",
    }

    shareUrl(sharePayload)
  }, [is_public, url, title])

  return (
    <ButtonDropdown
      className="EntryOptionsMenu"
      direction="up"
      isOpen={dropdownOpen}
      toggle={toggleDropdown}
    >
      <DropdownToggle>
        <i className="fas fa-ellipsis-v" style={{ fontSize: 20 }} />
      </DropdownToggle>
      <DropdownMenu right className="EntryOptionsDropDown">
        <DropdownItem header>
          <Button
            color={!canShareOnMobileDevice ? "primary" : "accent"}
            className="EntryOptionsMenuShareButton"
            disabled={!canShareOnMobileDevice}
            onClick={handleShareOnMobile}
          >
            <i className="fas fa-share mr-1" />
            <span>{url}</span>
          </Button>
        </DropdownItem>

        <DropdownItem divider />
        <div className="SocialMediaShareContainer">
          <ShareOnFaceBook url={url} />
          <ShareOnLinkedIn url={url} />
          <ShareOnTwitter text={`Check my journal entry: ${url}`} />
        </div>
        <DropdownItem divider />

        <Fragment>
          <DropdownItem onClick={handleCopyAndMakePublic} disabled={readOnly}>
            <i className={`fas fa-${urlCopied ? "check" : "clipboard"} mr-1`} />
            Copy and make public
          </DropdownItem>
          <DropdownItem onClick={handleToggleIsPublic} disabled={readOnly}>
            <i className={`fas fa-lock${is_public ? "-open" : ""} mr-1`} />
            {`Make ${is_public ? "Private" : "Public"}`}
          </DropdownItem>
          <DropdownItem divider />

          <DropdownItem
            onClick={toggleModal}
            style={{ color: "var(--danger)" }}
            disabled={readOnly}
          >
            <i className="fas fa-trash-alt mr-1" />
            Delete Entry
            <BasicModal
              size="xs"
              button={false}
              show={showModal}
              title={"Delete Entry"}
              footer={
                <Fragment>
                  <Button color="danger" onClick={handleDelete}>
                    Confirm
                  </Button>
                  <Button color="success" onClick={toggleModal}>
                    Cancel
                  </Button>
                </Fragment>
              }
            >
              <span className="Center">
                Are you sure you want to delete this entry?
              </span>
            </BasicModal>
          </DropdownItem>
        </Fragment>
      </DropdownMenu>
    </ButtonDropdown>
  )
}

EntryOptionsMenu.propTypes = {
  entryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string,
  is_public: PropTypes.bool.isRequired,
  history: PropTypes.object,
  shouldSyncOnUpdate: PropTypes.bool,
  shouldRedirectOnDelete: PropTypes.bool,
  readOnly: PropTypes.bool.isRequired,
}

EntryOptionsMenu.defaultProps = {
  shouldSyncOnUpdate: false,
  shouldRedirectOnDelete: false,
  readOnly: true,
}

export default memo(EntryOptionsMenu)
