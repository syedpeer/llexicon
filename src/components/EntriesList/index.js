import React, { useCallback, memo } from "react"
import PropTypes from "prop-types"
import { connect as reduxConnect } from "react-redux"
import { Col } from "reactstrap"
import { BasicList, EntryMinimal } from "../"
import { EntriesPropTypes } from "../../redux/Entries/propTypes"
import { GetUserEntries } from "../../redux/Entries/actions"
import deepEquals from "../../helpers/deepEquals"

const renderMinimalEntries = ({ data, index, style, isScrolling }) => {
  const entry = data[index]

  return (
    <Col key={entry.id} xs={12} className="fade-in px-0 py-1" style={style}>
      <EntryMinimal {...entry} />
    </Col>
  )
}

const mapStateToProps = ({ Entries: { next, search } }) => ({
  nextEntryPage: next,
  entriesSearch: search,
})

const mapDispatchToProps = {
  GetUserEntries,
}

const EntriesList = ({
  nextEntryPage,
  entriesSearch,
  onItemsRendered,
  height,
  width,
  itemSize,
  entries,
  GetUserEntries,
}) => {
  const listLength = entries.length
  const GetEntries = useCallback(() => {
    if (entriesSearch || !nextEntryPage) {
      return
    }

    const split = nextEntryPage.split(/\?page=(.*)/)
    const pageNumber = split[1]

    GetUserEntries(pageNumber)
  }, [entries])
  return (
    <BasicList
      height={height}
      width={width}
      list={entries}
      itemCount={listLength}
      itemSize={itemSize}
      onItemsRendered={onItemsRendered}
      render={renderMinimalEntries}
      onScrollToBottomOfListCallback={GetEntries}
    />
  )
}

EntriesList.propTypes = {
  entries: EntriesPropTypes,
  onItemsRendered: PropTypes.func,
  height: PropTypes.number.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  GetUserEntries: PropTypes.func.isRequired,
}

EntriesList.defaultProps = {
  height: 500,
  width: "100%",
  itemSize: 150,
}

const isEqual = (prevProps, nextProps) => deepEquals(prevProps, nextProps)

export default reduxConnect(
  mapStateToProps,
  mapDispatchToProps
)(memo(EntriesList, isEqual))
