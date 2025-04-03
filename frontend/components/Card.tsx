import { Account } from "@/types"

interface CardProps {
  data: Account,
  hello: (data: Account) => void
}

const Card: React.FC<CardProps> = ({ data, hello }) => {
  return (
    <div className="bg-gray-100 p-2" onClick={() => hello(data)}>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
      <p>{data.age}</p>
      <p>{data.password}</p>
    </div>
  )
}

export default Card