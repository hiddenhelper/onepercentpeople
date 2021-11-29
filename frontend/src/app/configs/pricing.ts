export default {
  plans: [
    {
      id: 'employer',
      title: 'Free',
      subtitle: 'Free for the first posting',
      header: 'Post a job',
      icon: '/assets/images/icons/realistic/briefcase.png',
      featured: false,
      pricing: { monthly: 0, yearly: 0 },
      cta: {
        link: "/get-started/employer",
        text: "Hire Top Talent"
      },
      features: [
        { text: 'Only takes a few minutes', value: true },
        { text: 'View talent interview videos and written responses', value: true },
        { text: '95% of employers are happy with their first match', value: true },
      ],
    },
    // {
    //   id: 'contractor',
    //   title: '$50<sup>.00</sup>',
    //   subtitle: 'Per Month',
    //   header: 'Contractor',
    //   icon: '/assets/images/icons/realistic/shoe.png',
    //   featured: true,
    //   pricing: { monthly: 50, yearly: 650 },
    // cta: {
    //   link: "/get-started/employer",
    //   text: "Hire Top Talent"
    // },
    //   features: [
    //     { text: 'Control when, where, and how you work', value: true },
    //     { text: 'Automatically matched to a great employer', value: true },
    //     { text: 'Minimal fees compared to other platforms', value: true },
    //     { text: 'Invoicing, legal, and all other aspects of the contract covered', value: true },
    //   ],
    // },
    {
      id: 'talent',
      title: 'Free',
      subtitle: 'Always free',
      header: 'Work',
      icon: '/assets/images/icons/realistic/shirt-and-tie.png',
      featured: false,
      pricing: { monthly: 650, yearly: 7800 },
      cta: {
        link: "/get-started/talent",
        text: "Find A Job"
      },
      features: [
        { text: 'Find great employers', value: true },
        { text: 'Zero fees', value: true },
        { text: 'Work for a great company abroad and receive additional benefits and stability', value: true },
      ],
    },
  ],
};
