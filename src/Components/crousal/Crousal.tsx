import { useState } from 'react';

function CrousalImg() {
  const [imageSlider, setImageSlider] = useState(0);
  const data = [
    'https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1574169207511-e21a21c8075a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGltYWdlfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1628784230353-5bee16e2f005?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGltYWdlfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1613323593608-abc90fec84ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww',
  ];

  const previousSlide = () => {
    if (imageSlider === 0) {
      setImageSlider(data.length - 1);
    } else setImageSlider(imageSlider - 1);
  };

  const nextSlide = () => {
    const newIndex = imageSlider === data.length - 1 ? 0 : imageSlider + 1;
    setImageSlider(newIndex);
  };

  return (
    <div>
      <button onClick={previousSlide}>Previous</button>
      <img
        style={{ height: '300px', width: '400px' }}
        src={data[imageSlider]}
        alt="wallpaper"
      />
      <button onClick={nextSlide}>Next</button>
    </div>
  );
}

export default CrousalImg;
