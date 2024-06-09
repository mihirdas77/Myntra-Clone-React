import React, { useEffect, useState } from 'react'
import {Box,Button} from '@chakra-ui/react'
import { getWomenProduct } from '../Redux/action'
import { useDispatch } from 'react-redux'
const Paggination = () => {
const[page,setpage]=useState(1)
const dispatch=useDispatch()
// useEffect(()=>{
//     dispatch(getWomenProduct(page))
// },[page])
console.log('p',page);

const handlepre=(e)=>{
e.preventDefault()
setpage(page+1)
}
// useEffect(()=>{
//     dispatch(getWomenProduct(page))
// },[page])
  return (
    <div>
    <Box w='71%' display={'flex'} justifyContent={'space-between'}>
        <Box></Box>
        <Box mt='20px' display='flex' gap='15px' mb='20px'>
        <Button background={'orange.300'} color='white' >Pre</Button>
        <Button>{page}</Button>
        <Button background={'orange.300'} color='white' onClick={handlepre}>Next</Button></Box>
       
    </Box>
    </div>
  )
}

export default Paggination
