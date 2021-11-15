export interface EOOrder {
    restaurantName: string;
    restaurantAddress: string;
    restaurantWebsite: string;
    groupMesssage: string;
    paymentInfoPaypal: string;
    paymentInfoVenmo: string;
    paymentInfoCash: string;
    pickupTime: string;
    owner: string;
    users: Array<string>;
}
