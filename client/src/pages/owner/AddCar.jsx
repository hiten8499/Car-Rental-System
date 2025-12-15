import React, { useState } from 'react'
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';

const AddCar = () => {

  const currency=import.meta.env.VITE_CURRENCY;

  const [image,setImage]=useState(null);
  const [car,setCar]=useState({
    brand:'',
    model:'',
    year:0,
    pricePerDay:0,
    category:'',
    transmission:'',
    fuelType:'',
    seatingCapacity:0,
    location:'',
    description:''
  })

  const onSubmitHandler=(e)=>{
    e.preventDefault();
  }
  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <Title title="Add New Car" subTitle="Fill in details to list a new car for booking,
      including pricing,availability and specifications."/>

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
          {/* Car image */}

          <div className='flex items-center fap-2 w-full'>
            <label htmlFor="car-image">
              <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" 
              className='h-14 rounded cursor-pointer'/>
              <input type="file" id="car-image" accept='image/*'  hidden onChange={e=>setImage(e.target.files[0])}/>
            </label>

            <p className='text-sm text-gray-500'> Upload a picture of your Car</p>
          </div>

            {/* Car Brand & Model */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex flex-col w-full'>
              <label>Brand</label>
              <input type="text" placeholder='e.g. BMW, Mercedes ,Audi...' required
              className='px-3 py-2 mt-1 border border-Color rounded-md outline-none' value={car.brand}
              onChange={e=>setCar({...car,brand:e.target.value})}/>
            </div>
            <div className='flex flex-col w-full'>
              <label>Model</label>
              <input type="text" placeholder='e.g. X5, E-Class, M4...' required
              className='px-3 py-2 mt-1 border border-Color rounded-md outline-none' value={car.model}
              onChange={e=>setCar({...car,model:e.target.value})}/>
            </div>
            </div>

            {/* Year & Price Per Day ,Category*/}

              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                 <div className='flex flex-col w-full'>
              <label>Year</label>
              <input type='number' placeholder='2025' required
              className='px-3 py-2 mt-1 border border-Color rounded-md outline-none' value={car.year}
              onChange={e=>setCar({...car,year:e.target.value})}/>
            </div>

            <div className='flex flex-col w-full'>
              <label>Daily Price ({currency})</label>
              <input type='number' placeholder='1000' required
              className='px-3 py-2 mt-1 border border-Color rounded-md outline-none' value={car.pricePerDay}
              onChange={e=>setCar({...car,pricePerDay:e.target.value})}/>
            </div>

             <div className='flex flex-col w-full'>
              <label>Category ({currency})</label>
                <select onChange={e=>setCar({...car,category:e.target.value})} value={car.category}
                  className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' >
                  <option value="">Select Category</option> 
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                </select>
            </div>
              </div>

            {/* Transmission , Fuel Type , Seating Capacity */}

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
               <div className='flex flex-col w-full'>
              <label>Transmission ({currency})</label>
                <select onChange={e=>setCar({...car,transmission:e.target.value})} value={car.transmission}
                  className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' >
                  <option value="">Select Transmission</option> 
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                  <option value="semi-automatic"> Semi-Automatic</option>
                </select>
            </div>


             <div className='flex flex-col w-full'>
              <label>Fuel Type ({currency})</label>
                <select onChange={e=>setCar({...car,fuelType:e.target.value})} value={car.fuelType}
                  className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' >
                  <option value="">Select Fuel-Type</option> 
                  <option value="Gas">Gas</option>
                  <option value="Deisel">Deisel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric"> Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
            </div>

             <div className='flex flex-col w-full'>
              <label>Seating Capacity ({currency})</label>
              <input type='number' placeholder='4' required
              className='px-3 py-2 mt-1 border border-Color rounded-md outline-none' value={car.seatingCapacity}
              onChange={e=>setCar({...car,seatingCapacity:e.target.value})}/>
            </div>

            </div>

            {/* Location */}
            < div className='flex flex-col w-full'>
              <label>Location ({currency})</label>
                <select onChange={e=>setCar({...car,location:e.target.value})} value={car.location}
                  className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' >
                  <option value="">Select Locatrion</option> 
                  <option value="Dwarka">Dwarka</option>
                  <option value="Rajkot">Rajkot</option>
                  <option value="Ahemdabad">Ahemdabad</option>
                  <option value="Jamnagar"> Jamnagar</option>
                  <option value="Surat">Surat</option>
                  <option value="Vadodara">Vadodara</option>
                  <option value="Gandhinagar">Gandhinagar</option>
                  <option value="Mehsana">Mehsana</option>
                  <option value="Bhavnagar">Bhavnagar</option>
                  <option value="Anand">Anand</option>
                </select>
            </div>

            {/* Description */}
            <div className='flex flex-col w-full'>
              
              <label>Description</label>
              <textarea className='px-3 py-2 mt-1 border border-Color rounded-md outline-none'
                rows={5} placeholder='"Well-maintained 2018 Honda CR-V with 70k miles, clean title, new tires, minor dings, perfect for daily commutes'
                required  value={car.description} onChange={e=>setCar({...car,description:e.target.value})} >
                
                
               </textarea> 
               
            
              </div>
               <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary
                text-white rounded-md font-medium w-max cursor-pointer'>
                <img src={assets.tick_icon} alt="" />
                 List Your Car
               </button>
      </form>
    </div>
  )
}

export default AddCar
