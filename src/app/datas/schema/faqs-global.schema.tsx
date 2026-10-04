// app/datas/schema/faqs-global.schema.tsx
import { FAQ_GLOBAL_ID } from "./ids";

const data = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": FAQ_GLOBAL_ID,
  mainEntity: [
        {
        "@type": "Question",
        "name": "What types of brands does MOTIF® work with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Startups (with access to a $150K annual marketing and tech budget), emerging brands, and growing brands in fashion, beauty, wellness, and lifestyle — globally. We don’t chase the myth of “product-market fit.” If you’ve got a product that can be sold — we’ll help you sell it, scale it, and build a lasting brand."
        }
      },
      {
        "@type": "Question",
        "name": "How does the engagement process work? Is there a trial period?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "After a consultation (if we both qualify), MOTIF® prepares a 90-day roadmap before any formal engagement — ensuring full alignment and clear expectations. Engagements are typically 6 months minimum. Brands move through 90, 180, and 366-day plans because that’s what it takes to drive meaningful growth. We don’t do short-term agency flings."
        }
      },
      {
        "@type": "Question",
        "name": "What is the typical timeline to hit $400K/month revenue?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It varies. Some brands hit $400K/month in 12 months, others in 18 or even 36. Speed depends on product, team, market conditions, and brand support. We focus on steady, sustainable scaling — not overnight miracles."
        }
      },
      {
        "@type": "Question",
        "name": "How is MOTIF® compensated? What are the costs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We operate on a profit-share model: 18–22% of incremental profits (capped at $35K/month) and no hidden fees. To field a dedicated team, we must drive at least $5K/month in profit share. This isn’t an extra fee — our incentives stay aligned with yours."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if my brand isn’t supporting growth opportunities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If opportunities are blocked — like limiting profitable ad spend or delaying decisions — we reserve the right to charge a $4,000/month minimum fee. This keeps the team engaged while hurdles are addressed."
        }
      },
      {
        "@type": "Question",
        "name": "What’s the security deposit for, and how does it work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We require a $15,000 security deposit upfront to prevent misuse of our expertise. This is credited back from profit share within about 3 months as we grow your brand."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Incubation and Acceleration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Acceleration: For startups under $50K/month aiming for $100K/month — includes consulting, mentoring, and phased execution. Incubation: For brands positioned to grow from $100K/month to $400K/month — includes full team deployment across all growth areas."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any fees outside the profit share?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most work is covered inside the model — designers, marketers, developers, CRO, CXO, revenue optimization. Large outside-scope projects are only proposed if they will generate 3X ROI within 6–8 months."
        }
      },
      {
        "@type": "Question",
        "name": "Why aren’t you just data-driven like other agencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Because brands aren’t built on dashboards — they’re built on emotion, instinct, and art. We use data to refine and scale, not to replace creative vision."
        }
      },
      {
        "@type": "Question",
        "name": "What happens when my brand hits $400K/month revenue?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our sweet spot is scaling brands to around $400K/month. Beyond that, we help transition you to a larger team or offer investment partnerships for further growth."
        }
      },
      {
        "@type": "Question",
        "name": "How is MOTIF® different from a traditional agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "MOTIF® isn’t an agency — it’s the internal team your brand deserves. Designers, strategists, marketers, developers, technologists, artists, and relationship managers all working to drive your brand forward."
        }
      },
      {
        "@type": "Question",
        "name": "How often does MOTIF® refresh my brand experience?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We lead a full redesign of your site, apps, emails, and key touchpoints once every 12 months — based on a year of data and current trends."
        }
      },
      {
        "@type": "Question",
        "name": "Do you use AI and LLMs (like GPT) in your process?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, but strategically. AI is a tool, not a replacement. We use it for analysis, personalization, and efficiency — human creativity leads the way."
        }
      },
      {
        "@type": "Question",
        "name": "How do I know if my brand is a good fit for MOTIF®?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you want long-term partners, value honesty over hype, and have the budget and commitment for sustainable growth, we may be a fit."
        }
      },
      {
        "@type": "Question",
        "name": "What if MOTIF® isn’t the right fit for my brand?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If we can’t add significant value or our approaches don’t align, we won’t take you on. Fit matters more than just selling a service."
        }
      },
      {
        "@type": "Question",
        "name": "How do I start?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Book a free strategy session. We’ll assess if we’re a fit and be honest if we aren’t."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if I block growth or slow down?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you refuse to scale when profitable or delay execution, we charge a $4,000/month minimum fee to keep the team funded."
        }
      }
  ],
};

export function GlobalFAQsScript() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export const globalFaqSchema = data;


