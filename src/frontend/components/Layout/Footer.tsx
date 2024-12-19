import Image from "next/image";

export default function Footer() {
    return (
        <div className="w-full mt-6 flex items-center justify-center gap-2">
            <span className="text-gray-dark text-lg">Powered by</span>
            <Image src="/logo-wake.png" alt="footer" width={140} height={33} />
        </div>
    );
}
