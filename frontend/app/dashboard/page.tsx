'use client'

import Card from '@/components/Card'
import { Account } from '@/types'
import React, { useState } from 'react';
import useToken from '@/hooks/use-token';
const Page = () => {
  const [selectedData, setSelectedData] = useState<Account | null>(null)


  console.log(useToken)
  const data: Account[] = [
    {
      name: "Adrey japheth",
      email: "adrey1@gmail.com",
      age: "22",
      password: "adrey"
    },
    {
      name: "Adrey japheth",
      email: "adrey2@gmail.com",
      age: "22",
      password: "adrey"
    },
    {
      name: "Adrey japheth",
      email: "adrey3@gmail.com",
      age: "22",
      password: "adrey"
    },
    {
      name: "Adrey japheth",
      email: "adrey4@gmail.com",
      age: "22",
      password: "adrey"
    },
  ]

  const handleCardClick = (cardData: Account) => {
    setSelectedData(cardData)
  }

  return (
    <div>

      <div className='grid grid-cols-2  rounded-lg gap-5'>

        {data.map((item, index) => (
          <Card key={index} data={item} hello={handleCardClick} />
        ))}
      </div>

      {selectedData && (
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold">Selected Card</h2>
          <p className="text-gray-700">{selectedData.name}</p>
          <p className="text-gray-600">{selectedData.age}</p>
          <p className="text-gray-600">{selectedData.email}</p>
          <p className="text-gray-600">{selectedData.password}</p>
        </div>
      )}
    </div>
  )
}

export default Page