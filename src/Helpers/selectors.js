export function getAppointmentsForDay(state, day) {
  //find if day exists
  const dayFound = state.days.find(d => d.name === day)
  if (!dayFound) {
    return [];
  }
  // returns list of appointments on that day
  return dayFound.appointments.map((a) => state.appointments[a])
}
