import Link from 'next/link';

const Logo = ({ isLogoFooter = false }: { isLogoFooter?: boolean }) => {
    return (
        <Link
            href="/"
            className={`text-code font-bold uppercase ${isLogoFooter ? 'text-3xl' : 'text-2xl'
                }`}
        >
            <span className="text-valencia">A</span>
            <span className="text-supernova">y</span>
            <span className="text-cerise">n</span>
            <span className="text-azureradiance">a</span>
            <span className="text-azureradiance">.</span>
            <span className="text-oceangreen">A</span>
            {/* <span className="text-roseofsharon">I</span> */}
            <span className="text-brickred">I</span>
            {/* <span className="text-tanhide">ot</span> */}
        </Link>
    );
};
export default Logo;
