import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    SimpleGrid,
    Center,
    UnorderedList,
    Input,
    Image
} from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react'
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';

import { BiShoppingBag } from "react-icons/bi"
import { AiOutlineStar } from "react-icons/ai"
import { BsFillPersonFill } from "react-icons/bs"

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from 'react';
import { getToCart } from '../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGOUT } from '../Redux/actiontypes';
import toast, { Toaster } from 'react-hot-toast';



export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
    const [wish, setwish] = useState([])
    const [update, setupdate] = useState(false)

    const dispatch =useDispatch()
	const { cart } = useSelector((state) => state.products);
  
    let navigate = useNavigate();
    const USERAUTH=localStorage.getItem("auth")


const handleauth=()=>{
    toast.success('Successfully Logout!')
    setupdate(!update)
    localStorage.removeItem('auth')
}
  useEffect(()=>{
    dispatch(getToCart)
  },[update])

    return (
        <>

<Toaster/>



            <Box w={{base:'100%',sm:'100%'}}  position={'sticky'} zIndex={100} top={0} margin={0}>

                <Flex

                    bg={useColorModeValue('white', 'gray.800')}
                    color={useColorModeValue('gray.600', 'white')}
                    minH={'80px'}
                    py={{ base: 2 }}
                    px={{ base: 4 }}
                    borderBottom={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.900')}
                    align={'center'}
                    boxShadow='base'

                >

                    <Flex
                        flex={{ base: 1, md: 'auto' }}
                        ml={{ base: -2 }}
                        display={{ base: 'flex', md: 'none' }}>
                        <IconButton
                            onClick={onToggle}
                            icon={
                                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                            }
                            variant={'ghost'}
                            aria-label={'Toggle Navigation'}
                        />

                    </Flex>
                    <Box w='100px' h='50px' >                    <Image  onClick={() => navigate("/")}  width="100%" marginRight="28%"  src='https://rad-manatee-0e439b.netlify.app/Common%20Files/image/myntra-removebg-preview.png' alt="" />
                    </Box>
                    <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>


                        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                            <DesktopNav />
                        </Flex>
                    </Flex>
                    <Stack

                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        marginRight={39.5}
                        spacing={4}>

                        {/* <BiSearch size={25} /> */}

                        {/* <Tooltip hasArrow label='Search' bg='gray.300' color='black'> */}
                        <Box ml={{base:'10px'}} marginRight={{ base :'-10px',lg: '40px' }}w={{ base: '190px', sm: '180px', md: '400px', lg: '500px' }} >
                             <Input placeholder='Search here' /></Box>
                        {/* </Tooltip> */}

                        <Tooltip hasArrow label='Account' bg='gray.300' color='black'>
                      {USERAUTH? <Button marginLeft={{lg:'-20px'}} _hover={{background:'red.400',color:'white'}}  onClick={handleauth}>Logout</Button>:
                      
                      <Box paddingTop={"7px"} ml={{base:'40px'}} onClick={() => navigate("/login")} _hover={{ cursor: "pointer" }}>
                                
                                <BsFillPersonFill size={25} />
                     

                            </Box>}
                            {/* :<Button>Hello</Button>} */}
                           
                        </Tooltip>
                        <Tooltip hasArrow label='Wishlist' bg='gray.300' color='black'>
                            <Box display={{base:'none',sm:'none',lg:'flex'}} onClick={() => {
                                navigate("/wishlist")
                                setupdate(!update)

                            }} alignItems={"center"} _hover={{ cursor: "pointer" }}> <AiOutlineStar size={25} /><Text textAlign={"center"} background="#FA4279" borderRadius={"50%"} marginTop={"-10px"} marginLeft={"-6px"} width="20px" height="20px" fontSize={14} color="white" fontWeight={600}>1</Text></Box>
                        </Tooltip>
                        <Tooltip hasArrow label='Cart' bg='gray.300' color='black'>
                            <Box onClick={() => {
                                if(USERAUTH){
                                return  navigate("/cart")
                                    setupdate(!update)
                                }
                                navigate("/login")
                                setupdate(!update)

                            }}  _hover={{ cursor: "pointer" }} display="flex" alignItems={"center"}> <BiShoppingBag size={25} /><Text textAlign={"center"} background="#FA4279" borderRadius={"52%"} marginTop={"-10px"} marginLeft={"-6px"} width="20px" height="20px" fontSize={14} color="white" fontWeight={600}>{cart.length}</Text></Box>
                        </Tooltip>


                    </Stack>
                </Flex>

                <Collapse in={isOpen} animateOpacity>
                    <MobileNav />
                </Collapse>
            </Box>

        </>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <>

            <Stack direction={'row'} ml="-20px" spacing={2}  >

                {NAV_ITEMS.map((navItem, i) => (
                    <Box key={i}>

                        <Popover trigger={'hover'} placement={'bottom-start'}>
                            <PopoverTrigger>
                                <Link

                                    p={2}
                                    href={navItem.href ?? '#'}
                                    fontSize={'sm'}
                                    fontWeight={500}
                                    color={linkColor}
                                    _hover={{
                                        textDecoration: 'none',
                                        color: 'pink.500',
                                    }}>
                                    {navItem.label}
                                </Link>
                            </PopoverTrigger>

                            {navItem.children && (
                                <PopoverContent
                                    border={0}
                                    boxShadow={'xl'}
                                    bg={popoverContentBgColor}
                                    p={4}
                                    rounded={'xl'}
                                    width={'150%'}>
                                    <Box w="100%" display="flex" justifyContent={"space-between"}>
                                        {navItem.children.map((child, i) => (
                                            <DesktopSubNav key={i} {...child} />
                                        ))}
                                    </Box>
                                </PopoverContent>
                            )}
                        </Popover>

                    </Box>
                ))}


            </Stack>
        </>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <>

            <Link
                href={href}
                role={'group'}
                display={'block'}
                p={2}
                rounded={'md'}

                _hover={{ bg: 'none'}}>


                <Box textAlign='left'>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'red.400' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'} fontWeight={500}>{subLabel.map((e, i) =>
                        <Box key={i} mt="20px"  _hover={{ bg: 'none',color:'blue.500'}}> <ul>{e.sub}</ ul> </Box>

                    )}</Text>
                </Box>





            </Link>
        </>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem, index) => (
                <MobileNavItem key={index} {...navItem} />
            ))}

        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child, index) => (
                            <Link key={index} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};



const NAV_ITEMS = [
    {
        label: 'MEN',
        children: [
            {
                label: 'Clothing',
                subLabel: [
                    { sub: "New In" },
                    { sub: "View All" },
                    { sub: "T-Shirts" },
                    { sub: "Jackets & Codes" },
                    { sub: "Hodeies & SweatT-shirts" },
                    { sub: "Sweatpants" },
                    { sub: "Shorts" },
                    { sub: "Co-ord sets" }
                ],

                href: '/mens',
            }
            , {
                label: 'Brands',
                subLabel: [
                    { sub: "Essentials by koovs" },
                    { sub: "Ball Copenhagen" },
                    { sub: "Bravesoul" },
                    { sub: "The couture club" },
                    { sub: "Arkk cooenhagen" },
                    { sub: "SHU" },
                    { sub: "Nike" },
                    { sub: "Tigerbear" }


                ],
                href: '/mens',
            },
            {
                label: 'Footwear',
                subLabel: [
                    { sub: "View All" },
                    { sub: "Sneakers" },
                    { sub: "Slides" }

                ],
                href: '/mens',
            },
            {
                label: 'Accessories',
                subLabel: [
                    { sub: "Sunglasses" },
                    { sub: "Caps 7 Hats" },
                    { sub: "Pins" }

                ],
                href: '/mens',
            }
        ],

    },
    {
        label: 'WOMEN',
        children: [
            {
                label: 'Clothing',
                subLabel: [
                    { sub: "New In" },
                    { sub: "View All" },
                    { sub: "T-Shirts" },
                    { sub: "Jackets & Codes" },
                    { sub: "Hodeies & SweatT-shirts" },
                    { sub: "Sweatpants" },
                    { sub: "Shorts" },
                    { sub: "Co-ord sets" }
                ],

                href: '/womens',
            }
            , {
                label: 'Brands',
                subLabel: [
                    { sub: "Essentials by koovs" },
                    { sub: "Ball Copenhagen" },
                    { sub: "Bravesoul" },
                    { sub: "The couture club" },
                    { sub: "Arkk cooenhagen" },
                    { sub: "SHU" },
                    { sub: "Nike" },
                    { sub: "Tigerbear" }


                ],
                href: '/womens',
            },
            {
                label: 'Footwear',
                subLabel: [
                    { sub: "View All" },
                    { sub: "Sneakers" },
                    { sub: "Slides" }

                ],
                href: '/womens',
            },
            {
                label: 'Accessories',
                subLabel: [
                    { sub: "Sunglasses" },
                    { sub: "Caps 7 Hats" },
                    { sub: "Pins" }

                ],
                href: '/womens',
            }
        ],

    },
    {
        label: 'KIDS',
       
        children: [
            {

                subLabel: [
                    { sub: "Kids t-shirts" },
                    { sub: "Shirts" },
                ],
                href: '/kids',
            },

        ],
    },
    {
        label: 'HOME',
        href: '/funiture',
        children: [
            {

                subLabel: [
                    { sub: "Y2K" },
                    { sub: "Good Fest" },
                    { sub: "Summer Peast" },
                    { sub: "Vercity" },
                    { sub: "Rectograde" },
                    { sub: "Fill Grade" }
                ],
                href: '/funiture',
            },

        ],
    },
    {
        label: 'BEAUTY',
        href: '#',
        children: [
            {

                subLabel: [
                    { sub: "Y2K" },
                    { sub: "Good Fest" },
                    { sub: "Summer Peast" },
                    { sub: "Vercity" },
                    { sub: "Rectograde" },
                    { sub: "Fill Grade" }
                ],
                href: '/product',
            },

        ],
    },
    {
        label: 'STUDIO',
        href: '#',
        children: [
            {

                subLabel: [
                    { sub: "Y2K" },
                    { sub: "Good Fest" },
                    { sub: "Summer Peast" },
                    { sub: "Vercity" },
                    { sub: "Rectograde" },
                    { sub: "Fill Grade" }
                ],
                href: '/product',
            },

        ],
    }

];