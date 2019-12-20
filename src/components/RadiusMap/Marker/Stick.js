import React, { Fragment, memo } from "react"
import PropTypes from "prop-types"
import {
  K_CIRCLE_SIZE,
  K_BORDER_WIDTH,
  locationCircleStyle,
  locationCircleStyleHover,
  locationStickStyle,
  locationStickStyleHover,
  locationStickStyleShadow
} from "./styles"

import { DEFAULT_POLYGON_MIN_ZOOM } from "../constants"

const infoClick = ({ center, onChangeCallback }) => {
  const [latitude, longitude] = center
  onChangeCallback({ latitude, longitude })
}

const zoomClick = ({ center, setMapCenterBoundsZoom }) =>
  setMapCenterBoundsZoom({ center, zoom: DEFAULT_POLYGON_MIN_ZOOM })

const zoomStyle = {
  fontSize: 14
}

const ClientNameCharacter = renderUserLocation => {
  const className = renderUserLocation ? "fas fa-user-circle" : "fas fa-circle"
  const style = {
    fontSize: renderUserLocation ? "inherit" : K_CIRCLE_SIZE / 2
  }
  return <i className={className} style={style} />
  // if (!clientName) clientName = 'P'
  // return <span style={clientNameCharacterStyle}>{clientName.charAt(0).toUpperCase()}</span>
}

const Info = props => (
  <i
    style={{ fontSize: K_CIRCLE_SIZE / 2 }}
    className="fas fa-map-marked-alt"
    onClick={() => infoClick(props)}
  />
)

const Zoom = props => (
  <span style={zoomStyle} onClick={() => zoomClick(props)}>
    <i className="fas fa-search-location" />
  </span>
)

const Stick = props => {
  const {
    clientName,
    shouldShowPreview,
    inGroup,
    zoom,
    renderUserLocation
  } = props
  let text = ClientNameCharacter(renderUserLocation)
  let circleStyle = locationCircleStyle
  let stickStyle = locationStickStyle

  const zoomOffset = DEFAULT_POLYGON_MIN_ZOOM - 3

  if (shouldShowPreview) {
    if (zoom <= zoomOffset) text = Zoom(props)
    else text = Info(props)
    circleStyle = locationCircleStyleHover
    stickStyle = locationStickStyleHover
  }

  return (
    <Fragment>
      <div style={circleStyle}>{text}</div>
      <div style={stickStyle} />
    </Fragment>
  )
}

Stick.propTypes = {
  $dimensionKey: PropTypes.string,
  clientName: PropTypes.string,
  shouldShowPreview: PropTypes.bool,
  inGroup: PropTypes.bool,
  center: PropTypes.arrayOf(PropTypes.number.isRequired),
  selectSite: PropTypes.func.isRequired,
  setMapCenterBoundsZoom: PropTypes.func.isRequired,
  renderUserLocation: PropTypes.bool
}

export default memo(Stick)