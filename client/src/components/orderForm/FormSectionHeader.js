import React from 'react';
import { Flex, Heading, AccordionButton, AccordionIcon } from '@chakra-ui/react';

const FormSectionHeader = ({ title, setOpenIndex, index }) => {
    return (
        <AccordionButton bg="#332E54" _hover="none" px={3} py={4} mb={2} onClick={() => setOpenIndex(index)}>
            <Flex justifyContent="space-between" w="100%">
            <Heading size="sm" textTransform="uppercase" letterSpacing=".1rem" color="white" fontWeight="400" >{title}</Heading>
            <AccordionIcon color="white" />
            </Flex>
        </AccordionButton>
    )
}

export default FormSectionHeader;