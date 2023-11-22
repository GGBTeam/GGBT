import { createContext, useState } from 'react'
import './App.css'
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { ConfigProvider } from 'antd'


type searchRes = {
  result: any[],
  setResult: React.Dispatch<React.SetStateAction<any[]>>,
} | null;

export const ResContext = createContext<searchRes>(null);

function App() {

  const element = useRoutes(routes)
  const [result, setResult] = useState<any[]>([]);
  
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ffc703'
        }
      }}
    >
          <ResContext.Provider value={{result: result, setResult: setResult}}>
            {element}
          </ResContext.Provider>
    </ConfigProvider>
  )
}

export default App
