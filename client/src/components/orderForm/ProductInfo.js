import React from 'react';
import { useForm } from 'react-hook-form';
import { 
    Box, 
    Flex,
    Center,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Image,
    Text,
    Button,
    AccordionPanel,
} from '@chakra-ui/react';

import FormSectionHeader from './FormSectionHeader';
import PotionImg from '../../assets/potion.png';

const ProductInfo = ({ setOpenIndex }) => {
    const { handleSubmit, errors, register} = useForm();

    const productIndex = 0;

    // TODO: UPDATE CLICK HANDLER
    const handleClick = (values) => {
        console.log("Click")
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
        }, 500)
        setOpenIndex(Number(productIndex) + 1)
    }

    return (
        <Box bg="white" mb={4} boxShadow="xs" >
            <FormSectionHeader title={"Order Summary"} setOpenIndex={setOpenIndex} index={productIndex} />

            <AccordionPanel>
                <Flex alignItems="center">

                    <Image src={PotionImg} alt="white potion bottle against purple background" w={1/3} m={6} />

                    <Box m={6} w="40%">
                        <Box my={3} >
                            <Text >Magic Potion</Text>
                            <Text>$49.99</Text>
                        </Box>
                        
                        {/* QUANTITY */}
                        <FormControl isRequired isInvalid={errors.quantity} w="100px">
                            <FormLabel fontSize="sm" htmlFor="quantity">Quantity</FormLabel>
                            <NumberInput defaultValue={1} min={1} max={3}>
                                <NumberInputField 
                                    id="quantity"
                                    name="quantity"
                                    ref={register({
                                        required: "Tell us how many potions you want!",
                                        max: {
                                            value: 3,
                                            message: "You may purchase up to 3 potions"
                                        }
                                    })}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <FormHelperText>Max. 3</FormHelperText>
                            <FormErrorMessage>{errors.quantity && errors.quantity.message}</FormErrorMessage>
                        </FormControl>

                        {/* TODO: MAKE DYNAMIC! */}
                        <Text mt={8} ><Box as="span" fontWeight="500">Total:</Box> $49.99</Text>
                    </Box>

                </Flex>

                <Center pb={6}>
                    <Button onClick={handleSubmit(handleClick)} >Proceed to Checkout</Button> 
                </Center>
            </AccordionPanel>

        </Box>
    )
}

export default ProductInfo;