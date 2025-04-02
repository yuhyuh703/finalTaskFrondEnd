export type Customer = {
    city: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    postcode: string;
    streetaddress: string;
    _links: {
        customer: {
            href: string;
        };
        self: {
            href: string;
        };
        trainings: {
            href: string;
        };
    };   
}



