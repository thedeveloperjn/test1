import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: RefundMethod) => void
}

const refundMethodSchema = z
  .object({
    refundMethod: z.enum(['UPI', 'DIRECT_BANK_TRANSFER']),
    upiId: z
      .string()
      .optional()
      .refine(value => !value || isValidUPI(value), {
        message: 'Invalid UPI ID format'
      }),
    upiName: z.string().optional(),
    accountNumber: z
      .string()
      .optional()
      .refine(value => !value || isValidAccountNumber(value), {
        message: 'Invalid account number format'
      }),
    accountHolderName: z.string().optional(),
    bankName: z.string().optional(),
    branch: z.string().optional(),
    ifscCode: z.string().optional()
  })
  .superRefine((data, ctx) => {
    if (data.refundMethod === 'UPI') {
      if (!data.upiId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'UPI ID is required',
          path: ['upiId']
        })
      }
      if (!data.upiName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'UPI Name is required',
          path: ['upiName']
        })
      }
    } else if (data.refundMethod === 'DIRECT_BANK_TRANSFER') {
      if (!data.accountNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Account Number is required',
          path: ['accountNumber']
        })
      }
      if (!data.accountHolderName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Account Holder Name is required',
          path: ['accountHolderName']
        })
      }
      if (!data.bankName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Bank Name is required',
          path: ['bankName']
        })
      }
      if (!data.branch) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Branch is required',
          path: ['branch']
        })
      }
      if (!data.ifscCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'IFSC Code is required',
          path: ['ifscCode']
        })
      }
    }
  })

type RefundMethod = z.infer<typeof refundMethodSchema>

function isValidUPI(upi: string): boolean {
  const upiRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  return upiRegex.test(upi)
}

function isValidAccountNumber(accountNumber: string): boolean {
  const accountNumberRegex = /^[0-9]{9,18}$/
  return accountNumberRegex.test(accountNumber)
}
const RefundModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RefundMethod>({
    resolver: zodResolver(refundMethodSchema)
  })

  const refundMethod = watch('refundMethod')

  const handleFormSubmit = (data: RefundMethod) => {
    console.log(data)
    console.log(errors)
    onSubmit(data)

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded w-full max-w-md overflow-y-auto m-2">
        <h2 className="text-lg font-bold mb-4">Enter Payment Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            {errors.refundMethod && (
              <p className="text-red-500">{JSON.stringify(errors)}</p>
            )}
            <label className="block">Refund Method</label>
            <select
              {...register('refundMethod')}
              className="select select-primary w-full"
            >
              <option value="">Select Refund Method</option>
              <option value="UPI">UPI</option>
              <option value="DIRECT_BANK_TRANSFER">Direct Bank Transfer</option>
            </select>
          </div>

          {refundMethod === 'UPI' && (
            <>
              <div className="mb-4">
                <label className="block">UPI ID</label>
                <input
                  type="text"
                  {...register('upiId')}
                  className="input input-bordered w-full laptop:input-md input-sm"
                />
                {errors.upiId && (
                  <p className="text-red-500">{errors.upiId.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block">UPI Name</label>
                <input
                  type="text"
                  {...register('upiName')}
                  className="input input-bordered w-full laptop:input-md input-sm"
                />
                {errors.upiName && (
                  <p className="text-red-500">{errors.upiName.message}</p>
                )}
              </div>
            </>
          )}

          {refundMethod === 'DIRECT_BANK_TRANSFER' && (
            <>
              <div className="mb-4">
                <label className="block">Account Number</label>
                <input
                  type="text"
                  {...register('accountNumber')}
                  className="input input-bordered w-full laptop:input-md input-sm"
                />
                {errors.accountNumber && (
                  <p className="text-red-500">{errors.accountNumber.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block">Account Holder Name</label>
                <input
                  type="text"
                  {...register('accountHolderName')}
                  className="input input-bordered w-full laptop:input-md input-sm"
                />
                {errors.accountHolderName && (
                  <p className="text-red-500">
                    {errors.accountHolderName.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block">Bank Name</label>
                <input
                  type="text"
                  {...register('bankName')}
                  className="input input-bordered w-full laptop:input-md input-sm"
                />
                {errors.bankName && (
                  <p className="text-red-500">{errors.bankName.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block">Branch</label>
                <input
                  type="text"
                  {...register('branch')}
                  className="input input-bordered w-full laptop:input-md input-sm"
                />
                {errors.branch && (
                  <p className="text-red-500">{errors.branch.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block">IFSC Code</label>
                <input
                  type="text"
                  {...register('ifscCode')}
                  className="input input-bordered w-full laptop:input-md input-sm"
                />
                {errors.ifscCode && (
                  <p className="text-red-500">{errors.ifscCode.message}</p>
                )}
              </div>
            </>
          )}

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary mr-2">
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RefundModal
