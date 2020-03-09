import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import Button from '@material-ui/core/Button'
import {fade, makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  navContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },

  navProduct: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
}))

const Navbar = ({handleClick, isLoggedIn, user}) => {
  const classes = useStyles()
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorelcart, setanchorelcart] = React.useState(null)
  const open = Boolean(anchorEl)
  const openCart = Boolean(anchorelcart)

  const handleChange = event => {
    setAuth(event.target.checked)
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCart = event => {
    setanchorelcart(event.currentTarget)
  }

  const handleCartClose = () => {
    setanchorelcart(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {user.type === 'admin' ? (
            <div className={classes.navContainer}>
              {/* The navbar will show these links if admin */}
              <div className={classes.navProduct}>
                <Link to="/Products">
                  <Button style={{color: 'white'}}>All Products</Button>
                </Link>
              </div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{'aria-label': 'search'}}
                />
              </div>

              <IconButton
                aria-label="cart of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleCart}
                color="inherit"
              >
                <ShoppingCartIcon />
              </IconButton>
              <Menu
                id="cart-appbar"
                anchorEl={anchorelcart}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={openCart}
                onClose={handleCartClose}
              >
                <Link to={`/Cart/${user.id}`}>
                  <MenuItem
                    onClick={handleCartClose}
                    style={{textDecoration: 'none', color: 'black'}}
                  >
                    Cart
                  </MenuItem>
                </Link>
                <Link to={`/OrderHistory/${user.id}`}>
                  <MenuItem
                    onClick={handleCartClose}
                    style={{textDecoration: 'none', color: 'black'}}
                  >
                    Order History
                  </MenuItem>
                </Link>
              </Menu>

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to={`/UserProfile/${user.id}`}>
                  <MenuItem
                    onClick={handleClose}
                    style={{textDecoration: 'none', color: 'black'}}
                  >
                    Profile
                  </MenuItem>
                </Link>

                <Link to="/adminPage">
                  <MenuItem
                    onClick={handleClose}
                    style={{textDecoration: 'none', color: 'black'}}
                  >
                    Admin Page
                  </MenuItem>
                </Link>

                <MenuItem
                  onClick={(handleClose, handleClick)}
                  style={{textDecoration: 'none', color: 'black'}}
                >
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          ) : isLoggedIn ? (
            <div className={classes.navContainer}>
              {/* The navbar will show these links after you log in */}
              <div className={classes.navProduct}>
                <Link to="/Products">
                  <Button style={{color: 'white'}}>All Products</Button>
                </Link>
              </div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{'aria-label': 'search'}}
                />
              </div>

              <IconButton
                aria-label="cart of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleCart}
                color="inherit"
              >
                <ShoppingCartIcon />
              </IconButton>
              <Menu
                id="cart-appbar"
                anchorEl={anchorelcart}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={openCart}
                onClose={handleCartClose}
              >
                <Link to={`/Cart/${user.id}`}>
                  <MenuItem
                    onClick={handleCartClose}
                    style={{textDecoration: 'none', color: 'black'}}
                  >
                    Cart
                  </MenuItem>
                </Link>
                <Link to={`/OrderHistory/${user.id}`}>
                  <MenuItem
                    onClick={handleCartClose}
                    style={{textDecoration: 'none', color: 'black'}}
                  >
                    Order History
                  </MenuItem>
                </Link>
              </Menu>

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to={`/UserProfile/${user.id}`}>
                  <MenuItem
                    onClick={handleClose}
                    style={{textDecoration: 'none', color: 'black'}}
                  >
                    Profile
                  </MenuItem>
                </Link>

                <MenuItem
                  onClick={(handleClose, handleClick)}
                  style={{textDecoration: 'none', color: 'black'}}
                >
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className={classes.navContainer}>
              {/* The navbar will show these links before you log in */}
              <div className={classes.navProduct}>
                <Link to="/Products">
                  <Button style={{color: 'white'}}>All Products</Button>
                </Link>
              </div>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{'aria-label': 'search'}}
                />
              </div>
              <IconButton
                aria-label="cart of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleCart}
                color="inherit"
              >
                <ShoppingCartIcon />
              </IconButton>
              <Menu
                id="cart-appbar"
                anchorEl={anchorelcart}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={openCart}
                onClose={handleCartClose}
              >
                <Link to="/Cart/0">
                  <MenuItem
                    onClick={handleCartClose}
                    style={{textDecoration: 'none', color: 'black'}}
                  >
                    Cart
                  </MenuItem>
                </Link>
              </Menu>

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to="/login">
                  <MenuItem
                    onClick={handleClose}
                    style={{textDecoration: 'none', color: 'black'}}
                  >
                    Login
                  </MenuItem>
                </Link>
                <Link to="/signup">
                  <MenuItem
                    onClick={handleClose}
                    style={{textDecoration: 'none', color: 'black'}}
                  >
                    Sign Up{' '}
                  </MenuItem>
                </Link>
              </Menu>

              {/*<Link to="/Products">Products</Link>
          <Link to={`/Cart/${user.id}`}>Cart</Link>
          <Link to="/payment">Payment</Link>
          <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>*/}
            </div>
          )}
        </Toolbar>
      </AppBar>
      <hr />
    </div>
  )
}

// const Navbar = ({handleClick, isLoggedIn, user}) => (
//   <div>
//     <h1>All The Cozies Zzzzz..</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/Products">Products</Link>
//           <Link to="/payment">Payment</Link>
//           <Link to={`/Cart/${user.id}`}>Cart</Link>
//           <Link to={`/UserProfile/${user.id}`}>My Profile</Link>
//           {/* <Link to={`/OrderHistory/${user.id}`}>My Order History</Link> */}
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//           <Link to="/Products">Products</Link>
//           <Link to="/payment">Payment</Link>
//           <Link to={`/Cart/${user.id}`}>Cart</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )
/**
 * CONTAINER
 */
const mapState = state => {
  return {user: state.user, isLoggedIn: !!state.user.id}
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
