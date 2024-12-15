import { useSelector } from "react-redux"
export default function ThemeProvider({children}) {
    const {theme}=useSelector(state=>state.theme);

  return (
        <div className={`bg-white text-gray-800 ${theme==='dark'?'dark:text-gray-200 dark:bg-[rgb(16,23,42)]':''}  min-h-full relative`}>
        {children}
        </div>
  )
}
