import { ITeamMember } from '../../models';
import GHLogo from '../../assets/images/gh-logo.png';

interface TeamMemberProps {
  item: ITeamMember;
}

export const TeamMember = ({ item }: TeamMemberProps) => {
  return (
    <div className="col-lg-4 col-md-4 row-col-sm-3 card-hover">
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="d-flex justify-content-center align-items-center gap-2"
      >
        <img height="25" src={GHLogo} alt="github-logo" className="d-none d-md-block" />
        <span className="text-responsive">{item.username}</span>
      </a>
    </div>
  );
};
