import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    useMergeRefs,
    InputRightElement,
    Image,
    IconButton,
    InputGroup,
    Text,
    useDisclosure,
  } from '@chakra-ui/react'
  import { forwardRef, useEffect, useRef, useState } from 'react'
  import { HiEye, HiEyeOff } from 'react-icons/hi'
  import toast, { Toaster } from 'react-hot-toast';
  import { OAuthButtonGroup } from './authbutton'

  import { PasswordField } from './passwordfield'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Redux/action';
import { AUTH_TRUE } from '../Redux/actiontypes';
  
   const Login = () => {
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')

    const { isOpen, onToggle } = useDisclosure()
   const inputRef = useRef<HTMLInputElement>(null)
 
   const mergeRef = useMergeRefs(inputRef)
   const onClickReveal = () => {
     onToggle()
     if (inputRef.current) {
       inputRef.current.focus({ preventScroll: true })
     }
   }
   
   const navigate=useNavigate()
   const dispatch=useDispatch()
   const { users } = useSelector((state) => state.products);

   const HandleSubmit=(e)=>{
 e.preventDefault()
 setemail('')
 setpassword('')
 let flag=false;
 for(let i=0; i<users.length; i++){
  if(email==users[i].email && password==users[i].password){
    flag=true;
    break;
  }
 }
 if(flag){
  localStorage.setItem("auth",true);
  toast.success('Login Successfully !!')
  dispatch({type:AUTH_TRUE,payload:true})
  navigate('/')
 }else{
  toast.error("Wrong Credentials")
 }
 

 
 
 
//  navigate('/')
   }

   useEffect(()=>{
    dispatch(getUser)
   },[])
    return (
      <>
      <Toaster/>
    <Container  maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
         
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
           
            <HStack spacing="1" justify="center">
            <Image src='https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/2023/2/7/c2be095d-a4fb-4981-bdad-9d69ea189da31675792659902-offer-banner-500-600x240-code-_-MYNTRA200.jpg'/>
            
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
         w={{base:'90%'}}
         margin={{base:'auto'}}

          padding={{base:'20px'}}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'xl', sm: 'xl' }}
          bg='white'
        >
          <Stack spacing="6" >
            <Stack spacing="5">
              <FormControl >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" value={email} onChange={(e)=>setemail(e.target.value)} />
              </FormControl>
              <FormControl>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant="link"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id="password"
           
            name="password"
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            required
           value={password} 
           onChange={(e)=>setpassword(e.target.value)}
          />
        </InputGroup>
      </FormControl>
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button bg='#ff3f6c' color='white' _hover={{cursor:"pointer"}} onClick={HandleSubmit}>CONTINUE</Button>
              <HStack>
                <Divider />
                <Text _hover={{color:'blue',cursor:'pointer'}} onClick={()=>navigate('/signup')} fontSize="sm" whiteSpace="nowrap" color="muted">
                  Create an account
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
    </>
    )
   }

  export default Login;