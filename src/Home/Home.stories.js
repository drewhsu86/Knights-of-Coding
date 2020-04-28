import React from 'react';
import '../App.css';
import { storiesOf } from '@storybook/react';

import NavButton from './NavButton'
import NavCastle from './NavCastle'

storiesOf('Nav Button', module)
  .add('Default', () => <NavButton text="Default" />)

storiesOf('Nav Castle Header', module)
  .add('Default', () => <NavCastle />)
