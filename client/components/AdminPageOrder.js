import React from 'react'
import {connect} from 'react-redux'
import {getUserInfo, getOrderInfo} from '../store'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
const styles = theme => ({
  root: {
    marginTop: '1vh',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    color: 'black',
    borderRadius: 3,
    margin: '0',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: 'gray',
      flexDirection: 'column'
    }
  }
})
class AdminPageOrder extends React.Component {
  componentDidMount() {
    this.props.getUserInfo()
    this.props.getOrderInfo()
  }

  render() {
    const {classes} = this.props
    const {info} = this.props
    const {orders} = info
    return (
      <div className="standardContainer">
        <h2>Welcome Admin</h2>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">User ID</TableCell>
                <TableCell align="left">Status </TableCell>
                <TableCell align="left">Total</TableCell>
                <TableCell align="left">Payment Ref Num</TableCell>
                <TableCell align="left">Order Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order.id}>
                  <TableCell align="left">{order.id}</TableCell>
                  <TableCell align="left">{order.userId}</TableCell>
                  <TableCell align="left">{order.status}</TableCell>
                  <TableCell align="left">{order.total}</TableCell>
                  <TableCell align="left">{order.stripeId}</TableCell>
                  <TableCell align="left">
                    {order.updatedAt.slice(0, 10)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    info: state.admin
  }
}

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo()),
  getOrderInfo: () => dispatch(getOrderInfo())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AdminPageOrder))
