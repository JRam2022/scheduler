export function getAppointmentsForDay(state, day) {
  //find if day exists
  const dayFound = state.days.find(d => d.name === day)
  if (!dayFound) {
    return [];
  }
  // returns list of appointments on that day
  return dayFound.appointments.map((a) => state.appointments[a]);
}

export function getInterviewersForDay(state, day) {
  //find if day exists
  const dayFound = state.days.find(d => d.name === day)
  if (!dayFound) {
    return [];
  }
  // returns list of interviews on that day
  return dayFound.interviewers.map((a) => state.interviewers[a]);
  
}


export function getInterview(state, interview) {
  //checks to see if there is an interview
  if (!interview) {
    return interview;
  }
  const interviewID = interview.interviewer;
  const interviewReturnObj = state.interviewers[interviewID];
  //new object with only student and interviewer info
  const newState = {
    student: interview.student,
    interviewer: interviewReturnObj
  };
  return newState;
}
