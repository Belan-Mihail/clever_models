import React from 'react'
import ModelCreator from './ModelCreator'
import ModelTree from './ModelTree'

const Dashboard = () => {
  return (
    <div className="flex h-screen">
        <ModelCreator />
        <ModelTree />
    </div>
  )
}

export default Dashboard