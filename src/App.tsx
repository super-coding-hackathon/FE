import React from 'react'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Routeres from './router/Router'

const queryClient = new QueryClient()

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {/* <ToastProvider /> */}
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routeres />
        </React.Suspense>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
