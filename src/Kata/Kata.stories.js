import React from 'react';
import '../App.css';
import { storiesOf } from '@storybook/react';

import KataKnight from './KataKnight'
import KataSword from './KataSword'

storiesOf('KataKnight Icon', module)
  .add('Default', () => <KataKnight />)
  .add('4 Kyu, blue', () => <KataKnight rankText="4 Kyu" color="blue" />)
  .add('5 Kyu, yellow', () => <KataKnight rankText="5 Kyu" color="yellow" />)
  .add('7 Kyu, white', () => <KataKnight rankText="7 Kyu" color="white" />)
  .add('1 Dan, black', () => <KataKnight rankText="1 Dan" color="black" />)
  .add('Default', () => <KataKnight />)
  .add('Default Small', () => <KataKnight small />)
  .add('Small, 4 Kyu, blue', () => <KataKnight rankText="4 Kyu" color="blue" small />)
  .add('Small, 5 Kyu, yellow', () => <KataKnight rankText="5 Kyu" color="yellow" small />)
  .add('Small, 7 Kyu, white', () => <KataKnight rankText="7 Kyu" color="white" small />)
  .add('Small, 1 Dan, black', () => <KataKnight rankText="1 Dan" color="black" small />)

storiesOf('KataSword Icon', module)
  .add('Default', () => <KataSword />)
  .add('4 Kyu, blue', () => <KataSword rankText="4 Kyu" color="blue" />)
  .add('5 Kyu, yellow', () => <KataSword rankText="5 Kyu" color="yellow" />)
  .add('7 Kyu, white', () => <KataSword rankText="7 Kyu" color="white" />)
  .add('1 Dan, black', () => <KataSword rankText="1 Dan" color="black" />)
  .add('Default Small', () => <KataSword small />)
  .add('Small, 4 Kyu, blue', () => <KataSword rankText="4 Kyu" color="blue" small />)
  .add('Small, 5 Kyu, yellow', () => <KataSword rankText="5 Kyu" color="yellow" small />)
  .add('Small, 7 Kyu, white', () => <KataSword rankText="7 Kyu" color="white" small />)
  .add('Small, 1 Dan, black', () => <KataSword rankText="1 Dan" color="black" small />)
