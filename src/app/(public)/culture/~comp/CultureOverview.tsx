import React from 'react';
const companyOverview = [
    {
        title: "Work Culture",
        content: "At Motif, collaboration is at the heart of everything we do. From ideation and development to maintenance and digital marketing, we actively partner with brands to help them understand their customers and discover where their true value lies."
    },
    {
        title: "Our Mission",
        content: "Our work is the culmination of inspired dreams and cutting-edge digital practices. We focus on creating value through a perfect blend of fun and professionalism, ensuring every project delivers meaningful outcomes."
    },
    {
        title: "Our Beliefs",
        content: "At Motif, we prioritize cultures and people in all our interactions, placing respect and equality at the forefront. We foster positivity, teamwork, and shared success. We believe that brands thrive when they remain authentic and aligned with the needs of their ultimate users—people."
    }
];

const CultureOverview = () => {
    return (
        <div className="layout_normal mt-[5%] lg:mt-[10%] w-[90%] lg:w-[70%] mx-auto px-2">
            {/* Intro Section */}
            <div className="py-10 md:py-20 mt-20">
                <div className="flex flex-col lg:flex-row lg:items-start lg:gap-x-[12%]">
                <h1 className="lg:basis-[45%] text-section_heading_sm md:text-section_heading_md lg:text-section_heading_lg 2xl:text-section_heading_2xl leading-[1.2] text-white font-semibold uppercase font-clash">
                    UN/EXCEPTIONAL PEOPLE DOING 'EXCEPTIONS'
                </h1>
                <p className="lg:basis-[55%] text-large_para_sm md:text-large_para_md lg:text-large_para_lg 2xl:text-large_para_2xl lg:ps-4 leading-[1.2] text-[#848484] font-normal font-helvetica">
                    MOTIF® is an incubator company which started as a global agency who build, grow and scale brands with design, data, and technology. Together, we're focused on connecting brands with people and culture — across the world.
                </p>
                </div>
            </div>

            {/* Company Overview Cards */}
            <div className="flex flex-col md:flex-row gap-10 py-12 md:py-20">
                {companyOverview.map((item, idx) => (
                    <div
                    key={idx}
                    className="w-full md:w-1/3 space-y-4"
                    >
                    <h1 className="text-white text-cart_title_sm md:text-cart_title_md lg:text-cart_title_lg 2xl:text-cart_title_2xl font-semibold">
                        {item.title}
                    </h1>
                    <p className="text-base md:text-lg text-[#848484]">{item.content}</p>
                    </div>
                ))}
                </div>

            </div>

    );
};

export default CultureOverview;