import React, { useEffect, useState } from 'react'
import { Box, Button, Heading, Input, Select, Stack, Text } from '@chakra-ui/react'
import { Grid } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { getMensProduct, getProduct } from "../Redux/action";
import CardSkeleton from "./CardSkeleton";
import Productcard, { ProductCard } from "./Productcard";
import axios from 'axios'
const Mens = () => {

	const { mens, loading, error } = useSelector((state) => state.products);
	const [SearchParam, setSearchParam] = useSearchParams()
	const [update, setupdate] = useState(false)

	const initbrand = SearchParam.getAll('brand')
	const [brand, setbrand] = useState(initbrand || [])

	const [page, setpage] = useState(1)
	const [order, setorder] = useState('')
	const location = useLocation();
	const dispatch = useDispatch();



	const handlechange = (e) => {
		e.preventDefault()

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
	//console.log("brand", brand);
	let obj = {
		params: {
			brand: SearchParam.getAll("brand"),
			_sort: SearchParam.get("order") && "prices",
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

	}, [brand,order])
	useEffect(() => {
		dispatch(getMensProduct(page, obj))
	}, [location.search,page,order])
	const handlesort = (e) => {
		setorder(e.target.value)
		setupdate(!update)
	}
	// console.log('LL',location.search)
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
			<Box w={{ base: '100%', sm: '100%', lg: '90%' }} margin='auto' display="flex" justifyContent="space-between" mt='30px' padding='10px'>
				<Stack direction='row'><Text fontSize={24} color='gray' fontWeight={500} _hover={{ cursor: 'pointer', color: 'red.400' }}>Home/</Text><Text fontSize={24} color='gray' fontWeight={500} _hover={{ cursor: 'pointer', color: 'red.400' }}>Mens Products </Text></Stack>
				<Box w='20%'><Select _hover={{ cursor: 'pointer', color: 'blue.500' }} placeholder='sort by : Recommended'>

					<option value='option1'>Recommended</option>
					<option value='option2'>What's New</option>
					<option value='option3'>Popularity</option>
					<option value='option1'>Best Descount</option>
					<option value='option2'>Price :low to high</option>
					<option value='option3'>Price :high to low</option>
				</Select></Box>

			</Box>
			<Box w={{ base: '100%', sm: '100%', md: '100%', lg: '90%' }} margin='auto' display={'flex'} justifyContent={{ base: 'space-evenly', sm: 'space-evenly', lg: 'space-between' }} mt={'10px'} >
				<Box w={{ base: '39%', sm: '39%', lg: '25%' }}>
					<Box w='100%' boxShadow='rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px' h='auto' mt={6} padding='20px'  >
						{/* <Heading>FILTERS</Heading> */}
						<Heading fontSize={20} textAlign={'left'}>FILTERS</Heading>
						<Box mt='20px' textAlign={'left'}>
							<Text textAlign={'left'} fontSize={18} fontWeight={500} >Price</Text>
							<div>
								<input type="radio" name="order" value={"asc"} onChange={handlesort} defaultChecked={order === "asc"} />
								<label style={{ marginLeft: '5px', fontWeight: 'normal' }}>Low To High</label>
							</div>
							<div>
								<input type="radio" name="order" value={"desc"} onChange={handlesort} defaultChecked={order === "desc"} />
								<label style={{ marginLeft: '5px', fontWeight: 'normal' }} >High To Low</label>
							</div>

						</Box>
						<Box mt='20px'>
							<Text textAlign={'left'} fontSize={18} fontWeight={500}>brands</Text>
							<Stack textAlign={'left'} spacing={1} direction='column' mt='10px'>
								<Box>

									<input value="ADIDAS" onChange={handlechange} type="checkbox" checked={brand.includes("ADIDAS")} />
									<label style={{ marginLeft: '5px', fontWeight: 'normal' }}>ADIDAS</label>
								</Box>
								<Box>

									<input value="Puma" onChange={handlechange} type="checkbox" checked={brand.includes("Puma")} />
									<label style={{ marginLeft: '5px', fontWeight: 'normal' }}>Puma</label>
								</Box>
								<Box>

									<input value="Moda Rapido" onChange={handlechange} type="checkbox" checked={brand.includes("Moda Rapido")} />
									<label style={{ marginLeft: '5px', fontWeight: 'normal' }}>Moda Rapido</label>
								</Box>
								<Box>
									<input value="HRX" onChange={handlechange} type="checkbox" checked={brand.includes("HRX")} />
									<label style={{ marginLeft: '5px', fontWeight: 'normal' }}>HRX</label>
								</Box>
								<Box>
									<input value="H&M" onChange={handlechange} type="checkbox" checked={brand.includes("H&M")} />
									<label style={{ marginLeft: '5px', fontWeight: 'normal' }}>H&M</label>



								</Box>
								<Box>

									<input value="Roadster" onChange={handlechange} type="checkbox" checked={brand.includes("Roadster")} />
									<label style={{ marginLeft: '5px', fontWeight: 'normal' }}>Roadster</label>
								</Box>
								<Box>
									<input value="Nautica" onChange={handlechange} type="checkbox" checked={brand.includes("Nautica")} />
									<label style={{ marginLeft: '5px', fontWeight: 'normal' }}>Nautica</label>
								</Box>
								<Box>
									<input value="DILLINGER" onChange={handlechange} type="checkbox" checked={brand.includes("DILLINGER")} />
									<label style={{ marginLeft: '5px', fontWeight: 'normal' }}>DILLINGER</label>



								</Box>
								<Box>

									<input value="FIDODIDO" onChange={handlechange} type="checkbox" checked={brand.includes("FIDODIDO")} />
									<label style={{ marginLeft: '5px', fontWeight: 'normal' }}>FIDODIDO</label>
								</Box>

								<Box>
									<input value="Levis" onChange={handlechange} type="checkbox" checked={brand.includes("Levis")} />
									<label style={{ marginLeft: '5px', fontWeight: 'normal' }}>Levis</label>
								</Box>
								<Box>
									<input value="WROGN" onChange={handlechange} type="checkbox" checked={brand.includes("WROGN")} />
									<label style={{ marginLeft: '5px', fontWeight: 'normal' }}>WROGN</label>
								</Box>
								<Box>
									<input value="Tommy Hilfiger" onChange={handlechange} type="checkbox" checked={brand.includes("Tommy Hilfiger")} />
									<label style={{ marginLeft: '5px', fontWeight: 'normal' }}>Tommy Hilfiger</label>
								</Box>



							</Stack>
						</Box>

						<Box>
							<Heading></Heading>

						</Box>
						<Box></Box>
						<Box></Box>
					</Box>

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
					{mens?.map(
						(item, idx) =>
							item.id !== "0z5ON4w" && (
								<ProductCard key={item.id} {...item} />
							)
					)}
				</Grid>
			</Box>
			<Box w='71%' display={'flex'} justifyContent={'space-between'}>
				<Box></Box>
				<Box mt='20px' display='flex' gap='15px' mb='20px'>
					<Button background={'orange.300'} color='white' onClick={() => setpage(page - 1)} isDisabled={page == 1}>Pre</Button>
					<Button>{page}</Button>
					<Button background={'orange.300'} color='white' onClick={() => setpage(page + 1)} isDisabled={page == 4}>Next</Button></Box>

			</Box>
		</>
	);
}

export default Mens
