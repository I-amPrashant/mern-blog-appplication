import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPost from '../components/DashPost'
import DashUsers from '../components/DashUsers'
import DashboardComponent from '../components/DashboardComponent'

export default function Dashboard() {
  const location=useLocation();
  const [tab, setTab]=useState('');

  useEffect(()=>{
    setTab('');
    const urlParams=new URLSearchParams(location.search);
    const tabFromUrl=urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  }, [location.search])


  return (
    <div className='flex flex-col md:flex-row min-h-screen max-h-screen'>
      {/* sidebar  */}
        <div className='min-w-[300px]'>
          <DashSidebar/>
        </div>

        {tab==='profile' && <DashProfile/>}
        {tab==='posts' && <DashPost/>}
        {tab==='users' && <DashUsers/>}
        {tab==='dash' && <DashboardComponent/>}
    </div>
  )
}
