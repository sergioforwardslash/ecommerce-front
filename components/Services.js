import Center from "./Center";

const Services = () => {
  const servicesData = [
    {
      name: "Embroidery",
      description: "High-quality embroidery for custom designs and logos.",
      image: "https://biseko-ecomm.s3.us-west-1.amazonaws.com/embroidery.png", // Replace with your image path
    },
    {
      name: "Screen Printing",
      description:
        "Exceptional screen printing services for vivid, durable designs.",
      image: "https://biseko-ecomm.s3.us-west-1.amazonaws.com/screen-printing.png", // Replace with your image path
    },
    {
      name: "Heat Seal",
      description:
        "Reliable heat seal applications for various materials and fabrics.",
      image: "https://biseko-ecomm.s3.us-west-1.amazonaws.com/heat-seal.png", // Replace with your image path
    },
    {
      name: "Letter Jackets",
      description:
        "Personalized letter jackets with exceptional attention to detail.",
      image: "https://biseko-ecomm.s3.us-west-1.amazonaws.com/letter-jackets.png", // Replace with your image path
    },
    {
      name: "Spirit Wear",
      description: "Show your team spirit with our customizable spirit wear.",
      image: "https://biseko-ecomm.s3.us-west-1.amazonaws.com/spirit-wear.png", // Replace with your image path
    },
    {
      name: "Promotional Items",
      description:
        "Branded promotional items to help your organization stand out.",
      image: "https://biseko-ecomm.s3.us-west-1.amazonaws.com/promotional-items.png", // Replace with your image path
    },
  ];

  return (
    <Center>
      <h1 className="section-title">Our Services</h1>
      <div className="services-section">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <img
              src={service.image}
              alt={service.name}
              className="service-image"
            />
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </Center>
  );
};

export default Services;
