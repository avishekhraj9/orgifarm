
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
    title: 'Seasonal Eating: Why It Matters',
    excerpt: 'Learn why eating seasonally is better for your health, the environment, and your taste buds.',
    content: `
      <p>In today's globalized world, we've become accustomed to having access to virtually any fruit or vegetable year-round. However, this convenience comes at a cost to both our health and the environment.</p>
      
      <p>Eating seasonally means consuming foods that are naturally grown and harvested during their appropriate seasons in your local area. This practice offers numerous benefits that extend beyond just fresher taste.</p>
      
      <h2>Peak Nutrition</h2>
      <p>Fruits and vegetables contain the most nutrients when they're allowed to ripen naturally and are consumed shortly after harvest. Seasonal produce doesn't need to travel long distances or sit in storage for extended periods, which can lead to nutrient degradation.</p>
      
      <p>Studies have shown that produce can lose up to 30% of its nutrients within three days of harvesting. By choosing seasonal options, you're more likely to get the maximum nutritional benefit from your food.</p>
      
      <h2>Environmental Impact</h2>
      <p>Out-of-season produce often travels thousands of miles before reaching your plate, contributing significantly to carbon emissions. Additionally, growing crops in artificial conditions often requires more resources like water, energy, and sometimes chemical inputs to mimic natural growing conditions.</p>
      
      <p>By choosing seasonal foods, you're supporting farming practices that work with nature's cycles rather than against them, reducing your overall environmental footprint.</p>
      
      <h2>Supporting Local Economy</h2>
      <p>Seasonal eating often goes hand-in-hand with buying locally. When you purchase seasonal produce from local farmers, you're helping to sustain local agriculture and keep money within your community.</p>
      
      <h2>Enhanced Flavor</h2>
      <p>Perhaps the most immediately noticeable benefit of seasonal eating is the superior taste. Produce that's harvested at its peak and hasn't traveled far simply tastes better. Think of the difference between a tomato picked ripe from the vine in summer versus one purchased at a supermarket in winter.</p>
      
      <p>At Orgifarm, we follow nature's calendar and offer the freshest seasonal products throughout the year. We believe that working with the seasons rather than against them results in better food for our customers and a healthier planet for all.</p>
    `,
    author: 'Team Orgifarm',
    date: '2024-06-10',
    coverImage: '/img/IMG-20250326-WA0011.jpg',
    slug: 'seasonal-eating-why-it-matters',
    tags: ['seasonal', 'local', 'nutrition']
  },
  {
    id: '3',
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
  }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};
