import coffeeVideo from '../assets/coffee-video.mp4'

const Story = () => {
  return (
    <div className='pt-10 pb-20'>
      <div className='flex justify-center items-center'>
        <div className='w-8 h-0.5 bg-gray-200'></div>
          <div className='mx-2'>OUR COFFEE STORY</div>
        <div className='w-8 h-0.5 bg-gray-200'></div>
      </div>

      <div className='flex flex-col lg:flex-row items-center justify-center'>
        <video className=' basis-1/3 w-[400px] h-[350px]'
        src={coffeeVideo}
        type='video/mp4'
        loop
        controls={false}
        muted
        autoPlay
        ></video>
     <div className='basis-1/3 m-10 lg:text-start text-center'>
       
         <div className='mb-6 text-3xl'>
           What is your most special coffee?
           </div>
         <div className='mb-6'>
           The French Press is a brewing method that comes closest to cupping. Cupping is the prescribed method by which coffee should be judged. Nothing separates the water from the coffee. To properly discover the flavours, it is best to drink the coffee this way. Everyone has their favourite brewing method.
         </div>
         <div className=''>
          <a href='#' className='text-coffee-400 font-medium relative after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-coffee-200'>Read the full Story</a></div>
     </div>
      </div>

      

    </div>
  )
}

export default Story