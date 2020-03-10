import React from 'react'
import {connect} from 'react-redux'
import {getUserInfo, getOrderInfo, adminDeleteUserThunk} from '../store'
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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'

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
    this.props.adminDeleteUser(userId)
    // this.props.history.push('/adminPageUser')
  }

  handleEdit = async id => {
    this.props.history.push(`/adminPageUser?userId=${id}`)
  }

  render() {
    const {classes} = this.props
    const {info} = this.props
    const {users} = info

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
                    <Link
                      to={{
                        pathname: `/adminPageUser/${user.id}`,
                        initialValues: user
                      }}
                    >
                      <Button
                        size="large"
                        color="secondary"
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </Link>
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
    users: state.users,
    info: state.admin
  }
}

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo()),
  getOrderInfo: () => dispatch(getOrderInfo()),
  // destroyUser: userId => dispatch(deleteUser(userId)),
  adminDeleteUser: id => dispatch(adminDeleteUserThunk(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AdminPageUser))
