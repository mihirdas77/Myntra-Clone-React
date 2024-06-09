import {
	Flex,
	Heading,
	Link,
	Stack,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { formatPrice } from "./PriceTag";
import Checkout from "../Checkout";

const OrderSummaryItem = (props) => {
	const { label, value, children } = props;
	return (
		<Flex justify='space-between' fontSize='sm'>
			<Text fontWeight='medium' color={mode("gray.600", "gray.400")}>
				{label}
			</Text>
			{value ? <Text fontWeight='medium'>{value}</Text> : children}
		</Flex>
	);
};

export const CartOrderSummary = ({ total, cart }) => {
	let Total=0;
	for(let i=0; i<cart.length; i++){
		Total+=cart[i].rs || cart[i].price
	}
	console.log('t',Total);
	return (
		<Stack
			spacing='8'
			borderWidth='1px'
			rounded='lg'
			padding='8'
			width='full'>
			<Heading size='md'>Order Summary</Heading>

			<Stack spacing='6'>
				<OrderSummaryItem label='Subtotal' value={formatPrice(Total)} />
				<OrderSummaryItem label='Shipping + Tax'>
					<Link href='#' textDecor='underline'>
						Calculate shipping
					</Link>
				</OrderSummaryItem>
				<OrderSummaryItem label='Coupon Code'>
					<Link href='#' textDecor='underline'>
						Add coupon code
					</Link>
				</OrderSummaryItem>
				<Flex justify='space-between'>
					<Text fontSize='lg' fontWeight='semibold'>
						Total
					</Text>
					<Text fontSize='xl' fontWeight='extrabold'>
						{formatPrice(Total)}
					</Text>
				</Flex>
			</Stack>
			<Checkout total={Total} cartData={cart} />
		</Stack>
	);
};
