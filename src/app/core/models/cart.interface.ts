import { account } from 'src/app/core/models/accounts.interface';

export interface cartState {
    accounts: account[],
    coupon: string,
    discount: number,
    orderPrice: number
  }