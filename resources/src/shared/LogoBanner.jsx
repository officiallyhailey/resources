import logoImg from '../resources/assets/gallery/logo.png';
import headerBg from '../resources/assets/gallery/header.png';

export default function LogoBanner() {
  return (
    <div className="res-logo-header" style={{ backgroundImage: `url(${headerBg})` }}>
    </div>
  );
}
