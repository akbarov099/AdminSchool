import React, { useState } from 'react'
import HomeAdd from './HomeAdd'
import HomeAll from './HomeAll'

export default function Home() {

  const [formData, setFormData] = useState({
    full_name: "",
    subject: "",
    type: "Teacher",
  });
  
    return (
    <div>
      <HomeAdd formData={formData} setFormData={setFormData} />
      <HomeAll formData={formData} setFormData={setFormData} />
    </div>
  )
}
