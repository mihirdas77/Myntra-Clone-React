import {
	CloseButton,
	Flex,
	Link,
	Select,
	useColorModeValue,
} from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { CartProductMeta } from "./CartProductMeta";
import { deleteToCart, getToCart } from "../../Redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GET_TO_CART } from "../../Redux/actiontypes";
const QuantitySelect = (props) => {

	
	return (
		<Select
			maxW='64px'
			aria-label='Select quantity'
			focusBorderColor={useColorModeValue("blue.500", "blue.200")}
			{...props}>
			<option value='1'>1</option>
			<option value='2'>2</option>
			<option value='3'>3</option>
			<option value='4'>4</option>
		</Select>
	);
};

export const CartItem = (props) => {
	const [update,setupdate]=useState(false)
	const {
		isGiftWrapping,
		image_url,
		id,
		para,
		rs,
		brand,
		title,
		image,
		currency,
		price,
		onChangeQuantity
	
	} = props;
	const { cart } = useSelector((state) => state.products);
	console.log(cart)
	const dispatch=useDispatch()
	const onClickDelete=(itemId)=>{
		const filtered = cart.filter((item)=>item.id!==itemId)
		dispatch({ type: GET_TO_CART, payload:filtered });
		dispatch(deleteToCart(itemId))
		setupdate(!update)
		// window.location.reload()
	}

	useEffect(()=>{
		

	},[update])
	
	return (
		<Flex
			direction={{
				base: "column",
				md: "row",
			}}
			justify='space-between'
			align='center'>
			<CartProductMeta
				name={para}
				description={brand}
				image={image_url}
				isGiftWrapping={isGiftWrapping}
			/>

			{/* Desktop */}
			<Flex
				width='full'
				justify='space-between'
				display={{
					base: "none",
					md: "flex",
				}}>
				<QuantitySelect
					// value={1}
					onChange={(e) => {
						console.log('q',+e.target.value);
					}}
				/>
				<PriceTag price={rs || price}  />
				<CloseButton
					aria-label={`Delete ${para} from cart`}
					onClick={()=>onClickDelete(id)}
				/>
			</Flex>

			{/* Mobile */}
			<Flex
				mt='4'
				align='center'
				width='full'
				justify='space-between'
				display={{
					base: "flex",
					md: "none",
				}}>
				<Link onClick={()=>onClickDelete(id)} fontSize='sm' textDecor='underline'>
					Delete
				</Link>
				<QuantitySelect
					// value={1}
					onChange={(e) => {
						console.log('q',+e.target.value);
					}}
				/>
				<PriceTag
					price={rs || price}
					currency={currency}
					salePrice={rs || price * 0.8}
				/>
			</Flex>
		</Flex>
	);
};
