import React from 'react';
import '../App.css';
import { storiesOf } from '@storybook/react';
import KataThumb from './KataThumb'
import { BrowserRouter } from 'react-router-dom'

storiesOf('Kata Thumbnail', module)
  .add('Default', () => {
    return (
      <BrowserRouter>
        <KataThumb kata={{ id: null, name: 'Test Kata Title' }} />
      </BrowserRouter>
    )
  })


