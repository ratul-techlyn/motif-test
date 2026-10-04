import FaqsAll from '@/components/cards/FaqsAll';
import { Metadata } from "next";
import { faqsSEO } from "../../datas/seo/pages/faqs.seo";

export const metadata: Metadata = faqsSEO;



const motif_faq = {
  description: [
    "Cutting through",
    "Confusions",
    "No fluffs",
  ],
  accordionList: [
    {
      title: "Brand Types",
      description: [
        {
          text: "Startups (with access to a $150K annual marketing and tech budget), emerging brands, and growing brands in fashion, beauty, wellness, and lifestyle. We don’t chase the myth of “product-market fit.” If you’ve got a product that can be sold — we’ll help you sell it, scale it, and build a lasting brand. That’s what matters."
        }
      ]
    },
    {
      title: "Engagement Process",
      description: [
        {
          text: "After a consultation (if we both qualify), MOTIF® prepares a 90-day roadmap before any formal engagement — this ensures full alignment and sets expectations. Engagements are typically 6 months minimum — but the real goal is to build long-term partnerships. Brands move through 90, 180, and 366-day plans — not to lock you in, but because that’s what it takes to drive meaningful growth. We don’t do “3-month agency flings.” If you’re not thinking long-term, we’re probably not the right team for you."
        }
      ]
    },
    {
      title: "Timeline to $400K/Month",
      description: [
        {
          text: "It depends — honest answer. Some brands hit $400K/month in 12 months, some in 18, others in 36. Every brand moves at its own pace. Growth speed depends on countless factors, including product, team, market conditions, and brand support. We focus on steady, sustainable scaling, not overnight miracles."
        }
      ]
    },
    {
      title: "Compensation Model",
      description: [
        {
          text: "We don’t charge a monthly retainer or hourly fees — everything runs through our profit-share model: 18–22% of incremental profits (capped at $35K/month). No hidden fees, no retainer line item. To field a full dedicated team, we must drive at least $5K/month in profit share. This ensures growth covers the baseline team cost. You’re never charged blindly — our incentives stay fully aligned with yours."
        }
      ]
    },
    {
      title: "If Growth Stalls",
      description: [
        {
          text: "Growth is a two-way street. If we spot clear opportunities but the brand restricts scaling (like underfunding ads, delays, or blocked initiatives), we may charge a $4,000/month minimum fee. This ensures continued commitment while your brand works through the hurdles."
        }
      ]
    },
    {
      title: "Security Deposit",
      description: [
        {
          text: "We require a $15,000 security deposit upfront, credited back through profit share over time (usually within 3 months). This is a mutual trust mechanism to protect both parties and ensure honest collaboration."
        }
      ]
    },
    {
      title: "Incubation vs Acceleration",
      description: [
        {
          text: "Acceleration: For startups under $50K/month aiming to reach $100K/month — includes consulting, mentoring, phased execution. Incubation: For brands positioned to grow from $100K/month toward $400K/month — includes full team deployment across marketing, creative, tech, retention, and more."
        }
      ]
    },
    {
      title: "Fees Outside Profit Share",
      description: [
        {
          text: "Most growth work — design, marketing, dev, CRO, CXO — is covered in our model. Large outside-scope projects (e.g. full rebrands, new platforms) are only proposed if they promise 3X ROI in 6–8 months. MOTIF® also leads one full redesign per year. No hidden extras."
        }
      ]
    },
    {
      title: "Why Not Data-Driven?",
      description: [
        {
          text: "Because brands aren’t built on dashboards — they’re built on emotion, instinct, and art. MOTIF® uses data to validate and scale what already works, not to drive soulless, short-term decisions. Great brands lead with vision — we make sure yours does too."
        }
      ]
    },
    {
      title: "Post-$400K/Month Plan",
      description: [
        {
          text: "MOTIF® scales brands to $400K/month. Beyond that, brands may need larger infrastructure. We help you build or transition to a next-level team. Investment partnerships may also be explored depending on interest."
        }
      ]
    },
    {
      title: "How MOTIF® Is Different",
      description: [
        {
          text: "MOTIF® isn’t an agency — it’s the team your brand wishes it had. No hourly billing, no vendor mindset. You’ll get designers, strategists, developers, marketers, technologists, and artists working like your in-house team. We’re the Robin to your Batman — in the trenches, focused on results."
        }
      ]
    },
    {
      title: "Brand Refresh Cycle",
      description: [
        {
          text: "We lead a full redesign (website, apps, emails, touchpoints) every 12 months based on real data and current trends. Rarely do we scope additional brand refreshes unless necessary, and it’s always transparent."
        }
      ]
    },
    {
      title: "Use of AI & GPT",
      description: [
        {
          text: "Yes, we use AI tools like GPT for personalization and data analysis. But AI is just that — a tool. Human creativity, judgment, and experience remain our strongest assets. AI helps us and you move faster and smarter."
        }
      ]
    },
    {
      title: "Brand Fit",
      description: [
        {
          text: "If you want long-term partners, value honesty, and aim to build something lasting — we might be a great fit. If you want quick wins, short-term hype, or aren’t ready to invest in growth — we’re not for you. This is a two-way qualification. If there’s fit, apply for a consultation."
        }
      ]
    },
    {
      title: "Not a Fit?",
      description: [
        {
          text: "If we don’t believe we can add real value, we’ll say so. Fit matters more than selling services. Our consultation and 90-day roadmap ensure alignment before any long-term partnership."
        }
      ]
    },
    {
      title: "How to Start",
      description: [
        {
          text: "Book a free strategy session. We’ll assess fit — bluntly. If it’s not right, we’ll tell you."
        }
      ]
    },
    {
      title: "Blocking Growth",
      description: [
        {
          text: "If your brand slows us down (blocking profitable scaling, missing deadlines, etc.), we charge a $4,000/month minimum to keep the team supported. Growth requires partnership — we can’t do it alone."
        }
      ]
    }
  ]
}

const Faqs = () => {
  return (
    <div>
      <section className='layout_normal pt-20 pb-[15%] lg:pt-40 pb-20 w-[90%] md:w-[90%] lg:w-[70%]' >
                <FaqsAll
                    description={motif_faq.description}
                    title="IN FOCUS (FAQs)"
                    accordionList={motif_faq.accordionList}
                />
      </section>
    </div>
  );
};

export default Faqs;
