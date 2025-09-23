import { Link } from 'react-router';
import LogoImg from '../img/DundichTaighDigitalLogo.png';
import CinematicTitle from './CinematicTitle';

const Logo = () => {
  return (
    <Link className="group flex items-center gap-2" to="/">
      <div
        className="h-25 w-25 rounded-full bg-cover bg-center transition duration-300 group-hover:shadow-lg group-hover:shadow-amber-800/25"
        style={{ backgroundImage: `url(${LogoImg})` }}
      ></div>
      <div className="flex flex-col items-center">
        <CinematicTitle text="DUNDICH'S" />
        <CinematicTitle text="TAIGH" />
      </div>
    </Link>
  );
};

export default Logo;
