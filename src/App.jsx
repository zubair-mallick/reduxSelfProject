import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AddData, fetchUsersFromAPI, userDelete } from './STORE/Reducers/UserrReducer';
import { useEffect, useState } from 'react';
import AddUserPopup from './AddUserPopup';
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner component

const App = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state
    const dispatch = useDispatch();
    const users = useSelector((state) => state.UserrReducer.users);
    const colors = ['#FF5733', '#339184', '#5733FF', '#332F2E', '#FE34FF', '#FF6F33', '#3121FF', '#33FF9E', '#113219', '#B333FF' ,'#FF5733', '#339184', '#5733FF', '#332F2E', '#FE34FF', '#FF6F33', '#3121FF', '#33FF9E', '#113219', '#B333FF'];

    useEffect(() => {
      if(localStorage.getItem('usersState')){
        setLoading(false);
      }

      if(localStorage.getItem('usersState') === null){
        const fetchData = async () => {
            await dispatch(fetchUsersFromAPI());
            setLoading(false); // Set loading to false when data is fetched
        };
        fetchData();}
    }, [dispatch]);

    const deleteHandler = (index) => {
        dispatch(userDelete(index));
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleAddUser = (userData) => {
        dispatch(AddData(userData));
        setIsPopupOpen(false);
    };

    const handleResetLocalStorage = () => {
        localStorage.removeItem('usersState');
        window.location.reload(); // Refresh the page to reflect the changes
    };

    return (
        <div className="bg-gray-200 p-2">
            {loading && <LoadingSpinner />} {/* Conditionally render the spinner */}
            <div className='flex justify-center gap-4'>
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg mb-4" onClick={togglePopup}>Add User</button>
                <button className="bg-red-500 text-white py-2 px-4 rounded-lg mb-4" onClick={handleResetLocalStorage}>Reset from api</button>
            </div>
            <h1 className="text-2xl font-bold mb-4">Users:</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {users && users[0] && users[0].map((user, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-md flex flex-col items-center relative">
                        <span
                            className="absolute top-0 right-2 cursor-pointer text-gray-500 hover:text-red-500"
                            onClick={() => deleteHandler(index)}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                        <div
                            className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-zinc-100 text-2xl font-bold"
                            style={{ backgroundColor: colors[user.id-1 % colors.length]  }}
                        >
                            {user.name.charAt(0)}
                        </div>
                        <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                ))}
            </div>
            {isPopupOpen && <AddUserPopup onSubmit={handleAddUser} onClose={togglePopup} />}
        </div>
    );
};

export default App;
