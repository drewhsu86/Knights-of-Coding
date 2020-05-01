import React from 'react';
import '../App.css';
import { storiesOf } from '@storybook/react';
import axios from 'axios'
import HWKing from './HWKing'
import QuestionSolve from './QuestionSolve'

storiesOf('HW King', module)
  .add('Default', () => {
    return (

      <HWKing />

    )
  })

storiesOf('QuestionSolve Component Demo', module)
  .add('QuestionSolve Default: compareValues', () => {
    return (

      <QuestionSolve val1={15} val2={'fifteen'} />

    )
  })