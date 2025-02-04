import Paginator from '../paginator/Paginator';
import './UsersList.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { UserEntity } from '../../../ForFable-Domain';
import { LanguageContext } from '../../contexts/LanguageContext';
import { ServicesContext } from '../../contexts/ServicesContext';
import { NO_USER_IMAGE } from '../../utils/default';

interface UserProps {
}

const UsersList: React.FC<UserProps> = () => {
  const navigate = useNavigate();
  const [lang] = useContext(LanguageContext)
  const { UsersService } = useContext(ServicesContext)

  const gotoSelected = (id: number) => {
    window.scrollTo(0, 0)
    navigate(`/user/${id}`)
  }

  return (
    <div>
        <Paginator<UserEntity>
          title={<h1 className='user-list-header'>{lang.ListOfUsers}</h1>}
          noDataMessage=''
          indexFunction={async (page: number) => await UsersService.index(page)}
          renderAll={(userList) => (
            <div className='grid--user-list'>
            {!userList ?
                <div className='loading'>{lang.Loading}...</div> :
                <>
                  {userList.all.map((user, index) => {
                    return (
                      <div onClick={() => gotoSelected(user.id)} className='user-item--list' key={index}>
                        <h2>{user.name}</h2>
                        <h3>{lang.Score}: {user.score}</h3>
                        <img className='image-portrait' src={user.imageUrl || NO_USER_IMAGE}/>
                      </div>
                    )
                    }
                  )}
                </>
            }
            </div>
          )}
        />
    </div>
  )
};

export default UsersList;