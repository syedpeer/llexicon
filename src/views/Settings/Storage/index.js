import React from "react"
import PropTypes from "prop-types"
import { connect as reduxConnect } from "react-redux"
import { Container, Row, Col } from "reactstrap"
import { LocalStorage } from "../../../components"

const mapStateToProps = ({}) => ({})

const Storage = ({}) => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} className="p-0">
          <LocalStorage />
        </Col>
      </Row>
    </Container>
  )
}

Storage.propTypes = {}

Storage.defaultProps = {}

export default reduxConnect(mapStateToProps)(Storage)
