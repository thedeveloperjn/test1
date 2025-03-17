export const useGetYear = () => {
  const currentYear = new Date().getFullYear()

  const years = []

  for (let i = 0; i <= 15; i++) {
    years.push(currentYear - i)
  }

  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ]
  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, '0')
  )

  return { years, months, days }
}
