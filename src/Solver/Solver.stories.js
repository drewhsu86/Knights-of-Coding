import React from 'react';
import '../App.css';
import { storiesOf } from '@storybook/react';
import axios from 'axios'
import HWKing from './HWKing'

storiesOf('HW King', module)
  .add('Default', () => {
    return (

      <HWKing />

    )
  })