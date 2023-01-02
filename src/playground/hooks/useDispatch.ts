import { useContext } from 'react';
import DispatchContext from '../context/DispatchContext';

const useDispatch = () => useContext(DispatchContext);

export default useDispatch;
