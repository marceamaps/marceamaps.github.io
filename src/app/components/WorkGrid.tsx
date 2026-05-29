type Project = {
    title: string;
    mediaUrl: string;
    mediaType: "image" | "video";
    link: string;
    background?: string;
};

export default function WorkGrid({ projects }: { projects: Project[] }) {
    return (
        <section className="px-8 pt-2 pb-24 md:pt-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <a
                        key={index}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                    >
                        <div
                            className="aspect-square overflow-hidden rounded-[28px] p-5"
                            style={{
                                background: project.background || "#2B2B2B",
                            }}
                        >
                            {project.mediaType === "video" ? (
                                <video
                                    src={project.mediaUrl}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-contain scale-[0.9] rounded-[18px] transition-transform duration-700 group-hover:scale-[0.93]"
                                />
                            ) : (
                                <img
                                    src={project.mediaUrl}
                                    alt={project.title}
                                    className="w-full h-full object-contain scale-[0.9] rounded-[18px] transition-transform duration-700 group-hover:scale-[0.93]"
                                />
                            )}
                        </div>

                        <h3 className="mt-5 text-2xl md:text-3xl font-bold leading-tight">
                            {project.title}
                        </h3>
                    </a>
                ))}
            </div>
        </section>
    );
}