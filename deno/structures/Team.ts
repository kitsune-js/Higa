import { User } from './User.ts';

interface Team {
  icon?: string;
  id: string;
  members: TeamMember[];
  name: string;
  owner_user_id: string;
}

interface TeamMember {
  membership_state: TeamMembershipState;
  permissions: string[];
  team_id: string;
  user: User;
}

enum TeamMembershipState {
  INVITED = 1,
  ACCEPTED = 2
}

export { TeamMembershipState };
export type { Team, TeamMember };
