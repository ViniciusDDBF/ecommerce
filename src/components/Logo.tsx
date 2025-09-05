import { Link } from 'react-router';
import LogoImg from '../../public/DundichsTaighV3.png';

const Logo = () => {
  return (
    <Link to="/">
      <div
        className="w-35 h-35 rounded-full bg-cover bg-center hover:shadow-amber-600/25 hover:shadow-lg transition duration-300"
        style={{ backgroundImage: `url(${LogoImg})` }}
      ></div>
    </Link>
  );
};

export default Logo;
