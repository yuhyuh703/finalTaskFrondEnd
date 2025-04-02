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

export type Training = {
    activity: string;
    date: string;
    duration: number;
    _links: {
        customer: {
            href: string;
        };
        self: {
            href: string;
        };
        traning: {
            href: string;
        }
    };
}


