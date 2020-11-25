import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { 
    Box,
    Button,
    Center,
    useToast
} from '@chakra-ui/react';
// Components
import ProductInfo from '../components/orderForm/ProductInfo';
import CustomerInfo from '../components/orderForm/CustomerInfo';
import PaymentInfo from '../components/orderForm/PaymentInfo';

const OrderForm = ({ setOrderInfo, setOrderId }) => {
    const history = useHistory();
    const methods = useForm({
        defaultValues: {}
    });
    const { handleSubmit, formState, watch, reset } = methods;
    const toast = useToast();

    const watchedQuantity = watch("quantity", 1)

    const handleOrder = (values) => {
        let newOrder = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            address: {
                street1: values.street1,
                street2: values.street2,
                city: values.city,
                state: values.state,
                zip: values.zip
            },
            quantity: Number(values.quantity), 
            total: (values.quantity*49.99).toString(), 
            payment: {
                ccNum: values.ccNum,
                exp: `${values.expMonth}/${values.expYear}`
            }
        }

        axios.post('https://potions-eg.herokuapp.com/api/magic/', newOrder)
        .then(res => {
            setOrderInfo(newOrder)
            setOrderId(res.data.id)

            reset({})

            toast({
                title: "Order submitted",
                description: "We hope you love your new potion!",
                status: "success",
                duration: "2000",
                isClosable: true,
            })
            history.push("/success")
        })
        .catch(err => {
            toast({
                title: "Oops! Something went wrong",
                description: err.response.data.message,
                status: "error",
                duration: "2000",
                isClosable: true
            })
        })
    }

    return (
        <Box w={1/2} maxW="1024px"  mx="auto" py={10}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleOrder)}>
                    <ProductInfo />
                    <CustomerInfo />
                    <PaymentInfo watchedQuantity={watchedQuantity} />
                    <Center>
                        <Button type="submit" isLoading={formState.isSubmitting}>Submit Order</Button>
                    </Center>
                </form>
            </FormProvider>
        </Box>
    )
}

export default OrderForm;
