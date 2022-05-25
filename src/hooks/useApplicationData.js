import { useEffect, useState } from "react";
import axios from "axios";

  export default function useApplicationData() {

    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });

    const setDay = day => setState({...state, day});

    useEffect(() => {
      Promise.all([
        axios.get('http://localhost:8001/api/appointments'),
        axios.get('http://localhost:8001/api/days'),
        axios.get('http://localhost:8001/api/interviewers')
      ]).then((all) => {
        setState(prev => ({...prev,
          appointments: all[0].data,
          days: all[1].data,
          interviewers: all[2].data
        }))
      })
    }, []);

    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      return axios.put(`/api/appointments/${id}`, {interview})
      .then((response) => {
        setState(updateSpots(state, appointments))
      })
    }

    function cancelInterview(id) {
      return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState(updateSpots(state, appointments))
      })
    }

    return { state, setDay, bookInterview, cancelInterview }
  }


  const countSpots = (state, appointments) => {
    const currentDay = state.days.find((day) => day.name === state.day);
    const appointmentID = currentDay.appointments;
    //Counts spots that are null/available
    const spots = appointmentID.filter((id) => !appointments[id].interview).length;

    return spots;
  }

  const updateSpots = (state, appointments) => {
    const updateState = {...state};
    const updateDays = [...state.days];
    const updateDay = {...state.days.find((day) => day.name === state.day)};

    const spots = countSpots(state, appointments);
    updateDay.spots = spots;

    const updateDayIndex = state.days.findIndex((day) => day.name === state.day);
    updateDays[updateDayIndex] = updateDay;
    
    updateState.days = updateDays;
    updateState.appointments = appointments;

    return updateState;
  }


