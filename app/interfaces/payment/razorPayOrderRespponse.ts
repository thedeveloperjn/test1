export interface IOrderOptions {
  amount: number
  amount_due: number
  amount_paid: number
  attempts: number
  created_at: number
  currency: string
  entity: string
  id: string
  notes: any[]
  offer_id: string | null
  receipt: string | null
  status: string
}

export interface IOrder {
  status: boolean
  id: string
  amount: number
  options: IOrderOptions
}
