import React from 'react';
import { useFormContext } from 'react-hook-form';
import { 
    Box, 
    Flex,
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
} from '@chakra-ui/react';
import FormSectionHeader from './FormSectionHeader';
import PotionImg from '../../assets/potion.png';

const ProductInfo = () => {
    const { errors, register } = useFormContext();

    return (
        <Box bg="white" mb={4} boxShadow="xs" >
            <FormSectionHeader title={"Order Summary"} />

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

                </Box>
            </Flex>
        </Box>
    )
}

export default ProductInfo;