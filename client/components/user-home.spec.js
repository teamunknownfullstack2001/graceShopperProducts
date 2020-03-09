/* global describe beforeEach it */

import {expect} from 'chai'
import 'jsdom-global/register'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {Provider} from 'react-redux'
import * as rrd from 'react-router-dom'
import enzyme, {shallow, mount} from 'enzyme'
import ConnectedUserHome, {UserHome} from './UserHome'
import {fetchProducts} from '../store/products'
import {store} from '../store/index'

const {MemoryRouter, NavLink} = rrd
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const initialState = {
  products: [],
  user: {}
}

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome
  let fakeStore
  const products = [
    {id: 1, imageUrl: 'testimage1.png', name: 'product1', price: '50'},
    {id: 2, imageUrl: 'testimage1.jpeg', name: 'product2', price: '100'}
  ]

  beforeEach(() => {
    fakeStore = mockStore(initialState)
    userHome = shallow(<UserHome email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    // expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
    expect(
      userHome.findWhere(
        n => n.type() === 'h3' && n.contains('Welcome, cody@email.com')
      )
    )
  })

  it('renders the products passed in as props', async () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <UserHome products={products} user={[{userName: 'cody'}]} />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.text()).to.include('product1')
    expect(wrapper.text()).to.include('product2')
    const images = wrapper.find('img').map(node => node.get(0).props.src)
    expect(images).to.include.members(['testimage1.png', 'testimage1.jpeg'])
  })

  // it('is passed products from store as props', async () => {
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <MemoryRouter initialEntries={['/robots']}>
  //         <ConnectedUserHome />
  //       </MemoryRouter>
  //     </Provider>
  //   )
  //   store.dispatch(fetchProducts())
  //   await waitFor(10)
  //   wrapper.update()
  //   const { products: reduxProducts } = store.getState()
  //   const { robots: componentProducts } = wrapper.find(UserHome).props()
  //   expect(componentProducts).to.deep.equal(reduxProducts)
  // })
})
