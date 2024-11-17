// listingData.ts
import { FaHome, FaPen, FaCheckCircle, FaUpload } from 'react-icons/fa';

export const reasons = [
  { id: 1, description: 'High Quality Service' },
  { id: 2, description: 'Experienced Team' },
  { id: 3, description: 'Competitive Pricing' },
];

export const listingPropSteps = [
  {
    step_number: 'Step 1',
    title: 'Contact Us',
    description: 'Reach out to our team to discuss your property and goals.',
    icon: FaHome,
  },
  {
    step_number: 'Step 2',
    title: 'Property Assessment',
    description: 'We conduct a thorough evaluation to determine the best listing price.',
    icon: FaPen,
  },
  {
    step_number: 'Step 3',
    title: 'Listing Agreement',
    description: "Sign a listing agreement so we can officially represent your property.",
    icon: FaCheckCircle,
  },
  {
    step_number: 'Step 4',
    title: 'Marketing & Sale',
    description:
      'We launch a comprehensive marketing campaign to attract buyers, followed by negotiation and closing.',
    icon: FaUpload,
  },
];

export const listingPropData = [
  {
    id: 'brokerage_agency',
    title: 'Why list your property with a real estate brokerage agency?',
    content:
      'Listing with a professional real estate brokerage agency gives your property maximum exposure to potential buyers. We utilize cutting-edge marketing strategies, extensive networks, and expert negotiation skills to ensure you get the best deal possible, all while providing a hassle-free experience.',
  },
  {
    id: 'prop_consultant',
    title: 'Why do you need a property consultant?',
    content:
      'A property consultant provides expert advice, market insights, and personalized service to help you make informed decisions. Whether you\'re buying, selling, or renting, a consultant will guide you through the process, ensuring that your property needs are met efficiently and effectively.',
  },
];

export const AboutBuying = [
    { id: 'entitled_Mortgage', title: 'Is it possible for a foreigner to purchase property in Dubai?', content: "Yes, foreigners can buy property in Dubai, particularly in designated freehold areas where they can own property outright." },
    { id: 'guarantees', title: 'Can a foreigner have 100% ownership of property in Dubai?', content: "Yes, in freehold areas, foreigners can have 100% ownership of the property, giving them full rights to sell, lease, or rent the property." },
    { id: 'guarantees', title: 'Is it a good idea to invest in real estate in Dubai?', content: "Investing in real estate in Dubai is generally considered a good idea due to the city’s growing economy, high ROI, and strong rental yields. The market is well-regulated, offering security to investors." },
    { id: 'guarantees', title: 'Can I get a visa if I own a property in Dubai?', content: "Yes, property owners in Dubai can be eligible for a residency visa, provided the property meets the minimum value requirement and is located in a designated area." },
    { id: 'guarantees', title: 'Is it possible to purchase a property in Dubai as a company?', content: "Yes, companies can purchase property in Dubai. The process and regulations may vary depending on whether the company is local or foreign-owned." },
    
  ];
  
  
  
  export const buySteps = [
      { number: 1, title: "Understand the Market", description: "Research the Dubai property market to understand the trends and property types available." },
      { number: 2, title: "Set a Budget", description: "Determine your budget, including mortgage eligibility and additional costs like registration fees." },
      { number: 3, title: "Choose the Right Property", description: "Work with a real estate agent to find a property that meets your needs and investment goals." },
      { number: 4, title: "Complete the Purchase", description: "Once you’ve found the right property, your agent will help you navigate the legal and financial processes to finalize the purchase."},
    ];

    export const AboutRenting = [
        { id: 'foreigner-rent', title: 'Is it possible for a foreigner to rent property in Dubai? ', content: "Yes, foreigners can rent property in Dubai. There are no restrictions on renting for non-UAE nationals, making it a popular option for expatriates." },
        { id: 'documents-required', title: 'What documents are required to rent a property in Dubai? ', content: "Typically, you will need a valid passport, residency visa, Emirates ID, and proof of income (such as salary certificates or bank statements) to rent a property in Dubai." },
        { id: 'negotiate-rent-landlord', title: 'Can I negotiate the rent price with the landlord? ', content: "Yes, rent prices are often negotiable. You can discuss your budget and try to reach an agreement that works for both you and the landlord." },
        { id: 'maintenance-issues', title: 'What should I do if there are maintenance issues? ', content: "Most lease agreements include terms for maintenance responsibilities. Typically, minor repairs are handled by the tenant, while major issues are addressed by the landlord. Report any problems to your landlord or property manager as soon as they arise." },
        { id: 'renew-lease', title: 'Can I renew my lease after it expires?', content: "Yes, lease renewal is common in Dubai. Typically, landlords will inform you of their intention to renew or not at least 90 days before the lease expiration. You can negotiate new terms or continue under the existing agreement." },
        { id: 'breaking-lease', title: 'What are the penalties for breaking a lease early? ', content: "If you need to break your lease early, review your lease agreement for the specific terms and conditions. Penalties may include paying additional rent as a penalty. It’s advisable to discuss this with your landlord in advance." },
        
      ];

      export const rentingSteps = [
        { number: 1, title: "Research the Market", description: "Start by understanding the Dubai rental market, including current rental rates, popular neighborhoods, and the types of properties available. This will help you set realistic expectations and find a property that fits your needs and budget." },
        { number: 2, title: "Set a Budget", description: "Determine how much you can afford to spend on rent each month. Consider additional costs such as utility bills, maintenance fees, and security deposits." },
        { number: 3, title: "Find the Right Property", description: "Work with a real estate agent to explore different rental options. Agents can provide insights into the best neighborhoods, property types, and amenities that match your requirements." },
        { number: 4, title: "View Properties", description: "Schedule viewings of the properties you're interested in. Pay attention to the condition of the property, available facilities, and the surrounding area. Ensure that the property meets your living standards and lifestyle needs. "},
        { number: 5, title: "Negotiate the Lease", description: "Once you’ve found the right property, your agent will help you navigate the legal and financial "},
        { number: 6, title: "Sign the Lease Agreement", description: "Carefully review the lease agreement before signing. Ensure it includes all agreed-upon terms and conditions, such as the rent amount, payment schedule, and maintenance responsibilities."},
        { number: 7, title: "Register the Tenancy Contract", description: "In Dubai, it is mandatory to register the tenancy contract with the Dubai Land Department’s Ejari system. This legalizes the contract and protects the rights of both the tenant and the landlord."},
        { number: 8, title: "Move-In and Settle", description: "Once the lease is signed and registered, you can move into your new home. Take note of the property’s condition at the time of moving in and report any issues to the landlord immediately."},
      ];

      export const AboutSelling = [
        { id: 'entitled_Mortgage', title: 'Is selling property in Dubai complicated?', content: "Selling property in Dubai can be straightforward, especially when working with a knowledgeable real estate agent. They handle the complexities of the market, paperwork, and negotiations, making the process smoother for you." },
        { id: 'ROI', title: 'How can I calculate the ROI?', content: "ROI (Return on Investment) is calculated by dividing the net profit from the sale by the total investment cost, then multiplying by 100 to get a percentage. A real estate agent can help you estimate ROI based on current market conditions." },
        { id: 'value_of_property_market', title: 'How can I know the real value of my property in the market?', content: "The real value of your property can be determined through a professional appraisal or market analysis. A real estate agent can provide you with a comparative market analysis (CMA) to see how similar properties are priced." },
        { id: 'value_of_property_dubai', title: 'How can I increase the market value of my property in Dubai?', content: "To increase market value, consider making upgrades like modernizing the kitchen or bathrooms, enhancing curb appeal, and ensuring the property is well-maintained. Strategic renovations and good staging can significantly boost value." },
        { id: 'sell_without_agent', title: 'Can you sell a property in Dubai without an agent?', content: "Yes, you can sell a property without an agent, but it requires extensive knowledge of the market, legal processes, and effective marketing strategies. Using an agent ensures that you maximize your property’s exposure and secure the best deal." },
        { id: 'time_to_sell', title: 'Is now a good time to sell property in Dubai?', content: "Dubai’s real estate market is dynamic, and the best time to sell depends on various factors, including market trends, economic conditions, and your personal circumstances. Consult with a real estate expert to determine if now is the right time for you." },
        { id: 'sell_mortgaged', title: 'How to sell mortgaged property in Dubai?', content: "Selling a mortgaged property involves getting a liability letter from your bank and settling the outstanding mortgage balance. Your agent can guide you through the process, ensuring all legal requirements are met." },
        { id: 'secure_mortgage', title: 'How to secure your mortgage in sales?', content: "To secure your mortgage, ensure that your finances are in order, and get pre-approval from your lender. This strengthens your position as a buyer and can expedite the purchasing process." },
        { id: 'sell_mortgaged', title: 'Is it possible for me to sell my mortgaged property?', content: "Yes, you can sell a mortgaged property. The sale proceeds will first go towards settling the outstanding mortgage, and any remaining balance will be paid to you." },
        
      ];

      export const salingSteps = [
        { number: 1, title: "Determine Market Value", description: "Start by getting a professional property valuation." },
        { number: 2, title: "Prepare Your Property", description: "Make necessary repairs and consider staging to increase appeal." },
        { number: 3, title: "List & Market", description: "Choose a reputable real estate agent to guide you." },
        { number: 4, title: "Negotiate Offers", description: "Work with a real estate agent to list and market your property effectively." },
        { number: 5, title: "Final Sale", description: " Complete the paperwork, including transferring ownership, and finalize the sale." },
      ];


      export const mortgageSteps = [
        { step_number: 'Step 1', title: 'Valuation Visit', description: 'Property valuation within 24 hours, backed by data-driven analysis.', icon: FaHome  },
        { step_number: 'Step 2', title: 'Review Details', description: 'Our team reviews the details and provides feedback.', icon: FaPen  },
        { step_number: 'Step 3', title: 'Finalize Listing', description: 'Finalize the listing and get your property online.', icon: FaCheckCircle  },
        { step_number: 'Step 4', title: 'Monitor Performance', description: 'Track the performance and manage inquiries.', icon: FaUpload  },
      ];

      export const MortgageData = [
        { id: 'entitled_Mortgage', title: 'Am I entitled to a mortgage?', content: "Eligibility for a mortgage in Dubai depends on various factors, including your income, employment status, credit history, and residency status. Both UAE nationals and expatriates can apply for a mortgage, but the criteria and terms may differ." },
        { id: 'guarantees', title: 'What guarantees do you have for a mortgage?', content: "When you secure a mortgage, the property itself typically acts as collateral. This means that the lender holds the title deed until the loan is fully paid. In addition, lenders may require a down payment, which usually ranges from 20% to 25% of the property’s value for expatriates and 15% for UAE nationals." },
        
      ];

      
      export const MortReasons = [
    { id: 1, description: 'High Quality Service' },
    { id: 2, description: 'Experienced Team' },
    { id: 3, description: 'Competitive Pricing' },
    // Add more reasons as needed
  ];