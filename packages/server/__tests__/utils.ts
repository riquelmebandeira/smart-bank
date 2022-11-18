import { Response } from 'express'

const mockRequest = () => ({
  body: {},
  params: {}
})

const mockResponse = () => {
  const res: Partial<Response> = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

export { mockRequest, mockResponse }
