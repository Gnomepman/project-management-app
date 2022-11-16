import Card from 'react-bootstrap/Card';
import { ITeamMember } from '../../models';
import GHLogo from '../../assets/images/gh-logo.png';

interface TeamMemberProps {
  item: ITeamMember;
}

export const TeamMember = ({ item }: TeamMemberProps) => {
  return (
    <div className="col-4 justify-content-center rounded ">
      <Card>
        <a href={item.url} target="_blank" rel="noreferrer">
          <img className="img-thumbnail" src={GHLogo} alt="github-logo" />
          <Card.Title>{item.username}</Card.Title>
        </a>
        <Card.Subtitle>{item.role}</Card.Subtitle>
        <Card.Text>{item.description} </Card.Text>
      </Card>
    </div>
  );
};
