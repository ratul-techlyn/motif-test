import FloatingSealEntrance from '@/components/FloatingSealEntrance';
import Logo from '@/components/shared/footer/BrandLogo';
import ContactSeal from '@/components/shared/footer/ContactSeal';
import Link from 'next/link';

const FloatingContactBadge = () => {
  return (
    <FloatingSealEntrance className="jb-floating-contact-badge right-4 bottom-4 hidden md:block w-[8vw] h-[8vw] z-40 pointer-events-auto">
      <Link href="/contact" className='block w-full h-full'>
        <div className="w-full h-full relative" data-cursor-label="Let’s Talk">
          <div className="absolute top-0 left-0 w-full h-full">
            <Logo />
          </div>
          <div className="absolute top-0 left-0 w-full h-full animate-spin_slow">
            <ContactSeal />
          </div>
        </div>
      </Link>
    </FloatingSealEntrance>
  );
};

export default FloatingContactBadge;