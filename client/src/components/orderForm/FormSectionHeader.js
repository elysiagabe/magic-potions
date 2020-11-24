import React from 'react';
import { Heading, Box, } from '@chakra-ui/react';

const FormSectionHeader = ({ title }) => {
    return (
        <Box bg="#332E54" _hover="none" px={3} py={4} mb={2} >
            <Heading size="sm" textTransform="uppercase" letterSpacing=".1rem" color="white" fontWeight="400" >{title}</Heading>
        </Box>
    )
}

export default FormSectionHeader;