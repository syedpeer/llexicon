import React, { useMemo, memo } from "react"
import PropTypes from "prop-types"
import { ColumnsPropType, DataPropType } from "../propTypes"
import TableRow from "./TableRow"

const TableBody = ({ columns, data, currentPage, pageSize, onRowClick }) => {
  const sliceStart = currentPage * pageSize

  const sliceEnd = sliceStart + pageSize

  const slicedData = useMemo(() => data.slice(sliceStart, sliceEnd), [data])

  const renderTableRows = useMemo(
    () =>
      slicedData.map((item, i) => (
        <TableRow
          key={i}
          onRowClick={onRowClick}
          item={item}
          columns={columns}
        />
      )),
    [slicedData, columns]
  )
  return <tbody>{renderTableRows}</tbody>
}

TableBody.propTypes = {
  columns: ColumnsPropType,
  data: DataPropType,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onRowClick: PropTypes.func,
}

export default memo(TableBody)
