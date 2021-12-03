// __tests__/index.test.jsx

/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import { render, screen } from '@testing-library/react'
 import ListComment from '../components/ListComment'
 
 describe('Main', () => {
   it('renders a navigation', () => {

     render(<ListComment contactId="123" refresh/>)
    
     const loading = screen.getAllByText('loading...')

     expect(loading).toBeDefined()
 
   })
 })