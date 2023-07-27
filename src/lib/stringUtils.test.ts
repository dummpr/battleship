import { toScoreFormat } from './stringUtils'

describe('stringUtils', () => {
  describe('toScoreFormat', () => {
    it('should format number < 10 to fixed two digits', () => {
      const received = toScoreFormat(2)
      const expected = '02'

      expect(received).toBe(expected)
    })

    it('should format number >= 10 && number <= 99 to fixed two digits', () => {
      const received = toScoreFormat(54)
      const expected = '54'

      expect(received).toBe(expected)
    })

    it('should return number as is when number >= 100', () => {
      const received = toScoreFormat(200)
      const expected = '200'

      expect(received).toBe(expected)
    })

    it('should ignore decimal point and return fixed number', () => {
      const received = toScoreFormat(50.05)
      const expected = '50'

      expect(received).toBe(expected)
    })

    it('should return negative number as is when number < 0', () => {
      const received = toScoreFormat(-5)
      const expected = '-5'

      expect(received).toBe(expected)
    })
  })
})
