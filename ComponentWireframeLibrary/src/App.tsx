import './App.css'
import Navbar from './navbar/Navbar'
import SearchSection from './search/SearchSection'

function App() {

  return (
    <body className='bg-white w-full'>
      <Navbar/>
      <SearchSection/>
      <div className='grid grid-cols-3 gap-16 mx-48 pt-16'>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-1.png" width="100%" alt="" />
            <p className='pt-2'>Orion</p>
          </div>
        </div>
        <div>
          <div className='-full'>
            <img className='rounded-lg' src="layout-2.png" width="100%" alt="" />
            <p className='pt-2'>Sun</p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-3.png" width="100%" alt="" />
            <p className='pt-2'>Pheonix</p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-4.png" width="100%" alt="" />
            <p className='pt-2'>Acacia</p>
          </div>
        </div>
        <div>
          <div className='0 w-full'>
            <img className='rounded-lg' src="layout-5.png" width="100%" alt="" />
            <p className='pt-2'>Orion <span className='secondary text-xs font-normal'>(Reversed)</span></p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-1.png" width="100%" alt="" />
            <p className='pt-2'>Orion</p>
          </div>
        </div>
        <div>
          <div className='-full'>
            <img className='rounded-lg' src="layout-2.png" width="100%" alt="" />
            <p className='pt-2'>Sun</p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-3.png" width="100%" alt="" />
            <p className='pt-2'>Pheonix</p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-4.png" width="100%" alt="" />
            <p className='pt-2'>Acacia</p>
          </div>
        </div>
        <div>
          <div className='0 w-full'>
            <img className='rounded-lg' src="layout-5.png" width="100%" alt="" />
            <p className='pt-2'>Orion <span className='secondary text-xs font-normal'>(Reversed)</span></p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-1.png" width="100%" alt="" />
            <p className='pt-2'>Orion</p>
          </div>
        </div>
        <div>
          <div className='-full'>
            <img className='rounded-lg' src="layout-2.png" width="100%" alt="" />
            <p className='pt-2'>Sun</p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-3.png" width="100%" alt="" />
            <p className='pt-2'>Pheonix</p>
          </div>
        </div>
        <div>
          <div className='w-full'>
            <img className='rounded-lg' src="layout-4.png" width="100%" alt="" />
            <p className='pt-2'>Acacia</p>
          </div>
        </div>
        <div>
          <div className='0 w-full'>
            <img className='rounded-lg' src="layout-5.png" width="100%" alt="" />
            <p className='pt-2'>Orion <span className='secondary text-xs font-normal'>(Reversed)</span></p>
          </div>
        </div>
      </div>
      <div className='h-[100rem]'></div>
    </body>
  )
}

export default App