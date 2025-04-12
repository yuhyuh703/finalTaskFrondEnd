export type Customer = {
    city: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    postcode: string;
    streetaddress: string;
    id: number;
}

import { Dayjs } from 'dayjs';

export type Training = {
    activity: string;
    date: Dayjs;
    duration: string;
    id: number;
    customer: Customer;
}


