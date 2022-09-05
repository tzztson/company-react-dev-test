import './Card.css';
import Heading from './Heading';
import SubHeading from './SubHeading';

const Card = ({ bgcolor, children, heading, subHeading }) => (
  <div className="card" style={{ background: bgcolor }}>
    <Heading text={heading} />
    <SubHeading text={subHeading} />
    {children}
  </div>
);

export default Card;
