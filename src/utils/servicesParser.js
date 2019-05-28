export default parseServicesResponse = (response) => {
    const categories = response.map(category => (
        {
            key: category.id+'',
            title: category.name,
            icon: category.image
        }
    ));
    const services = response.map(category => (
        {
            key: category.id,
            services: category.Services.map(service => ({
                id: service.id,
                serviceName: service.name,
                serviceImage: service.image
            })),
        }
    ));
    return { categories, services }
}