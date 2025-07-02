export default function MainTitleSections({ title }) {
    return (
        <>
            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
                    {title}
                </h1>
                <div className="w-16 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
            </div>
        </>
    );
}
