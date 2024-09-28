// footerData.ts

export interface FooterOption {
  name: string;
  path: string;
  filters?: { [key: string]: string };
}

export interface FooterItem {
  title: string;
  options: FooterOption[];
}

const footerData: FooterItem[] = [
  {
    title: 'buy',
    options: [
      { name: 'Properties for Sale', path: "/all-property", filters: { purpose: "sale" } },
      { name: 'Guide to Buying', path: '/buyGuid' },
      { name: 'Signature Collection', path: '/all-property', filters : {featured: "true"} },
      { name: 'Mortgages', path: '/mortgages' },
      // { name: 'Property Management', path: '/property-management' },
    ],
  },
  {
    title: 'sell',
    options: [
      { name: 'List your Property', path: '/list-your-property' },
      { name: 'Guide to Selling', path: '/renantsGuid' },
      { name: 'Book a Valuation', path: '/list-your-property' },
    ],
  },
  {
    title: 'off plan',
    options: [
      { name: 'New Projects', path: '/projects' },
      { name: 'Best Dubai Communities', path: '/areas' },
    ],
  },
  {
    title: 'services',
    options: [
      { name: 'Properties for Rent', path: "/all-property", filters: { purpose: "rent" } },
      { name: 'Mortgages', path: '/mortgages' },
      { name: 'List Your Property', path: '/list-your-property' },
    ],
  },
  {
    title: 'about',
    options: [
      { name: 'About Us', path: '/about' },
      { name: 'Meet The Team', path: '/contact' },
      { name: 'Dubai News & Blog', path: '/blog' },
    ],
  },
];

export default footerData;
