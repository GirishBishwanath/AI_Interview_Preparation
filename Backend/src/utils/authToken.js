function getTokenCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production"

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/"
  }
}

function getTokenFromRequest(req) {
  const cookieToken = req.cookies?.token

  if (cookieToken) {
    return cookieToken
  }

  const authHeader = req.headers?.authorization || req.headers?.Authorization

  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7).trim()
  }

  return null
}

function setTokenCookie(res, token) {
  res.cookie("token", token, getTokenCookieOptions())
}

function clearTokenCookie(res) {
  res.clearCookie("token", { path: "/" })
}

module.exports = {
  getTokenCookieOptions,
  getTokenFromRequest,
  setTokenCookie,
  clearTokenCookie
}
