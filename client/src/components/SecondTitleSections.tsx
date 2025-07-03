export default function SecondTitleSections({ title }) {
    return (
        <>
            <div className="text-center mb-10">
                <h3 className="tracking-wider capitalize text-3xl sm:text-3xl font-bold text-gray-800 tracking-tight">
                    {title}
                </h3>
                <div className="w-16 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
            </div>
        </>
    );
}
