import {SuperGroup} from '../super_group/super_group';
import {User} from '../user/user';

export interface Group {
  id: number;
  // name and group url are the same (but does not include the go/xxx)
  name: string;
  description: string;
  supergroup: SuperGroup;
  owner: User;
  members_waiting_approval: User[];
  non_members_can_view: boolean;
  isCurrentUserSubscribed: boolean;
  membership_needs_approval: boolean;
  isCurrentUsersMembershipPending: boolean;
}
