import Card from 'react-bootstrap/Card';
import { ITeamMember } from '../../models';
import GHLogo from '../../assets/images/gh-logo.png';

interface TeamMemberProps {
  item: ITeamMember;
}

export const TeamMember = ({ item }: TeamMemberProps) => {
  return (
    <div className="col-lg-4 col-md-4 row-col-sm-3 rounded ">
      <Card>
        <a href={item.url} target="_blank" rel="noreferrer">
          <img height="30" src={GHLogo} alt="github-logo" />
          <Card.Title>{item.username}</Card.Title>
        </a>
        <Card.Subtitle className="d-none">{item.role}</Card.Subtitle>
        <Card.Text className="d-none">{item.description} </Card.Text>
      </Card>
    </div>
  );
};
