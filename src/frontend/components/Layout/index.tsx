import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full">
            <div className="container mx-auto p-10 card rounded-[30px] bg-white xl:w-2/5">
                {children}
                <Footer />
            </div>
        </div>
    );
}
