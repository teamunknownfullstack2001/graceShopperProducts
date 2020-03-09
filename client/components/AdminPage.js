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
class AdminPage extends React.Component {
  componentDidMount() {
    this.props.getUserInfo()
    this.props.getOrderInfo()
  }

  render() {
    const {classes} = this.props
    //  console.log("THESE ARE THE PROPS IN ADMINPAGE!", this.props)
    const {info} = this.props
    const {users, orders} = info
    console.log('This is the info I want: ', info)
    console.log('These are the users: ', users)
    console.log('These are the orders: ', orders)
    return (
      <div>
        <h1>Welcome Admin</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Zip</TableCell>
                <TableCell align="left">Phone</TableCell>
                {/* <TableCell align="left"></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell align="left">{user.id}</TableCell>
                  <TableCell align="left">{user.type}</TableCell>
                  <TableCell align="left">{user.userName}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.address}</TableCell>
                  <TableCell align="left">{user.zip}</TableCell>
                  <TableCell align="left">{user.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <h3>
          {' '}
          These are all the orders:
          <ul>
            {orders.map(order => (
              <li key={order.id}>
                <div>Order Id: {order.id}</div>
                <div>User Id For Order: {order.userId} </div>
                <div>Status: {order.status}</div>
                <div>Order Date: {order.updatedAt}</div>
              </li>
            ))}
          </ul>
        </h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('This is the state: ', state)
  return {
    // users: state.users,
    // orders: state.orders
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
)(withStyles(styles)(AdminPage))
