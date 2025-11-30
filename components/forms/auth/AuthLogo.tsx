import Image from 'next/image';

interface AuthLogoProps {
    sizeClass?: string;
    alt?: string;
}

export default function AuthLogo({ sizeClass = 'w-36 sm:w-44 md:w-56 h-36 sm:h-44 md:h-56', alt = 'Logo' }: AuthLogoProps) {
    return (
        <div className="flex justify-center mb-0">
            <div className={`relative ${sizeClass}`}>
                <Image src="/Logo.svg" alt={alt} fill className="object-contain" />
            </div>
        </div>
    );
}
