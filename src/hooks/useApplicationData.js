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
      console.log(state)
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      //console.log("APPOINTMENT++++++++", appointment)
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      //console.log("APPOINTMENTS-------", appointments)
      const spots = {
        ...state.day[id]
      }

      console.log("SPOTS =============>", spots)

      return axios.put(`/api/appointments/${id}`, {interview})
      .then((response) => {
        setState({...state, appointments});
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
        setState({...state, appointments});
      })
    }

    return { state, setDay, bookInterview, cancelInterview }
  }


