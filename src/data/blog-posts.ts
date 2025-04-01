
import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Benefits of Organic Farming',
    excerpt: 'Discover how organic farming practices contribute to environmental sustainability and better health outcomes.',
    content: `
      <p>Organic farming has gained significant popularity in recent years as consumers become more conscious about the food they consume and its impact on the environment.</p>
      
      <p>Unlike conventional farming methods that rely heavily on synthetic fertilizers and pesticides, organic farming emphasizes the use of natural processes and substances. This approach not only helps preserve soil health and biodiversity but also produces food that's free from potentially harmful chemicals.</p>
      
      <h2>Environmental Benefits</h2>
      <p>Organic farming practices significantly reduce pollution and conserve water. By avoiding synthetic pesticides and fertilizers, organic farmers prevent these chemicals from running off into waterways and harming aquatic ecosystems.</p>
      
      <p>Additionally, organic farming methods typically involve crop rotation and cover cropping, which help improve soil structure and fertility naturally. This leads to better carbon sequestration, making organic farming a valuable tool in the fight against climate change.</p>
      
      <h2>Health Benefits</h2>
      <p>Research suggests that organically grown foods may contain higher levels of certain nutrients and antioxidants compared to conventionally grown foods. Moreover, by eliminating synthetic pesticides from the growing process, organic products reduce consumers' exposure to these chemicals.</p>
      
      <p>While more studies are needed to fully understand the health implications of choosing organic over conventional foods, many consumers report that organic produce often tastes better and fresher.</p>
      
      <h2>Supporting Local Communities</h2>
      <p>Many organic farms are small to medium-sized operations run by families or local cooperatives. By purchasing organic products, consumers often support these local businesses, contributing to the economic vitality of rural communities.</p>
      
      <p>At Orgifarm, we're committed to sustainable, organic farming practices that benefit both our customers and the planet. We believe that by working in harmony with nature, we can produce nutritious food while preserving the environment for future generations.</p>
    `,
    author: 'Team Orgifarm',
    date: '2024-06-15',
    coverImage: '/img/IMG-20250326-WA0005.jpg',
    slug: 'benefits-of-organic-farming',
    tags: ['organic', 'sustainability', 'environment']
  },
  
  {
    id: '2',
    title: 'Understanding Food Labels: Organic vs. Natural',
    excerpt: 'Confused by food labels? Learn the difference between "organic" and "natural" claims on food products.',
    content: `
      <p>When shopping for groceries, you're likely to encounter numerous products labeled as "organic" or "natural." While these terms might seem similar, they have very different meanings and standards behind them.</p>
      
      <h2>"Organic" - A Regulated Term</h2>
      <p>The term "organic" is strictly regulated by governmental bodies in most countries. In the United States, for example, the USDA oversees organic certification, ensuring that products labeled as organic meet specific standards.</p>
      
      <p>For a food product to be certified organic:</p>
      <ul>
        <li>It must be grown without synthetic pesticides, herbicides, or fertilizers</li>
        <li>No genetically modified organisms (GMOs) can be used</li>
        <li>For animal products, animals must be raised without antibiotics or growth hormones and have access to the outdoors</li>
        <li>Organic farmers must use renewable resources and conservation practices</li>
      </ul>
      
      <p>Different labels indicate various levels of organic content:</p>
      <ul>
        <li>"100% Organic": Contains only organically produced ingredients</li>
        <li>"Organic": Contains at least 95% organic ingredients</li>
        <li>"Made with Organic Ingredients": Contains at least 70% organic ingredients</li>
      </ul>
      
      <h2>"Natural" - A Loosely Defined Term</h2>
      <p>Unlike "organic," the term "natural" has much less regulatory oversight. Generally, "natural" suggests that a product contains no artificial ingredients, preservatives, or synthetic substances. However, this doesn't address how the ingredients were grown or processed.</p>
      
      <p>A "natural" product:</p>
      <ul>
        <li>May still contain pesticides or GMOs</li>
        <li>May come from animals treated with hormones or antibiotics</li>
        <li>Doesn't necessarily employ sustainable farming practices</li>
      </ul>
      
      <h2>Making Informed Choices</h2>
      <p>Understanding these distinctions allows you to make more informed decisions about the food you purchase. If avoiding synthetic chemicals and supporting sustainable farming practices is important to you, certified organic products are your best choice.</p>
      
      <p>However, if your primary concern is avoiding artificial additives and preservatives, products labeled as "natural" might meet your needs, though they may not address other aspects of food production that matter to you.</p>
      
      <p>At Orgifarm, we believe in transparency. All our products are clearly labeled so you can understand exactly what you're buying and make choices aligned with your values and health goals.</p>
    `,
    author: 'Team Orgifarm',
    date: '2024-06-05',
    coverImage: '/img/IMG-20250326-WA0007.jpg',
    slug: 'understanding-food-labels',
    tags: ['organic', 'food labels', 'consumer education']
  },
  {
    id: '3',
    title: 'The Importance of Sustainable Agriculture',
    excerpt: 'Explore the significance of sustainable agriculture in ensuring food security and protecting the environment.',
    content: `
      <p>Sustainable agriculture is a holistic approach to farming that focuses on producing food in a way that is environmentally friendly, economically viable, and socially responsible. It aims to meet the needs of the present without compromising the ability of future generations to meet their own needs.</p>
      
      <h2>Why Sustainable Agriculture Matters</h2>
      <p>As the global population continues to grow, the demand for food increases. However, conventional farming practices often lead to soil degradation, water scarcity, and loss of biodiversity. Sustainable agriculture seeks to address these challenges by promoting practices that enhance soil health, conserve water, and protect ecosystems.</p>
      
      <p>By using techniques such as crop rotation, cover cropping, and integrated pest management, sustainable farmers can produce food while minimizing their environmental impact. This not only helps preserve natural resources but also contributes to healthier ecosystems and communities.</p>
      
      <h2>Benefits of Sustainable Agriculture</h2>
      <ul>
        <li><strong>Environmental Protection:</strong> Sustainable practices reduce pollution, conserve water, and promote biodiversity.</li>
        <li><strong>Economic Viability:</strong> By focusing on local markets and sustainable practices, farmers can create resilient economies.</li>
        <li><strong>Social Responsibility:</strong> Sustainable agriculture supports fair labor practices and promotes community well-being.</li>
      </ul>
      
      <p>At Orgifarm, we are committed to sustainable agriculture. Our farming practices prioritize environmental health and community welfare, ensuring that we produce high-quality organic products while protecting our planet for future generations.</p>
    `,
    author: 'Team Orgifarm',
    date: '2024-06-10',
    coverImage: '/img/Sustainable_Agriculture.png',
    slug: 'sustainable-agriculture',
    tags: ['sustainable', 'agriculture', 'environment']
  }
];


export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};
