// app/datas/schema/reviews.schema.tsx
import { ORG_ID } from "./ids";

export const reviews = [
  {
    "@type": "Review",
    "@id": "https://wemotif.com/#review-1",
    author: {
      "@type": "Person",
      name: "Dominik Kubica",
      jobTitle: "Founder & CEO",
      worksFor: { "@type": "Organization", name: "DP PARADIS" }
    },
    reviewBody: "They don't build pieces of a puzzle. They architect the whole thing. For DP Paradis, the stakes were higher and the brand needed to be deeply experiential, visually magnetic, and operationally tight. Motif didn't just understand that, they anticipated it. They guided us through every step, aligned with our vision, and built a foundation that continues to shape the brand's future.",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    itemReviewed: { "@id": ORG_ID },
  },
  {
    "@type": "Review",
    "@id": "https://wemotif.com/#review-2",
    author: {
      "@type": "Person",
      name: "Marco & Dominik Kubica",
      jobTitle: "Head Of Ops & Founder",
      worksFor: { "@type": "Organization", name: "SCD" }
    },
    reviewBody: "Motif's branding strategy opened up new markets for us. They provided an all-encompassing solution to elevate our business, not just a surface-level presence. Their holistic approach continues to drive measurable results. Every campaign feels intentional, every execution is tied to long-term goals, and the level of dedication has consistently exceeded what we expected.",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    itemReviewed: { "@id": ORG_ID },
  },
  {
    "@type": "Review",
    "@id": "https://wemotif.com/#review-3",
    author: {
      "@type": "Person",
      name: "Jenny Wulace",
      jobTitle: "Founder",
      worksFor: { "@type": "Organization", name: "LACE" }
    },
    reviewBody: "My experience with previous agencies was frustrating. It is often difficult to gauge how much they care about the ultimate success of the company.Many agencies will have a set ad spend per month rather than working with your budget. MOTIF cares about my success.You often just pay an agency that then does their work, so you don't necessarily feel like they care. MOTIF wants to be a partner. We still work with them, which is a testament to how they work with us.",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    itemReviewed: { "@id": ORG_ID },
  },
  {
    "@type": "Review",
    "@id": "https://wemotif.com/#review-4",
    author: {
      "@type": "Person",
      name: "Cory",
      jobTitle: "Founder",
      worksFor: { "@type": "Organization", name: "FABLE" }
    },
    reviewBody: "MOTIF built a digital ecosystem that feels intuitive, immersive, and true to our identity. They transformed our customer journey into a movement, turning everyday supporters into passionate advocates. Their ability to merge design with strategy gave us results beyond aesthetics. The site became a living brand experience that customers return to with loyalty and pride.",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    itemReviewed: { "@id": ORG_ID },
  },
  {
    "@type": "Review",
    "@id": "https://wemotif.com/#review-5",
    author: {
      "@type": "Person",
      name: "Esther Chang",
      jobTitle: "Co-Founder",
      worksFor: { "@type": "Organization", name: "TENSHOPPE" }
    },
    reviewBody: "We have a fully functioning site, delivered cost-effectively, at high quality, with excellent design and functionality. MOTIF's turnaround time was fast, their communication clear, and every request was met with care. Beyond delivery, they made sure we understood the reasoning behind choices and how they would affect future growth. Their approach is reliable and inspiring.",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    itemReviewed: { "@id": ORG_ID },
  },
  {
    "@type": "Review",
    "@id": "https://wemotif.com/#review-6",
    author: {
      "@type": "Person",
      name: "Alla Ishkirat",
      jobTitle: "Founder",
      worksFor: { "@type": "Organization", name: "IHD" }
    },
    reviewBody: "Motif's level of dedication and personalized care was truly incredible. The team was professional, reliable, and always accessible throughout the project. Their work exceeded expectations and directly boosted our sales. They delivered everything on time and brought a hands-on, committed approach to our success. Their involvement felt like that of a true business partner.",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    itemReviewed: { "@id": ORG_ID },
  },
  {
    "@type": "Review",
    "@id": "https://wemotif.com/#review-7",
    author: {
      "@type": "Person",
      name: "Sara Dhiman",
      jobTitle: "Founder",
      worksFor: { "@type": "Organization", name: "Jewelry Amore" }
    },
    reviewBody: "Motif provides the perfect balance of professionalism and creativity. They completely captured what we were looking for and executed with high attention to detail. Their communication and support made the entire process smooth. What impressed us most was how genuine and good-natured the team is. They cared about delivering success as much as we did, which built real trust.",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    itemReviewed: { "@id": ORG_ID },
  },
  {
    "@type": "Review",
    "@id": "https://wemotif.com/#review-8",
    author: {
      "@type": "Person",
      name: "Mohammad Faisal",
      jobTitle: "Founder",
      worksFor: { "@type": "Organization", name: "StyleBud" }
    },
    reviewBody: "Motif helped us organize our vision into a system that actually delivered. They were fast, communicative, and extremely reliable. Every idea was tested, every strategy was explained, and execution felt seamless. We saw performance metrics rise and operations run smoother. What I valued most was how grounded their process was. They never sold us promises, they gave us work that scaled. That kind of consistency is rare and the reason we continue to rely on them.",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    itemReviewed: { "@id": ORG_ID },
  },
  {
    "@type": "Review",
    "@id": "https://wemotif.com/#review-9",
    author: {
      "@type": "Person",
      name: "Collin Gray",
      jobTitle: "Founder",
      worksFor: { "@type": "Organization", name: "Fable Beard Co." }
    },
    reviewBody: "Motif built more than a site, they built a system tailored to our goals. They took the time to understand what success looked like for us, and then designed with strategy, not just style. Documentation was clear, communication was consistent, and issues were anticipated ahead of time. The result was a tool we could use daily with confidence. It was less about handing off a project and more about setting up a foundation we could continue to scale sustainably.",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    itemReviewed: { "@id": ORG_ID },
  },
  {
    "@type": "Review",
    "@id": "https://wemotif.com/#review-10",
    author: {
      "@type": "Person",
      name: "Marco",
      jobTitle: "Head of Ops",
      worksFor: { "@type": "Organization", name: "SCD" }
    },
    reviewBody: "Motif's partnership has become indispensable to us. Their responsiveness, discipline, and ability to adapt has allowed us to make progress quickly and consistently. They bring clarity into complex situations and remove friction so we can focus on growth. Every engagement feels like a step forward, not just a task completed. It is this ability to stay sharp, move fast, and remain aligned with our goals that makes them more than a vendor. They are a true long-term ally.",
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    itemReviewed: { "@id": ORG_ID },
  },
];

export function ReviewsScript() {
  const graph = { "@context": "https://schema.org", "@graph": reviews };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}