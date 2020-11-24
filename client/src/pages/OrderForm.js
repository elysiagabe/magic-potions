import React, { useState } from 'react';
import { 
    Box,
    Accordion,
    AccordionItem
} from '@chakra-ui/react';
// Components
import ProductInfo from '../components/orderForm/ProductInfo';
import CustomerInfo from '../components/orderForm/CustomerInfo';
import PaymentInfo from '../components/orderForm/PaymentInfo';

const OrderForm = () => {
    const [openIndex, setOpenIndex] = useState(0)
    const [formValues, setFormValues] = useState({
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

    return (
        <Box w={1/2} maxW="1024px"  mx="auto" py={10}>
            <Accordion index={[openIndex]} allowToggle >
                <AccordionItem>
                    <ProductInfo setOpenIndex={setOpenIndex} formValues={formValues} setFormValues={setFormValues} />
                </AccordionItem>
                <AccordionItem>
                    <CustomerInfo setOpenIndex={setOpenIndex} formValues={formValues} setFormValues={setFormValues} />
                </AccordionItem>
                <AccordionItem borderBottom="none">
                    <PaymentInfo setOpenIndex={setOpenIndex} formValues={formValues} setFormValues={setFormValues} />
                </AccordionItem>
            </Accordion>
        </Box>
    )
}

export default OrderForm;