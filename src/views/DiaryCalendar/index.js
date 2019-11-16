import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Container, Row, Col, Button } from "reactstrap"
import { connect as reduxConnect } from "react-redux"
import Calendar from "react-calendar/dist/entry.nostyle"
import TileContent from "./TileContent"
import Moment from "react-moment"
import EntryList from "../../components/EntryList"
import { withRouter } from "react-router-dom"
import { RouterPush, RouterLinkPush } from "../../ReactRouter/Routes"
import { SetCalendar } from "../../actions/Calendar"
import { SyncEntries, GetUserEntriesByDate } from "../../actions/Entries"
import MomentJS from "moment"
import "./styles.css"
import "./stylesM.css"

const mapStateToProps = ({ Calendar: { activeDate, view } }) => ({
  activeDate,
  view
})

const mapDispatchToProps = { SetCalendar, SyncEntries, GetUserEntriesByDate }

class DiaryCalendar extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  static propTypes = {
    SetCalendar: PropTypes.func.isRequired,
    SyncEntries: PropTypes.func.isRequired,
    GetUserEntriesByDate: PropTypes.func.isRequired
  }

  static defaultProps = { activeDate: new Date() }

  componentWillMount() {
    this.getState(this.props)
  }

  componentWillUpdate(nextProps, nextState) {}

  componentDidMount() {
    const { activeDate, SyncEntries, GetUserEntriesByDate } = this.props
    SyncEntries(
      () => new Promise(resolve => resolve(GetUserEntriesByDate(activeDate)))
    )
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps)
  }

  getState = props => {
    const { activeDate, view } = props
    this.setState({ activeDate: new Date(activeDate), view })
  }

  componentDidUpdate(prevProps, prevState) {
    const { activeDate, view } = this.state
    const activeDateMoment = MomentJS(activeDate)
    const previousActiveDateMoment = MomentJS(prevState.activeDate)

    const monthChanged =
      view === "month" &&
      !activeDateMoment.isSame(previousActiveDateMoment, "month")

    const dayChanged =
      view === "month" &&
      !activeDateMoment.isSame(previousActiveDateMoment, "day")

    if (monthChanged) {
      //this.handleDateChange({ activeStartDate: activeDate, view })
      this.getUserEntriesByDate(activeDate)
    } else if (dayChanged) {
      // this.handleDateChange({ activeStartDate: activeDate, view })
    }
  }

  componentWillUnmount() {}

  handleDateChange = ({ activeStartDate, view }) => {
    // console.log("handleDateChange: ", activeStartDate, view)
    const { SetCalendar } = this.props
    SetCalendar({ activeDate: activeStartDate, view })
  }

  getUserEntriesByDate = date => {
    // console.log("getUserEntriesByDate: ", date)
    const { GetUserEntriesByDate } = this.props
    GetUserEntriesByDate(date)
  }

  render() {
    const { history } = this.props
    const { activeDate } = this.state
    return (
      <Container fluid className="DiaryCalendar Container">
        <Row>
          <Col
            className="EventList"
            md={{ size: 3, order: 1 }}
            xs={{ size: 12, order: 2 }}
          >
            <h2>
              <Moment format="MMM D">{activeDate}</Moment>
            </h2>
            <EntryList activeDate={activeDate} history={history} />
          </Col>
          <Col
            md={{ size: 9, order: 2 }}
            xs={{ size: 12, order: 1 }}
            className="p-0"
          >
            <Calendar
              //calendarType="ISO 8601"
              value={activeDate}
              ativeStartDate={new Date()} // fallback if value not set
              tileContent={props => <TileContent {...props} />}
              //tileClassName={this.tileHandler}
              // minDetail={"year"}
              showFixedNumberOfWeeks={true}
              next2Label={null}
              prev2Label={null}
              nextLabel={
                <i className="fas fa-chevron-circle-right CalendarNavigationButton" />
              }
              prevLabel={
                <i className="fas fa-chevron-circle-left CalendarNavigationButton" />
              }
              onChange={null}
              onActiveDateChange={this.handleDateChange}
              onClickDay={activeStartDate =>
                this.handleDateChange({ activeStartDate, view: "month" })
              }
              // onClickWeekNumber={props => console.log("Week: ", props)}
              onClickMonth={activeStartDate =>
                this.handleDateChange({ activeStartDate, view: "month" })
              }
              onClickYear={activeStartDate =>
                this.handleDateChange({ activeStartDate, view: "year" })
              }
              onClickDecade={activeStartDate =>
                this.handleDateChange({ activeStartDate, view: "decade" })
              }
            />
          </Col>
        </Row>
      </Container>
    )
  }
}
export default withRouter(
  reduxConnect(mapStateToProps, mapDispatchToProps)(DiaryCalendar)
)
