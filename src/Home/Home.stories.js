import React from 'react';
import '../App.css';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom'

import Nav from './Nav'
import NavButton from './NavButton'
import NavCastle from './NavCastle'

import Favorite from './Favorite'
import Favorites from './Favorites'

storiesOf('Nav Elements', module)
  .add('Nav Bar', () => {
    return (
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    )
  })
  .add('Nav Button', () => <NavButton text="Default" />)
  .add('Nav Castle Wall', () => <NavCastle />)

storiesOf('Favorites List', module)
  .add('Favorite User', () => {
    return (
      <BrowserRouter>
        <Favorite username="Test Name" />
      </BrowserRouter>
    )
  })
  .add('Favorite List Page', () => {
    return (
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    )
  })

