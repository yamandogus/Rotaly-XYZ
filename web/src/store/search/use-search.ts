import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCity, setCheckIn, setCheckOut, setGuests, clearSearch } from './search-slice';

export const useSearch = () => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootState) => state.search);

  return {
    // State
    city: searchState.city,
    checkIn: searchState.checkIn,
    checkOut: searchState.checkOut,
    guests: searchState.guests,
    
    // Actions
    setCity: (city: string) => dispatch(setCity(city)),
    setCheckIn: (checkIn: string) => dispatch(setCheckIn(checkIn)),
    setCheckOut: (checkOut: string) => dispatch(setCheckOut(checkOut)),
    setGuests: (guests: number) => dispatch(setGuests(guests)),
    clearSearch: () => dispatch(clearSearch()),
  };
};
