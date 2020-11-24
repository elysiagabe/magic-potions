import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Tooltip,
} from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons'
import FormSectionHeader from './FormSectionHeader';
import StateSelect from './StateSelect';

const CustomerInfo = () => {
    const { errors, register } = useFormContext();

    return (
        <Box bg="white" mb={4} boxShadow="xs">
            <FormSectionHeader title={"Customer Information"} />
            <Box m={6}>
                <Flex justifyContent="space-between" >
                    {/* FIRST NAME */}
                    <FormControl isRequired isInvalid={errors.firstName} w="49%" mb={4}>
                        <FormLabel htmlFor="firstName" fontSize="sm">First Name</FormLabel>
                        <Input 
                            id="firstName"
                            name="firstName"
                            type="text" 
                            ref={register({
                                required: "Please enter your first name",
                                })}
                        />
                        <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
                    </FormControl>

                    {/* LAST NAME */}
                    <FormControl isRequired isInvalid={errors.lastName} w="49%" mb={4}>
                        <FormLabel htmlFor="lastName" fontSize="sm">Last Name</FormLabel>
                        <Input 
                            id="lastName"
                            name="lastName"
                            type="text" 
                            ref={register({
                                required: "Please enter your last name",
                            })}
                        />
                        <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
                    </FormControl>
                </Flex>

                {/* EMAIL */}
                <FormControl isRequired isInvalid={errors.email} mb={4}>
                    <FormLabel htmlFor="email" fontSize="sm">Email</FormLabel>
                    <Input 
                        id="email"
                        name="email"
                        type="email" 
                        ref={register({
                            required: "You must provide an email address",
                            minLength: {
                                value: 3,
                                message: "A valid email address should be at least 3 characters"
                            }
                        })}
                    />
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </FormControl>

                {/* ADDR 1 */}
                <FormControl isRequired isInvalid={errors.street1} mb={4}>
                    <FormLabel htmlFor="street1" fontSize="sm">Address 1</FormLabel>
                    <Input 
                        id="street1"
                        name="street1"
                        type="text"  
                        ref={register({
                            required: "Enter your street address, so we know where to ship your order!"
                        })}
                    />
                    <FormErrorMessage>{errors.street1 && errors.street1.message}</FormErrorMessage>
                </FormControl>

                {/* ADDR 2 -- optional */}
                <FormControl mb={4}>
                    <FormLabel htmlFor="street2" fontSize="sm" mb={4}>Address 2</FormLabel>
                    <Input id="street2" name="street2" type="text" />
                    <FormHelperText>Apartment, suite, etc. (Optional)</FormHelperText>
                </FormControl>

                <Flex justifyContent="space-between">
                    {/* CITY */}
                    <FormControl isRequired isInvalid={errors.city} w="39%" mb={4}>
                        <FormLabel htmlFor="city" fontSize="sm">City</FormLabel>
                        <Input 
                            id="city"
                            name="city"
                            type="text"
                            ref={register({
                                required: "Enter your city name"
                            })}
                        />
                        <FormErrorMessage>{errors.city && errors.city.message}</FormErrorMessage>
                    </FormControl>

                    {/* STATE */}
                    <FormControl isRequired isInvalid={errors.state} w="39%" mb={4}> 
                        <FormLabel htmlFor="state" fontSize="sm">State</FormLabel>
                        <Select 
                            id="state"
                            name="state"
                            placeholder="Select state"
                            ref={register({
                                required: "Select your state"
                            })}
                        >
                            <StateSelect />
                        </Select>
                        <FormErrorMessage>{errors.state && errors.state.message}</FormErrorMessage>
                    </FormControl>

                    {/* ZIP */}
                    <FormControl isRequired isInvalid={errors.zip} w="18%" mb={4}>
                        <FormLabel htmlFor="zip" fontSize="sm">ZIP Code</FormLabel>
                        <Input 
                            id="zip"
                            name="zip"
                            type="text" 
                            ref={register({
                                required: "Please enter a valid ZIP code",
                                pattern: {
                                    value: 	/^\d{5}(?:[-]\d{4})?$/,
                                    message: "ZIP code should be formatted as 00000 or 00000-0000"
                                },
                                minLength: {
                                    value: 5,
                                    message: "ZIP code is too short"
                                },
                                maxLength: {
                                    value: 10, 
                                    message: "ZIP code is too long"
                                }
                            })}
                        />
                        <FormErrorMessage>{errors.zip && errors.zip.message}</FormErrorMessage>
                    </FormControl>
                            
                </Flex>

                {/* PHONE */}
                <FormControl isRequired isInvalid={errors.phone} mb={6}>
                    <FormLabel htmlFor="phone" fontSize="sm">Phone</FormLabel>
                    <InputGroup>
                        <Input 
                            id="phone"
                            name="phone"
                            type="text"
                            ref={register({
                                required: "Please enter your phone (just in case!)",
                                minLength: {
                                    value: 7,
                                    message: "Please enter a valid phone number"
                                }
                            })} 
                        />
                            
                        <InputRightElement children={
                            <Tooltip hasArrow label="In case we need to contact you about your order" aria-label="A tooltip" fontSize="xs" bg="#332E54" color="white">
                                <QuestionOutlineIcon color="gray.400" />
                            </Tooltip>
                        } />
                    </InputGroup>
                    <FormErrorMessage>{errors.phone && errors.phone.message}</FormErrorMessage>
                </FormControl>
            </Box>
        </Box>
    )
}

export default CustomerInfo;