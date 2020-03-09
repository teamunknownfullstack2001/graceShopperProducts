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
import {deleteUser} from '../store'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
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
class AdminPageUser extends React.Component {
  constructor() {
    super()
    this.handleRemove = this.handleRemove.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }
  componentDidMount() {
    this.props.getUserInfo()
    this.props.getOrderInfo()
  }
  handleRemove = async userId => {
    await this.props.destroyUser(userId)

    this.props.history.push('/adminPageUser')
  }

  handleEdit = id => {
    this.props.history.push(`/users/${id}/edit`)
  }

  render() {
    const {classes} = this.props
    const {info} = this.props
    const {users, orders} = info

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
                <TableCell align="left">Action</TableCell>
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
                  <TableCell align="left">
                    <Button
                      size="large"
                      color="secondary"
                      startIcon={<DeleteForeverIcon />}
                      onClick={() => {
                        this.handleRemove(user.id)
                      }}
                    >
                      Delete
                    </Button>
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
  console.log('This is the state: ', state)
  return {
    users: state.users,
    // orders: state.orders
    info: state.admin
  }
}

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo()),
  getOrderInfo: () => dispatch(getOrderInfo()),
  destroyUser: userId => dispatch(deleteUser(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AdminPageUser))
