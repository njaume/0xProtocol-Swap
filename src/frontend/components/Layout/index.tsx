import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full">
            <div className="container mx-auto p-4 md:p-10 card rounded-[20px] md:rounded-[30px] bg-white w-full md:w-[700px] md:max-w-[700px] min-h-[80vh] md:min-h-[75vh] flex flex-col">
                <div className="flex-grow h-full flex flex-col">{children}</div>
                <Footer />
            </div>
        </div>
    );
}
