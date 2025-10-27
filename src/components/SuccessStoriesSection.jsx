
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useDataStore from '@/store/dataStore';

const SuccessStoriesSection = () => {
  const { stories } = useDataStore();
  const [randomStories, setRandomStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Shuffle stories and take the first 2
    const shuffled = [...stories].sort(() => 0.5 - Math.random());
    setRandomStories(shuffled.slice(0, 2));
  }, [stories]);

  const handleStoryClick = (storyId) => {
    navigate(`/historia/${storyId}`);
  };

  return (
    <section className="py-20 bg-orange-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Historias que inspiran
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Antes y después de encontrar un hogar. Cada adopción cambia dos vidas para siempre.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {randomStories.map((story, index) => (
            <motion.div
              key={story.id}
              onClick={() => handleStoryClick(story.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer"
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="relative">
                  <img alt="Animal antes de ser adoptado" className="w-full h-48 object-cover rounded-lg" src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" />
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                    Antes
                  </div>
                </div>
                <div className="relative">
                  <img alt={story.image} className="w-full h-48 object-cover rounded-lg" src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" />
                  <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
                    Después
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <span className="absolute -left-3 -top-1 text-7xl font-serif text-orange-200 opacity-80">
                  “
                </span>
                <p className="relative text-gray-700 italic mb-4 ml-4">
                  {story.description}
                </p>
              </div>

              <div>
                <p className="font-bold text-gray-800">{story.title}</p>
                <p className="text-sm text-gray-500">Una historia de final feliz</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
