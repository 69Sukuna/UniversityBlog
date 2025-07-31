function createSessionCookie(user) {
  const sessionData = {
    id: user.id,
    nombre: user.nombre,
    userName: user.userName,
    role: user.role
  };
  return `session=${encodeURIComponent(JSON.stringify(sessionData))}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`;
}
function clearSessionCookie() {
  return "session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0";
}
function getUserFromRequest(request) {
  const sessionCookie = request.headers.get("cookie");
  if (!sessionCookie || !sessionCookie.includes("session=")) {
    return null;
  }
  try {
    const sessionData = sessionCookie.split("session=")[1].split(";")[0];
    return JSON.parse(decodeURIComponent(sessionData));
  } catch {
    return null;
  }
}

export { clearSessionCookie as a, createSessionCookie as c, getUserFromRequest as g };
