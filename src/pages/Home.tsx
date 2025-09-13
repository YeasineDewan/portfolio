import React from 'react';
import Typewriter from 'typewriter-effect'; // Importing typewriter effect
import { Button, Card, CardBody, CardHeader, Image } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
<section className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h1 className="text-5xl font-bold mb-4">Md. Yeasine Dewan Shawon</h1>
            <p className="text-xl mb-8">
              I'm a <span className="inline-block">
                <Typewriter
                  options={{
                    strings: ["Full Stack Developer", "Pentester", "Freelancer"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
              
            </p>
            <p className="text-xl mb-8 max-w-xl">
              I design and build production‑ready web and mobile apps with a strong focus on cybersecurity, performance and delightful UX.
            </p>
            <div className="flex space-x-4">
<Button as={Link} to="/projects" className="project-button">
                View Projects
              </Button>
<Button as={Link} to="/services" className="project-button">
                Hire Me
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="md:w-1/2"
          >
            <Image
              loading="lazy"
              src="https://img.heroui.chat/image/ai?w=600&h=400&u=developer-workspace"
              alt="Developer Workspace"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-semibold mb-8 text-center">What I Deliver</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Web Development', icon: 'lucide:code', details: 'Next‑gen, responsive websites and full‑stack apps with modern tooling.' },
              { name: 'Penetration Testing', icon: 'lucide:shield', details: 'Manual pentesting, secure coding reviews and actionable remediation.' },
              { name: 'App Development', icon: 'lucide:smartphone', details: 'Cross‑platform mobile apps with robust architecture and CI/CD.' },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              >
<Card className="bg-content2 card-hover">
                  <CardBody className="flex flex-col items-center text-center p-6">
                    <Icon icon={skill.icon} className="text-blue-500 mb-4" width="48" height="48" />
                    <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                    <p className="text-sm text-foreground-600">{skill.details}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-center">Selected Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Certified Ethical Hacker (CEH)', icon: 'lucide:award' },
              { name: 'AWS Certified Security - Specialty', icon: 'lucide:badge-check' },
            ].map((cert) => (
              <Card key={cert.name} className="bg-content1 card-hover">
                <CardBody className="flex items-center p-6">
                  <Icon icon={cert.icon} className="text-blue-500 mr-4" width="36" height="36" />
                  <div>
                    <h3 className="text-lg font-semibold">{cert.name}</h3>
                    <p className="text-sm text-foreground-500">Issued by: Certification Authority</p>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold mb-8 text-center">Recent Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Securing Your Web Application', image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=web-security' },
              { title: 'Latest Trends in Cybersecurity', image: 'https://img.heroui.chat/image/ai?w=400&h=200&u=cybersecurity-trends' },
            ].map((post) => (
              <Card key={post.title} className="bg-content1 card-hover">
                <CardHeader className="p-0">
                  <Image
                    loading="lazy"
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardBody className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <Button as={Link} to="/blog" color="primary" variant="flat" size="sm">
                    Read More
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Home;


