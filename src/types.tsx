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

export type Training = {
    activity: string;
    date: number;
    duration: number;
    id: number;
    customer: Customer;
}


