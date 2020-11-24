import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
    Box,
    Flex,
    Center,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Select,
    Text,
    AccordionPanel,
    Image,
    useToast
} from '@chakra-ui/react';
import FormSectionHeader from './FormSectionHeader';
import ExpMonthSelect from './ExpMonthSelect';
import ExpYearSelect from './ExpYearSelect';
import PotionImg from '../../assets/potion.png';

const PaymentInfo = ({ setOpenIndex, formValues, setFormValues }) => {
    const { handleSubmit, errors, register } = useForm();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const paymentIndex = 2;

    // TO DO: UPDATE CLICK HANDLER
    const handleClick = (values) => {
        setIsLoading(true)

        setFormValues({
            ...formValues,
            payment: {
                ccNum: values.ccNum,
                exp: `${values.expMonth}/${values.expYear}`
            }
        })

         axios.post('http://localhost:5000/api/magic/', formValues)
        .then(res => {
            console.log("SUCCESS: ", res.data)
            setIsLoading(false)

            setFormValues({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                quantity: 1,
                total: '',
                address: {
                    street1: '',
                    street2: '',
                    city: '',
                    state: '',
                    zip: ''
                },
                payment: {
                    ccNum: '',
                    exp: ''
                }
            })

            toast({
                title: "Order submitted",
                description: "We hope you love your new potion!",
                status: "success",
                duration: "500",
                isClosable: true,
            })
        })
        .catch(err => {
            setIsLoading(false)
            toast({
                title: "Oops! Something went wrong",
                description: "We're aware of the issue and working to solve it.",
                status: "error",
                duration: "500",
                isClosable: true
            })
        })
    }

    return (
        <Box bg="white" mb={4} boxShadow="xs">
            <FormSectionHeader title={"Payment"} setOpenIndex={setOpenIndex} index={paymentIndex} />

            <AccordionPanel>
                <Flex justifyContent="space-between" alignItems="center" m={6} bg="purple.50" flexWrap="wrap" p={6} borderRadius="8px">
                    <Text w="100%" textAlign="center" fontSize="sm" fontWeight="600" textTransform="uppercase" mb={2}>Your Order</Text>
                    <Image src={PotionImg} alt="white potion bottle against purple background" w={1/5} />
                    <Text>Magic Potion x {formValues.quantity}</Text>
                    <Text><Box as="span" fontWeight="500">Total:</Box> ${formValues.total}</Text>
                </Flex>

                <Flex justifyContent="space-between" m={6}>
                    {/* CREDIT CARD NUM */}
                    <FormControl isRequired isInvalid={errors.ccNum} w="70%" mb={4}>
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
                    <FormControl isRequired isInvalid={errors.expMonth || errors.expYear} w="28%">
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
                    {/* TODO: MAKE DYNAMIC */}
                    <Text as="i" color="gray.500">Your credit card will be charged ${formValues.total}</Text>
                </Center>

                <Center pb={6}>
                    <Button isLoading={isLoading} onClick={handleSubmit(handleClick)}>Submit Order</Button>
                </Center>
            </AccordionPanel>
        </Box>
    )
}

export default PaymentInfo;