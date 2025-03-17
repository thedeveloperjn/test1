import { create } from 'zustand'

interface reviewStore {
  orderId: string
  productId: string
  isReviewOpen: string
  toggleModal: (productId: string, orderId: string) => void
}

export const useReviewStore = create<reviewStore>(set => ({
  orderId: '',
  productId: '',
  isReviewOpen: '',
  toggleModal: (productId, orderId) =>
    set({ isReviewOpen: productId, productId, orderId })
}))
