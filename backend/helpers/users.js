export function getPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    savedRentalIds: user.savedRentalIds,
  }
}
