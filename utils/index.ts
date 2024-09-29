interface MenuItem {
  title: string;
  path: string;
  options?: { name: string, path: string, filters?: { [key: string]: string } }[];
}

const menuItems: MenuItem[] = [
  {
    title: "Buy",
    path: "/all-property",
    options: [
      { name: "See all properties for sale", path: "/all-property", filters: { purpose: "sale" } },
      { name: "Apartments for sale", path: "/all-property", filters: { purpose: "sale", propertyType: "apartment" } },
      { name: "Villas for sale", path: "/all-property", filters: { purpose: "sale", propertyType: "villa" } },
      { name: "Residential Properties for sale", path: "/all-property", filters: { purpose: "sale", classification: "residential" } },
      { name: "Buyer's Guide", path: "/buyGuid" },
      { name: "Sales's Guide", path: "/saleGuid" }
    ]
  },
  {
    title: "Rent",
    path: "/rent",
    options: [
      { name: "See properties for rent", path: "/all-property", filters: { purpose: "rent" } },
      { name: "Apartments for rent", path: "/all-property", filters: { purpose: "rent", propertyType: "apartment" } },
      { name: "Villas for rent", path: "/all-property", filters: { purpose: "rent", propertyType: "villa" } },
      { name: "Residential Properties for rent", path: "/all-property", filters: { purpose: "rent", classification: "residential" } },
      { name: "Tenants Guide", path: "/renantsGuid" }
    ]
  },

  // {
  //   title: "Services",
  //   path: "/services",
  //   options: [
  //     { name: "Property Management", path: "/property-services/property-management" },
  //     { name: "Short Term Rentals", path: "/property-services/short-term-rentals" }
  //   ]
  // },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "More",
    path: "/more",
    options: [
      { name: "Mortgages", path: "/mortgages" },
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Real Estate Guides", path: "/real-estate-guid" },
    ]
  }
];

export default menuItems;
