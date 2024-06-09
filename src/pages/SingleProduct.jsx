import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,

  List,
  ListItem,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';

import { MdLocalShipping } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import LoadingSpinner from '../component/Spinner/Spinner';
import { addToCart, getToCart } from '../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
export default function Simple() {
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState({});



const USERAUTH=localStorage.getItem('auth')

  const { cart } = useSelector((state) => state.products);
  const location = useLocation()
  const dispatch = useDispatch()
  const handlecart = () => {
   
if(USERAUTH){
  let flag=true
  for (let i = 0; i < cart.length; i++) {
    if (data.id == cart[i].id) {
      flag = false
      break;
    }
  }
  
    if (flag) {
      dispatch(addToCart(data))
      toast.success('Product Added To Cart', {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    } else {
      toast.error("Product already in Cart")
    }
  
}else{

  toast.error("Sign In First")
  }






  }
  useEffect(() => {
    setTimeout(() => {
      setloading(false)
    }, 1000);

    dispatch(getToCart)
    setdata(location.state)
  }, []);

  const Rating = ({ rating, numReviews }) => {
    return (
      <Box
        display='flex'
        alignItems='center'
        mt={numReviews === 1 ? "0.3rem" : "3"}>
        {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i + Math.random()}
                  style={{ marginLeft: "1" }}
                // color={i < rating ? 'green.500' :"green.300"}
                />
              );
            }
            if (roundedRating - i === 0.2) {
              return (
                <BsStarHalf
                  key={i + Math.random()}
                  style={{ marginLeft: "1" }}
                />
              );
            }
            return (
              <BsStar
                key={i + Math.random()}
                style={{ marginLeft: "1" }}
              />
            );
          })}
        <Box
          as='span'
          ml='2'
          color='gray.600'
          fontSize='sm'
          display={numReviews === 1 ? "none" : "flex"}>
          ({numReviews})
        </Box>
      </Box>
    );
  }

   console.log('s',USERAUTH)

  return (
    <>
      <Toaster />
      {loading ? <LoadingSpinner /> :
        <Container maxW={'7xl'}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}>
            <Flex>
              <Image
                rounded={'md'}
                alt={'product image'}
                src={data.image_url}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={{ base: '100%', sm: 'auto', lg: 'auto' }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={'header'}>
                <Heading
                  lineHeight={1.1}
                  textAlign={'left'}
                  fontWeight={600}
                  fontSize={{ base: '2xl', sm: '4xl', lg: '4xl' }}>
                  {data.para}
                </Heading>
                <Text

                  fontWeight={500}
                  color='green.500'
                  mt='10px'
                  textAlign={'left'}
                  fontSize={'2xl'}>
                  Price : ₹{data.rs || data.price}
                </Text>
                <Rating rating={4} numReviews={50 * 4} />
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={'column'}
                divider={
                  <StackDivider
                    borderColor='gray.600'
                  />
                }>
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    color='gray.400'
                    fontSize={'2xl'}
                    fontWeight={'300'}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore
                  </Text>
                  <Text fontSize={'lg'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                    aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                    maxime modi nam officiis porro, quae, quisquam quos
                    reprehenderit velit? Natus, totam.
                  </Text>
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color='yellow.500'
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}>
                    Features
                  </Text>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <List spacing={2}>
                      <ListItem>Chronograph</ListItem>
                      <ListItem>Master Chronometer Certified</ListItem>{' '}
                      <ListItem>Tachymeter</ListItem>
                    </List>
                    <List spacing={2}>
                      <ListItem>Anti‑magnetic</ListItem>
                      <ListItem>Chronometer</ListItem>
                      <ListItem>Small seconds</ListItem>
                    </List>
                  </SimpleGrid>
                </Box>

              </Stack>

              <Button
                rounded={'none'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                bg={'gray.600'}
                color={'white'}
                textTransform={'uppercase'}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                  background: 'gray.700',
                  color: 'white'
                }} onClick={handlecart}>
                Add to cart
              </Button>

              <Stack direction="row" alignItems="center" justifyContent={'center'}>
                <MdLocalShipping />
                <Text>2-3 business days delivery</Text>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>}
    </>
  );

}