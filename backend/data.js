import bcrypt from 'bcryptjs';
import User from './usermodel';

const data = {
  users: [
    {
      _id: '1',
      username: 'jaeden',
      email: 'jaeden@hotmail.com',
      password: '12345',
    },
  ],
  products: [
    {
      _id: '1',
      name: 'Zoro Hoodie',
      slug: 'Zoro-Sweater',
      category: 'Sweaters',
      image: '/images/P1.jpg',
      price: 99.99,
      countInStock: 10,
      brand: 'PortalFashion',
      rating: 1,
      numReviews: 4,
      description: 'Wano Zoro Embroidarded Sweater: Two Tone Purple',
    },
    {
      _id: '2',
      name: 'Marco Hoodie',
      slug: 'Marco-Sweater',
      category: 'Sweaters',
      image: '/images/P2.jpg',
      price: 99.99,
      countInStock: 10,
      brand: 'PortalFashion',
      rating: 4.5,
      numReviews: 10,
      description: 'Marco Embroidarded Sweater: Light-Blue',
    },
    {
      _id: '3',
      name: 'Trafalger Law Shirt',
      slug: 'Trafalger-Law-Sweater',
      category: 'T-Shirts',
      image: '/images/P3.jpg',
      price: 35.99,
      countInStock: 10,
      brand: 'PortalFashion',
      rating: 4.0,
      numReviews: 10,
      description: 'Trafalger Law Embroidarded T-Shirt: Brown',
    },
    {
      _id: '4',
      name: 'Shanks Law Shirt',
      slug: 'Shanks-T-Shirts',
      category: 'T-Shirts',
      image: '/images/P4.jpg',
      price: 35.99,
      countInStock: 10,
      brand: 'PortalFashion',
      rating: 4.5,
      numReviews: 14,
      description: 'Shanks Embroidarded T-Shirts: Red',
    },
  ],
};
export const seedUsers = async () => {
  try {
    // Hash passwords before creating users
    const hashedPassword = await bcrypt.hash('12345', 10);

    // Create a new user using the User model
    await User.create({
      username: 'jaeden',
      email: 'jaeden@hotmail.com',
      password: hashedPassword,
    });

    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

export default data;
