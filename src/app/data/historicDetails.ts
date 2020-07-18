import {Restaurant} from './restaurant';
import {User} from './user';

export class HistoricDetails {
  allStats: [{
    users: [User],
    restaurants: Restaurant,
    date_historical: string
  }];
}
