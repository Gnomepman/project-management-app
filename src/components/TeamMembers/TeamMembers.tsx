import { TeamMember } from '../TeamMemberItem/TeamMemberItem';
import { TeamMembersData } from '../../assets/data';
import { ITeamMember } from '../../models';

export const TeamMembers = () => {
  return (
    <section className="row text-center">
      {TeamMembersData.map((item: ITeamMember) => (
        <TeamMember key={item.id} item={item} />
      ))}
    </section>
  );
};
