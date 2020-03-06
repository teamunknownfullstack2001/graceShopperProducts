/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {Provider} from 'react-redux'
import * as rrd from 'react-router-dom'
import enzyme, {shallow, mount} from 'enzyme'
import {UserHome} from './user-home'
import ProductDummy from './ProductDummy'

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
  const product = [
    {id: 1, imageUrl: 'testimage1.png', name: 'product1', price: '50'},
    {id: 2, imageUrl: 'testimage1.jpeg', name: 'product2', price: '100'}
  ]
  beforeEach(() => {
    fakeStore = mockStore(initialState)
  })

  beforeEach(() => {
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

  it('renders the products passed in as props', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <ProductDummy
            product={[
              {
                id: 1,
                imageUrl: 'testimage1.png',
                name: 'product1',
                price: '50'
              },
              {
                id: 2,
                imageUrl: 'testimage1.jpeg',
                name: 'product2',
                price: '100'
              }
            ]}
          />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.text()).to.include('product1')
    expect(wrapper.text()).to.include('product2')
    const images = wrapper.find('img').map(node => node.get(0).props.src)
    expect(images).to.include.members(['testimage1.png', 'testimage2.jpeg'])
  })

  it('renders "No Products" if passed an empty array of products or if products are undefined', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <MemoryRouter>
          <ProductDummy product={[]} />
        </MemoryRouter>
      </Provider>
    )
    expect(wrapper.text()).to.include('No Products')
  })
})
