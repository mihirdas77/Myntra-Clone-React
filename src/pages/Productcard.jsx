import React, { useEffect } from "react";
import {
	Flex,
	Box,
	Badge,
	useColorModeValue,
	Code,
	Button,
	Image,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { AiOutlineStar } from "react-icons/ai"
import { addToWishlist, getToWishList } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';



export function Rating({ rating, numReviews }) {
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
export function ProductCard({
	id,
	name,
	para,
	price,
	star_rating_percentage,
	media,
	brand_name,
	primary_categories,
	offers,
	rating,
	rating_count,
	image_url,
	rs
}) {
	const randomBolean = () => Math.random() >= 0.5;
	const navigate = useNavigate();
	// const { url } = media[0];
	const dispatch=useDispatch()
	const state = { id, name, para, price, rating, rs, image_url }
	const { wishlist, loading, error } = useSelector((state) => state.products);

	const HandleWishList=(para)=>{
		let flag=true
		console.log('pp',para,wishlist)
for(let i=0; i<wishlist.length; i++){
	if(para==wishlist[i].para){
		flag=false;
		break;
	}}

	if(flag){
		dispatch(addToWishlist(state))
		toast.success('Product Added To WishList', {
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
	}else{
		toast('Product Already added !!', {
			
		  });
	}

		
	}

	useEffect(()=>{
		dispatch(getToWishList)
	},[])
	return (
		<>
		<Toaster/>
		
		<Flex alignItems='center' justifyContent='center'>
			<Box
				transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
				boxShadow={useColorModeValue("lg", "lg")}
				_hover={{

					transform: "translateY(-5px)",
					transition: "all 0.2s ease-out",
					boxShadow: "0 10px 50px -20px #b0c4de",
					cursor: 'pointer'

				}}
				w='60'
				bg={useColorModeValue("white", "root.blueGray")}
				maxW='xs'
				rounded='lg'
				shadow='lg'
			>
			
				<Box h='50%' roundedTop='lg'>
					<Image src={image_url} alt={name} roundedTop='lg'  />
					<Flex  position='absolute'
					onClick={()=>HandleWishList(para)}
  top='0'
  left='0'  width='100%'  padding='10px'   z-index='1'
  text-align= 'center'
  color='white' justify="flex-end" align="flex-end" mt='2px' ><AiOutlineStar size={25} /> </Flex>

				</Box>
				<Box p='4'>
					<Box display='flex' alignItems='baseline'>
						{randomBolean() ? (
							<Badge
								rounded='full'
								fontSize='0.7em'
								// colorScheme='green'
								_dark={{ colorScheme: "green" }}
								colorScheme='red'>
								New
							</Badge>
						) : (
							<Badge
								rounded='full'
								fontSize='0.7em'
								_dark={{ colorScheme: "red" }}
								colorScheme='green'>
								Trending
							</Badge>
						)}
					</Box>
					<Flex
						mt='1'
						justifyContent='space-between'
						alignContent='center'
						alignItems={"center"}>
						<Box
							fontSize='md'
							fontWeight='semibold'
							as='h5'
							lineHeight='tight'
							isTruncated>
							{para}
						</Box>

					</Flex>
					<Flex justifyContent='space-between' alignContent='center'>
						<Rating rating={rating} numReviews={rating * 50} />
						<Code
							fontSize='md'
							color={useColorModeValue("gray.800", "black")}
							mt='3'
							fontWeight='bold'
							bg={useColorModeValue("yellow.100", "yellow.200")}
							letterSpacing={0}>
							₹{rs || price}
						</Code>
					</Flex>
					<Button
						w='full'
						mt='3'
						colorScheme={useColorModeValue("pink", "pink")}
						position={'none'}
						onClick={() => navigate(`/details/${id}`, { state })}>
						View
					</Button>
				</Box>
			</Box>
		</Flex>
		</>
	);
}