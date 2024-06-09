import React, { useEffect, useState } from 'react'
import Banner from '../component/Slider'
import { Box, Text, Image, Button, background, Center, Heading, SimpleGrid } from "@chakra-ui/react"
import axios from 'axios'
import LoadingSpinner from '../component/Spinner/Spinner'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const [deals, setdeals] = useState([])
    const [Exclusive, setExclusive] = useState([])
    const [top, settop] = useState([])
    const [category, setcategory] = useState([])
    const [topdealse, settopdealse] = useState([])

    const { loading, error } = useSelector((state) => state.products);


    const getdata = () => {
        axios.get(`https://childish-nonchalant-gold.glitch.me/Deals`)
            .then((res) => setdeals(res.data))
            axios.get(`https://childish-nonchalant-gold.glitch.me/ExclusiveBrands`)
            .then((res) => setExclusive(res.data))
            axios.get(`https://childish-nonchalant-gold.glitch.me/top`)
            .then((res) => settop(res.data))
            axios.get(`https://childish-nonchalant-gold.glitch.me/category`)
            .then((res) => setcategory(res.data))
            axios.get(`https://childish-nonchalant-gold.glitch.me/topdeals`)
            .then((res) => settopdealse(res.data))
    }
    //console.log(deals);
    const navigate=useNavigate()
    useEffect(() => {
        getdata()
    }, [])
    //console.log('c',category);

    if(loading){
        return <LoadingSpinner/>
    }
    return (
        <>
            <Banner />
            <Center>
                <Box padding='20px' mt='40px'>
                    <Heading fontWeight={600} mb='50px'  >DEALS OF THE DAY</Heading>

                    <Box >
                        <SimpleGrid columns={{ base:2, sm: 2, md: 3, lg: 7 }} gap='10px'>
                            {deals && deals.map((e) => <Image src={e.img} onClick={()=>navigate('/mens')} _hover={{ transform: "scale(0.95)", transition: "all .5s", cursor: "pointer" }} />)}
                        </SimpleGrid>

                    </Box>
                </Box>
                
            </Center>
            <Center>
                <Box padding='20px' mt='40px' >
                    <Heading fontWeight={600} mb='50px'  >EXCLUSIVE BRANDS</Heading>

                    <Box >
                        <SimpleGrid columns={{  base:2, sm: 2,md: 3, lg: 8 }} gap='10px'>
                            {Exclusive.map((e) => <Image src={e.img} onClick={()=>navigate('/mens')} _hover={{ transform: "scale(0.95)", transition: "all .5s", cursor: "pointer" }} />)}
                        </SimpleGrid>

                    </Box>
                </Box>
                
            </Center>
            <Center>
                <Box padding='20px' mt='40px' >
                    <Heading fontWeight={600} mb='50px'  >TOP PICKS</Heading>

                    <Box >
                        <SimpleGrid columns={{ base:2, sm: 2,md: 3, lg: 7 }} gap='10px'>
                            {top.map((e) => <Image src={e.img} _hover={{ transform: "scale(0.95)", transition: "all .5s", cursor: "pointer" }} />)}
                        </SimpleGrid>

                    </Box>
                </Box>
                
            </Center>
            <Center>
                <Box padding='20px' mt='40px' >
                    <Heading fontWeight={600} mb='50px' color='#E91058' >CATEGORIES TO BAG</Heading>

                    <Box >
                        <SimpleGrid columns={{ base:2, sm: 2, md: 3, lg: 8 }} gap='10px'>
                            {category &&category.map((e) => <Image src={e.img} _hover={{ transform: "scale(0.95)", transition: "all .5s", cursor: "pointer" }} />)}
                        </SimpleGrid>

                    </Box>
                </Box>
                
            </Center>
            <Center>
                <Box padding='20px' mt='40px' >
                    <Heading fontWeight={600} mb='50px' color='#7C5763' >DEALS ON TOP BRANDS</Heading>

                    <Box >
                        <SimpleGrid columns={{  base:2, sm: 2,md: 3, lg: 8 }} gap='10px'>
                            {topdealse.map((e) => <Image src={e.img} onClick={()=>navigate('/womens')} _hover={{ transform: "scale(0.95)", transition: "all .5s", cursor: "pointer" }} />)}
                        </SimpleGrid>

                    </Box>
                </Box>
                
            </Center>
        </>
    )
}

export default Home
