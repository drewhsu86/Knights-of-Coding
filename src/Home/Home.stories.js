import React from 'react';
import '../App.css';
import { storiesOf } from '@storybook/react';

import NavButton from './NavButton'
import NavCastle from './NavCastle'

storiesOf('Nav Button', module)
  .add('Nav Button', () => <NavButton text="Default" />)
  .add('Nav Castle Wall', () => <NavCastle />)
