import React from 'react';
import { storiesOf } from '@storybook/react';

import NavButton from './NavButton.js'

storiesOf('Nav Button', module)
  .add('Default', () => <NavButton text="Default" />)
