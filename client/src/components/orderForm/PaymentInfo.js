import React from 'react';
import { useForm } from 'react-hook-form';
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
} from '@chakra-ui/react';
import FormSectionHeader from './FormSectionHeader';
import ExpMonthSelect from './ExpMonthSelect';
import ExpYearSelect from './ExpYearSelect';

const PaymentInfo = ({ setOpenIndex }) => {
    const { handleSubmit, errors, register } = useForm();

    const paymentIndex = 2;

    // TO DO: UPDATE CLICK HANDLER
    const handleClick = () => {
        console.log("Submitted")
    }

    return (
        <Box bg="white" mb={4} boxShadow="xs">
            <FormSectionHeader title={"Payment"} setOpenIndex={setOpenIndex} index={paymentIndex} />

            <AccordionPanel>
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
                <Text as="i" color="gray.500">Your credit card will be charged $49.99</Text>
            </Center>

            <Center pb={6}>
                <Button onClick={handleSubmit(handleClick)}>Submit Order</Button>
            </Center>
            </AccordionPanel>
        </Box>
    )
}

export default PaymentInfo;