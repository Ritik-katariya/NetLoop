import React from 'react';
import { useGetNetworkQuery } from '../../redux/api/network';
import { useParams } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import Search from '../Shared/Search/Search';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Footer from './Footer';
import { Avatar } from '@nextui-org/react';

const NetworkProfile = () => {
  const { id } = useParams();
  const { data: networkData } = useGetNetworkQuery(id);

  return (
    <div className='bg-gray-100 min-h-screen '>
      <Header />
      <div className='max-w-6xl mx-auto p-4 space-y-10 shadow-lg bg-white rounded-md mt-20 -mb-14'>
        {/* Cover Image */}
        <div className='relative mb-28'>
          <img src={networkData?.cover} alt='Cover' className='w-full h-80 object-cover rounded-md' />
          <div className='absolute -bottom-24 left-1/2 transform -translate-x-1/2'>
            <img src={networkData?.logo} alt='Logo' className='w-48 h-48 object-fill bg-white rounded-full border-4 border-white shadow-xl' />
          </div>
        </div>

        {/* Institute Name & Address */}
        <div className='text-center'>
          <h1 className='text-5xl font-bold text-primary'>{networkData?.name}</h1>
          <p className='text-lg text-gray-600'>{networkData?.address}, {networkData?.pincode}</p>
        </div>

        {/* Mission & Vision Section */}
        <div className='bg-gray-50 p-6 rounded-md shadow-md'>
          <h2 className='text-2xl font-semibold mb-4 text-center '>Mission & Vision</h2>
          <p className='text-gray-600 leading-relaxed text-center max-w-3xl mx-auto'>
            {networkData?.mission || "Our mission is to empower students and professionals with knowledge and skills to excel in their careers."}
          </p>
        </div>

        {/* Key Highlights */}
        <div className='text-center'>
          <h3 className='text-2xl font-semibold mb-4'>Key Highlights</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {["Innovative Curriculum", "Top-notch Faculty", "Cutting-edge Research"].map((highlight, index) => (
              <div key={index} className='bg-gray-50 p-4 rounded-md shadow-md '>
                <h4 className='text-lg font-semibold text-teal-400'>{highlight}</h4>
                <p className='text-gray-600 text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cluster Swiper */}
        <div className='mt-8 text-center'>
          <h3 className='text-xl font-semibold mb-8 pb-2 border-b-2'>Our Clusters</h3>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={4}
            className='w-full'
          >
            {[1, 2, 3, 4, 5].map((_, index) => (
              <SwiperSlide key={index} className='flex justify-center'>
                <img
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe_OlHEe2L-0VtexCxjIV5tc0dLor3wd57Yg&s`}
                  alt={`Cluster ${index + 1}`}
                  className='w-24 h-24 rounded-full border-2 border-gray-300 shadow-md'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Gallery Section */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-6'>
          {['Moksha 4.0', 'Aayam 4.0', 'Others', 'Gallery 1', 'Gallery 2', 'Gallery 3'].map((title, index) => (
            <div key={index} className='relative w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg shadow-lg'>
              <img src={`https://www.akamai.com/site/im-demo/perceptual-standard.jpg?imbypass=true`} alt={title} className='w-full h-full object-cover rounded-lg absolute z-0'
              />
              <span className='text-xl font-bold text-white bg-black bg-opacity-50 px-4 py-1 rounded z-10'>{title}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className='mt-10 text-center'>
          <h3 className='text-2xl font-semibold mb-4'>What People Say</h3>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={1}
            className='w-full max-w-xl mx-auto'
          >
            {[{"testimonial":"Excellent place to learn!","name":"Ritik Kumar"},{ "testimonial":"Amazing faculty and resources.","name":"Tony Stark"},{ "testimonial":"Highly recommend for students!","name":"Odin"}].map((data, index) => (
              <SwiperSlide key={index} className='p-6 bg-gray-50 rounded-md shadow-md'>
                <p className='text-gray-700 italic'>"{data.testimonial}"</p>
                <p className='text-gray-600 text-sm mt-2'>{data.name}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Sidebar */}
        <div className='flex flex-col md:flex-row gap-6 mt-10'>
          <div className='bg-gray-50 p-4 w-full md:w-1/3 rounded-md shadow-lg'>
            {/* <Search /> */}
            <h3 className='text-xl font-semibold mt-4'>Members ({networkData?.members?.length || 0})</h3>
            <div className='space-y-3 mt-3'>
              {networkData?.members?.map((member, index) => (
                <div key={index} className='flex items-center gap-4 p-2 bg-white rounded-md shadow'>
                  <Avatar src={member?.profile?.img} alt='Avatar' className='w-10 h-10 rounded-full' />
                  <div>
                    <p className='font-medium'>{member?.name}</p>
                    <p className='text-sm text-gray-500'>{member?.status ? 'Active' : 'Inactive'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      <Footer data={networkData}/>
    </div>
  );
};

export default NetworkProfile;
