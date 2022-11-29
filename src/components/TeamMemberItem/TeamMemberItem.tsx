import Card from 'react-bootstrap/Card';
import { ITeamMember } from '../../models';
import GHLogo from '../../assets/images/gh-logo.png';

interface TeamMemberProps {
  item: ITeamMember;
}

export const TeamMember = ({ item }: TeamMemberProps) => {
  return (
    <div className="col-4 justify-content-center rounded ">
      <Card style={{ width: '150px' }}>
        <a href={item.url} target="_blank" rel="noreferrer">
          <img height="30" src={GHLogo} alt="github-logo" />
          <Card.Title>{item.username}</Card.Title>
        </a>
      </Card>
    </div>
  );
};
