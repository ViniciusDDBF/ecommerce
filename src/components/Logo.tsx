import { Link } from 'react-router';
import LogoImg from '../img/DundichsTaighV3.png';

const Logo = () => {
  return (
    <Link to="/">
      <div
        className="h-35 w-35 rounded-full bg-cover bg-center transition duration-300 hover:shadow-lg hover:shadow-amber-600/25"
        style={{ backgroundImage: `url(${LogoImg})` }}
      ></div>
    </Link>
  );
};

export default Logo;
