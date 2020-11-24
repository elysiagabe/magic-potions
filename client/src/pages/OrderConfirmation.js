import React from 'react';
import { 
    Box,
    Flex,
    Heading,
    Text
} from '@chakra-ui/react';

const OrderConfirmation = ({ orderInfo, orderId }) => {
    const date = new Date().toString().slice(4,15)
    console.log({ orderInfo })
    return (
        <Box w={1/2} maxW="1024px"  mx="auto" py={10}>
            <Box bg="#332E54" _hover="none" px={3} py={4}>
                <Heading size="sm" textTransform="uppercase" letterSpacing=".1rem" color="white" fontWeight="400" >Receipt</Heading>
            </Box>
            <Box bg="white" p={6}>
                <Text mb={4}><Box as="span" fontWeight="600">Date:</Box> {date}</Text>
                {orderInfo.address ? 
                    <Flex flexDirection="column">
                        <Text mb={4}><Box as="span" fontWeight="600">Order ID:</Box> {orderId}</Text>
                        <Text mb={4}>{orderInfo.quantity} magic potion(s)</Text>
                        <Text mb={4}><Box as="span" fontWeight="600">Total:</Box> ${orderInfo.total}</Text>
                        <Text fontWeight="600">Billed To: </Text>
                        <Flex flexDirection="column" mb={4}>
                            <Text>{orderInfo.firstName} {orderInfo.lastName}</Text>
                            <Text>{orderInfo.address.street1}</Text>
                            <Text>{orderInfo.address.city}, {orderInfo.address.state} {orderInfo.address.zip}</Text>
                        </Flex>
                    </Flex> 
                : <Box>No new order has been placed</Box> }
            </Box>
        </Box>
    )
}

export default OrderConfirmation;