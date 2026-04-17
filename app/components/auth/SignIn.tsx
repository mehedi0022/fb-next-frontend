import { Field } from '@/lib'
import React from 'react'


export default function SignIn() {
  return (
    <div>
        <Field htmlFor='Email' label=''>
            <input type="email" className='border-2 p-2' placeholder='Enter your email'/>
        </Field>
    </div>
  )
}
