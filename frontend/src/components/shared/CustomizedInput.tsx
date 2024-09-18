import { TextField } from '@mui/material'
import React from 'react'

type Props={
    name: string
    type: string
    label: string
}
const CustomizedInput=(props:Props)=> {
  return (
    <TextField 
    margin='normal'
    InputLabelProps={{style:{color: 'white'}}}
   InputProps={{style:{width:"400x",borderRadius:10, fontSize:20, color: "white"}}}
    name={props.name} 
    type={props.type} 
    label={props.label}/>
  )
}

export default CustomizedInput
