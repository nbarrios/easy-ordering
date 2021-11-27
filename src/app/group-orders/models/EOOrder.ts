import { EOUserOrder } from './EOUserOrder';

export interface EOOrder {
    restaurantName: string;
    restaurantAddress: string;
    restaurantWebsite: string;
    groupMesssage: string;
    paymentInfoPaypal: string;
    paymentInfoVenmo: string;
    paymentInfoCash: string;
    pickupTime: string;
    completed: boolean;
    owner: string;
    orders: Array<EOUserOrder>;
}
