import { UserOrder } from './UserOrder';

export interface GroupOrder {
    restaurantName: string;
    restaurantAddress: string;
    restaurantWebsite: string;
    groupMessage: string;
    paymentInfoPaypal: string;
    paymentInfoVenmo: string;
    paymentInfoCash: string;
    pickupTime: string;
    completed: boolean;
    owner: string;
    users: string[];
    orders: Map<string, UserOrder>;
}
