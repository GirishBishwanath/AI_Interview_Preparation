const test = require('node:test')
const assert = require('node:assert/strict')

const { getTokenCookieOptions, getTokenFromRequest } = require('../src/utils/authToken')

test('production cookie options are cross-site compatible', () => {
  process.env.NODE_ENV = 'production'

  const options = getTokenCookieOptions()

  assert.equal(options.httpOnly, true)
  assert.equal(options.secure, true)
  assert.equal(options.sameSite, 'none')
})

test('extracts bearer token from authorization header', () => {
  const req = {
    headers: {
      authorization: 'Bearer test-token'
    }
  }

  assert.equal(getTokenFromRequest(req), 'test-token')
})
