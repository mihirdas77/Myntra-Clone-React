import React, { useEffect, useState } from 'react'
import { Box, Button, Heading, Input, Select, Stack, Text } from '@chakra-ui/react'
import { Grid } from "@chakra-ui/react";
import CardSkeleton from "./CardSkeleton";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { getToWishList, getWomenProduct } from '../Redux/action';
import Productcard, { ProductCard } from "./Productcard";
import Paggination from './Paggination';
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

const WishList = () => {
    const [SearchParam, setSearchParam] = useSearchParams()
    const [update, setupdate] = useState(false)

    const initbrand = SearchParam.getAll('brand')
    const [brand, setbrand] = useState(initbrand || [])

    const [page, setpage] = useState(1)
    const [order, setorder] = useState('')
    const dispatch = useDispatch()
    const location=useLocation()
    const { wishlist, loading, error } = useSelector((state) => state.products);


    const handlechange = (e) => {

        e.preventDefault()
        //console.log(e.target.checked);
        // se{brand([..{brand ,e.target.value])
        setupdate(!update)
        let newbrand = [...brand]
        let value = e.target.value
        if (newbrand.includes(value)) {
            newbrand = newbrand.filter((el) => el != value)
        } else {
            newbrand.push(value)
        }

        setbrand(newbrand)

    }
    console.log("brand", brand);
    let obj = {
        params: {
            brand: SearchParam.getAll("brand"),
            _sort: SearchParam.get("order") && "rs",
            _order: SearchParam.get("order")
        }
    }

    useEffect(() => {
        let params = {
            brand

        }
        if (order) {
            params.order = order
        }
        setSearchParam(params)

    }, [brand, order])
    useEffect(() => {
        dispatch(getToWishList)
    }, [])
    
    return loading ? (
        <><Box w='100%' display={'flex'} gap='40px'  >
            <Box w='30%'>

            </Box>
            <Grid
                w='70%'

                mb='8'
                templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }}
                gap={2}
                rowGap={6}
                mt={6}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <CardSkeleton key={item} />
                ))}
            </Grid>
        </Box>
        </>
    ) : error ? (
        <h1>Something is wrong</h1>
    ) : (
        <>
            <Box w={{base:'100%',sm:'100%',lg:'90%'}} margin='auto' display="flex" justifyContent={{base:'space-evenly',sm:'space-evenly',lg:"space-between"}} mt='30px' padding='10px'>
                <Stack direction='row'><Text fontSize={24} color='gray' fontWeight={500} _hover={{ cursor: 'pointer', color: 'red.400' }}>Home/</Text><Text fontSize={24} color='gray' fontWeight={500} _hover={{ cursor: 'pointer', color: 'red.400' }}>WishList Products </Text></Stack>
                <Box w='20%'>
                    <Select _hover={{ cursor: 'pointer', color: 'blue.500' }} placeholder='sort by : Recommended'>

                    <option value='option1'>Recommended</option>
                    <option value='option2'>What's New</option>
                    <option value='option3'>Popularity</option>
                    <option value='option1'>Best Descount</option>
                    <option value='option2'>Price :low to high</option>
                    <option value='option3'>Price :high to low</option>
                </Select>
                
                
                </Box>

            </Box>
            <Box w={{base :'100%',sm:'100%',md:'100%', lg:'90%'}} margin='auto'  mt={'10px'} >
               
                <Grid
                    w='100%'

                    mb='8'
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(4, 1fr)",
                    }}
                    gap={2}
                    rowGap={6}
                    mt={6}>
                    {wishlist?.map(
                        (item, idx) =>
                            item.id !== "0z5ON4w" && (
                                <ProductCard key={item.id} {...item} />
                            )
                    )}
                </Grid>
            </Box>
           
        </>
    );
}

export default WishList
