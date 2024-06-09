import { Box, Button, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'


import Confetti from 'react-confetti'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../component/Spinner/Spinner'
const ConfirmOrder = () => {
  const [loading,setloading]=useState(true)
const[spinner,setspinner]=useState(true)

  useEffect(()=>{
    setTimeout(() => {
      setspinner(false)
    }, 1500);
    setTimeout(() => {
      setloading(false)
    }, 5000);
  },[loading])
  console.log('l',loading)
 const navigate=useNavigate()

 if(spinner){
  return (
    <LoadingSpinner/>
  )
 }
  return (
    <div >
     
    <Box width='50%' margin='auto'>
     {loading &&  <Confetti
      width={'1200%'}
      height={'1000%'}
      
      />}
      </Box>
     
       
     <Box  bg='rgba(254,174,26,255)'> 
      <Box w='50%' h='auto' margin={'auto'}>
        <Image border='none' src="https://bit.ly/3J2FZ5A" alt=""/>
<Box mt={{base:'80px',sm:'50px',md:'30px',lg:'0px'}}>
<Text fontSize={20} fontWeight={600} color='green' mt='-90px'>Order Confirmed</Text>
        <Text fontSize={20} fontWeight={600} color='green'>You will soon receive a mail/SMS regarding confirmation of your recent order</Text>
        <Button mt='20px' mb='50px' onClick={()=>navigate('/')}  _hover={{background:'gray.800', color:'white'}}>GO TO HOME</Button>
</Box>
        
    </Box>
   

   
    </Box> 
    
    </div>
  )
}

export default ConfirmOrder
