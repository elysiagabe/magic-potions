import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
    Box,
    Flex,
    Center,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Select,
    Text,
    Image,
} from '@chakra-ui/react';
import FormSectionHeader from './FormSectionHeader';
import ExpMonthSelect from './ExpMonthSelect';
import ExpYearSelect from './ExpYearSelect';
import PotionImg from '../../assets/potion.png';

const PaymentInfo = ({ watchedQuantity }) => {
    const { errors, register } = useFormContext();

    return (
        <Box bg="white" mb={4} boxShadow="xs">
            <FormSectionHeader title={"Payment"} />

            <Flex justifyContent="space-between" alignItems="center" m={6} bg="purple.50" flexWrap="wrap" p={6} borderRadius="8px">
                <Text w="100%" textAlign="center" fontSize="sm" fontWeight="600" textTransform="uppercase" mb={2}>Your Order</Text>
                <Image src={PotionImg} alt="white potion bottle against purple background" w={1/5} />
                <Text>Magic Potion x {watchedQuantity}</Text>
                <Text><Box as="span" fontWeight="500">Total:</Box> ${watchedQuantity * 49.99}</Text>
            </Flex>

            <Flex justifyContent="space-between" m={6}>
                {/* CREDIT CARD NUM */}
                <FormControl isRequired isInvalid={errors.ccNum} w="65%" mb={4}>
                    <FormLabel htmlFor="ccNum" fontSize="sm">Credit Card</FormLabel>
                    <Input 
                        id="ccNum"
                        name="ccNum"
                        type="text"
                        ref={register({
                            required: "You must enter a valid credit card number",
                            pattern: {
                                value: /^\d{12,16}$/,
                                message: "Enter a valid credit card number and do not include any spaces, dashes or other characters"
                            }
                        })}
                    />
                    <FormErrorMessage>{errors.ccNum && errors.ccNum.message}</FormErrorMessage>
                </FormControl>

                {/* EXP DATE */}
                <FormControl isRequired isInvalid={errors.expMonth || errors.expYear} w="31%">
                    <FormLabel fontSize="sm">Expiration</FormLabel>
                    <Flex alignItems="center">
                        <Select
                            id="expMonth"
                            name="expMonth"
                            placeholder="MM"
                            ref={register({
                                required: "Select a valid expiration month"
                            })}
                        >
                            <ExpMonthSelect />
                        </Select>

                        <Text p={2}>/</Text>

                        <Select
                            id="expYear"
                            name="expYear"
                            placeholder="YY"
                            ref={register({
                                required: "Select a valid expiration year"
                            })}
                        >
                            <ExpYearSelect />
                        </Select>
                    </Flex>
                    <FormErrorMessage>{errors.expMonth && errors.expMonth.message}</FormErrorMessage>
                    <FormErrorMessage>{errors.expYear && errors.expYear.message}</FormErrorMessage>
                </FormControl>
            </Flex>

            <Center pb={4}>
                <Text as="i" color="gray.500">Your credit card will be charged ${watchedQuantity * 49.99}</Text>
            </Center>
        </Box>
    )
}

export default PaymentInfo;